import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private _items: any[];
  set items(values: any[]) {
    this._items = values;
  }

  get items() {
    return this._items;
  }

  private _firstIndex: number;
  set firstIndex(value: number) {
    this._firstIndex = value;
  }

  get firstIndex(): number {
    return this._firstIndex;
  }

  private _lastIndex: number;
  set lastIndex(value: number) {
    this._lastIndex = value;
  }

  get lastIndex(): number {
    return this._lastIndex;
  }

  constructor() { }

  setIndex(index: number, isShiftHold: boolean = false): void {
    if (this.firstIndex && this.firstIndex !== index) {
      if (isShiftHold) {
        this.lastIndex = index;
      } else {
        this.firstIndex = index;
        this.lastIndex = undefined;
      }
    } else {
      this.firstIndex = index;
      this.lastIndex = undefined;
    }
    this.setSelection();
  }

  setSelection() {
    if (this.firstIndex && this.lastIndex && this.firstIndex !== this.lastIndex) {
      const [_first, _last] = (this.firstIndex < this.lastIndex) ? [this.firstIndex, this.lastIndex] : [this.lastIndex, this.firstIndex];
      [...this.range(+_first + 1, +_last)].map((i) => {
        this.items[i].shift();
      });
      return;
    }

    if (this.firstIndex && this.firstIndex < this.items.length) {
      this.items[this.firstIndex].shift();
    }
  }

  *range(start: number, end: number): IterableIterator<number> {
    yield start;

    if (start === end) {
      return;
    }

    yield* this.range(start + 1, end);
  }
}
