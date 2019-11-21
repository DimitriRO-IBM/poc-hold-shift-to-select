import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input()
  content: number;

  @Output()
  clicked: EventEmitter<[number, boolean]> = new EventEmitter<[number, boolean]>();

  selected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  toggleSelected(event: MouseEvent): void {
    this.clicked.emit([this.content, event.shiftKey]);
  }

  shift(): void {
    this.selected = !this.selected;
  }

}
