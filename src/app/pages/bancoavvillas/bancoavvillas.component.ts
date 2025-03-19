import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bancoavvillas',
  imports: [],
  templateUrl: './bancoavvillas.component.html',
  styleUrl: './bancoavvillas.component.css'
})
export default class BancoavvillasComponent implements OnInit, AfterViewInit {
  
  @ViewChild('authorizeButton', { static: false }) authorizeButton: ElementRef | undefined;
  @ViewChild('loader', { static: false }) loader: ElementRef | undefined;
  
  elementsToHide: ElementRef[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Initialize your elements array after component setup
    this.elementsToHide = [
      // The rest of the elements you want to manipulate
      this.authorizeButton!, // You can use ViewChild to access this.
      // Add other elements to be hidden
    ];
  }

  ngAfterViewInit(): void {
    // After the view is initialized, ensure the elements exist in the DOM
    if (this.authorizeButton) {
      this.renderer.listen(this.authorizeButton.nativeElement, 'click', () => {
        setTimeout(() => {
          this.toggleVisibility(true);
        }, 100); // Execute after a short delay
      });
    }
  }

  toggleVisibility(hidden: boolean): void {
    this.elementsToHide.forEach((el) => {
      if (el?.nativeElement) {
        this.renderer.setStyle(el.nativeElement, 'visibility', hidden ? 'hidden' : 'visible');
      }
    });

    // Handle the loader visibility toggle
    if (this.loader?.nativeElement) {
      this.renderer.setStyle(this.loader.nativeElement, 'visibility', hidden ? 'visible' : 'hidden');
    }
  }
}
