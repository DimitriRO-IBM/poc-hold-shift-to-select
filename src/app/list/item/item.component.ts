import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input()
  content: number;

  // Will send an event to the parent component to check the clicked item
  @Output()
  clicked: EventEmitter<[number, boolean]> = new EventEmitter<[number, boolean]>();

  // Flag used to check if the current element is selected
  selected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Function called when clicking on the host element
   *
   * @param {MouseEvent} event - Javascript event, contains various elements such as the flag
   * for the SHIFT button
   */
  @HostListener('click', ['$event'])
  toggleSelected(event: MouseEvent): void {
    this.clicked.emit([this.content, event.shiftKey]);
  }

  /**
   * Reverses the flag of the current element
   */
  shift(): void {
    this.selected = !this.selected;
  }

}
