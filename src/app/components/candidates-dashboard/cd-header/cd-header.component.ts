import { Component } from '@angular/core';

@Component({
    selector: 'app-cd-header',
    templateUrl: './cd-header.component.html',
    styleUrls: ['./cd-header.component.scss']
})
export class CdHeaderComponent {

    constructor() { }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

     // Modal Popup
     isOpen = false;
     openPopup(): void {
         this.isOpen = true;
     }
     closePopup(): void {
         this.isOpen = false;
     } 
 
     // Tabs 1
     currentTab = 'tab1';
     switchTab(event: MouseEvent, tab: string) {
         event.preventDefault();
         this.currentTab = tab;
     }
 
     // Tabs 2
     currentInnerTab = 'innerTab1';
     switchInnerTab(event: MouseEvent, tab: string) {
         event.preventDefault();
         this.currentInnerTab = tab;
     }

}