import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { SelectionService } from '../selection.service';
import { ItemComponent } from './item/item.component';

/**
 * Component used to host the list of items that can be selected afterward
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    SelectionService,
  ]
})
export class ListComponent implements OnInit, AfterViewInit {

  // Raw list of all ItemComponent
  @ViewChildren(ItemComponent) items: QueryList<ItemComponent>;

  // List of ItemComponent as component instance
  private _items: ItemComponent[];

  constructor(
    private selectionService: SelectionService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // Initializes the list of components and set it in the service
    if (this.items) {
      this._items = this.items.filter(() => true);
      this.selectionService.items = this._items;

      // Update list if there is any changes
      this.items.changes.subscribe((itemChanges) => {
        this._items = itemChanges.filter(() => true);
        this.selectionService.items = this._items;
      });
    }
  }

  /**
   * Function called when an element has been clicked
   *
   * @param {number} item - the element that has been clicked on
   * @param {boolean} isShiftHold - flag used to check if the  SHIFT button has been pressed
   * during the selection
   */
  itemSelected([item, isShiftHold]: [number, boolean]) {
    this.selectionService.setIndex(item, isShiftHold);
  }

}
