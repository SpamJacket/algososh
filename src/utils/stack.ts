import { TStack } from "../types/data-structures";

export default class Stack<T> implements TStack<T> {
  private container: T[] = [];

  push(item: T) {
    this.container.push(item);
  }

  pop() {
    this.container.pop();
  }

  clear() {
    this.container = [];
  }

  getSize() {
    return this.container.length;
  }

  render() {
    return this.container;
  }
}
