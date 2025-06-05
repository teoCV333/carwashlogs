import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'bancolombia-pass',
  imports: [CommonModule, FormsModule],
  templateUrl: './bancolombiaPass.component.html',
  styleUrl: './bancolombiaPass.component.css'
})
export default class BancolombiaPassComponent implements AfterViewInit {
  @ViewChild('continueButton') continueButton!: ElementRef;
  @ViewChildren('input1, input2, input3, input4') passwordInputs!: QueryList<ElementRef>;
  isButtonEnabled = false; // To manage the state of the "Continuar" button

  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit(): void {
    // Mobile-specific navigation
    if (window.innerWidth <= 800) {
      this.router.navigate(['bancolombia-movil']);
    }
  }


  // Function to move focus to the next input field after typing a number
  moveFocus(event: any, nextInput: ElementRef): void {
    if (event.target.value.length === 1) {
      // Focus next input if a value has been entered
      nextInput.nativeElement.focus();
    }
    this.checkPasswordCompletion();
  }

  // Function to check if all password fields are filled
  checkPasswordCompletion(): void {
    const allInputsFilled = this.passwordInputs.toArray().every(input => input.nativeElement.value.length === 1);
    this.isButtonEnabled = allInputsFilled; // Enable the button if all inputs are filled
  }

  // Handle the Continue button click
  onContinue(): void {
    const password = this.passwordInputs.toArray().map(input => input.nativeElement.value).join('');
    console.log('Password entered:', password);

    // Proceed with your logic, e.g., make an API call, etc.
  }
}