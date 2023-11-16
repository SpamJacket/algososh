import { TStack } from "../types/data-structures";

export class Stack<T> implements TStack<T> {
  private container: T[] = [];
  private size: number = 0;

  push(item: T) {
    this.container.push(item);
    this.size++;
  }

  pop() {
    this.container.pop();
    this.size--;
  }

  clear() {
    this.container = [];
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  render() {
    return this.container;
  }
}
