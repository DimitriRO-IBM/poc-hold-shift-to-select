import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionService } from '../selection.service';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    SelectionService,
  ]
})
export class ListComponent implements OnInit, AfterViewInit {

  @ViewChildren(ItemComponent) items: QueryList<ItemComponent>;
  private _items: ItemComponent[];

  constructor(
    private selectionService: SelectionService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.items) {
      this._items = this.items.filter(() => true);
      this.selectionService.items = this._items;

      this.items.changes.subscribe((itemChanges) => {
        this._items = itemChanges.filter(() => true);
        this.selectionService.items = this._items;
      });
    }
  }

  itemSelected([item, isShiftHold]: [number, boolean]) {
    this.selectionService.setIndex(item, isShiftHold);
  }

}
