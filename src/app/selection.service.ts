import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  // The list of element in which the service will work
  private _items: any[];
  set items(values: any[]) {
    this._items = values;
  }

  get items() {
    return this._items;
  }

  // The first index of the range of selected elements
  private _firstIndex: number;
  set firstIndex(value: number) {
    this._firstIndex = value;
  }

  get firstIndex(): number {
    return this._firstIndex;
  }

  // The last index of the range of selected elements
  private _lastIndex: number;
  set lastIndex(value: number) {
    this._lastIndex = value;
  }

  get lastIndex(): number {
    return this._lastIndex;
  }

  constructor() { }

  /**
   * Sets the bounds for the range of selected elements and select them
   *
   * @param {number} index - the index of the selected element
   * @param {boolean} isShiftHold - flag used to check if SHIFt is hold
   */
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

  /**
   * Sets the `selected` flag  in every element based on the range of elements selected
   */
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

  /**
   * Generator used to create an array based on two numbers.
   * I.E.: range(0,2) => [0, 1, 2]
   *
   * @param {number} start
   * @param {number} end
   * @returns {IterableIterator<number>>} - an array containing all numbers within start and end
   */
  *range(start: number, end: number): IterableIterator<number> {
    yield start;

    if (start === end) {
      return;
    }

    yield* this.range(start + 1, end);
  }
}
