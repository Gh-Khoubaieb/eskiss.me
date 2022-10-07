import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';


import * as $ from 'jquery'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  /*
  @ViewChild("outsideElement", {static: true}) outsideElement : any;
  @ViewChild('modalView', {static: true}) modalView$ : any;

  openModal() {

    this.modalView$.nativeElement.classList.add('visible');
  }

  closeModal() {
    this.modalView$.nativeElement.classList.remove('visible');
  }

  constructor(private modalService: NgbModal) {}

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement:any) {
    const outsideElement = this.outsideElement.nativeElement.contains(targetElement);
    if (outsideElement) {
      this.modalView$.nativeElement.classList.remove('visible');
    }
  }
  */
  downloadFile(){
    let link = document.createElement("a");
    link.download = "filename";
    link.href = "assets/pdf/Eskiss-HomePage-Text.pdf";
    link.click();
    link.remove();
  }
}
