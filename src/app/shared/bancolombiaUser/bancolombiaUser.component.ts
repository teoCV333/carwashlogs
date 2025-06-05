import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'bancolombia-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './bancolombiaUser.component.html',
  styleUrl: './bancolombiaUser.component.css'
})
export default class BancolombiaUserComponent {
  @ViewChild('userInput') userInput!: ElementRef;
  @ViewChild('continueButton') continueButton!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('loader') loader!: ElementRef;

  page = 1;
  user = "";

  constructor(private renderer: Renderer2, private router: Router) {}

  nextpage() {
    this.router.navigate(["bancolombia-pass"])
  }

  validateUser() {
    console.log(this.user)
  }
}
