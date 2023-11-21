import { TQueue } from "../types/data-structures";

export default class Queue<T> implements TQueue<T> {
  private container: T[] = Array(7).fill(undefined);
  private head: number | null = null;
  private tail: number | null = null;

  enqueue(item: T) {
    if (this.tail === null) {
      if (this.head === null) {
        this.head = 0;
        this.tail = 0;
      } else {
        this.tail = this.head;
      }
    } else {
      this.tail++;
    }
    this.container[this.tail] = item;
  }

  dequeue(resetItem: T) {
    if (this.head !== null) {
      this.container[this.head] = resetItem;
      if (this.head !== this.tail) {
        this.head++;
      } else {
        this.tail = null;
      }
    }
  }

  clear() {
    this.container = Array(7).fill(undefined);
    this.head = null;
    this.tail = null;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  render() {
    return this.container;
  }
}
