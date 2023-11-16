import { TLinkedList } from "../types/data-structures";

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements TLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  size: number = 0;

  unshift(element: T) {
    const node = new Node(element);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }

  push(element: T) {
    const node = new Node(element);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
  }

  shift() {
    if (this.head!.next) {
      this.head = this.head!.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size--;
  }

  pop() {
    let curr = this.head;
    let prevCurr = null;

    while (curr?.next) {
      prevCurr = curr;
      curr = curr.next;
    }

    if (prevCurr) {
      prevCurr.next = null;
      this.tail = prevCurr;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size--;
  }

  appendByIndex(element: T, index: number) {
    if (index === 0) {
      this.unshift(element);
    } else if (index === this.size) {
      this.push(element);
    } else {
      let curr = this.head;
      let prev = null;
      let i = 0;

      while (i < index) {
        prev = curr;
        curr = curr!.next;
        i++;
      }

      const node = new Node(element);
      node.next = curr;
      prev!.next = node;
      this.size++;
    }
  }

  removeByIndex(index: number) {
    if (index === 0) {
      this.shift();
    } else if (index === this.size - 1) {
      this.pop();
    } else {
      let curr = this.head;
      let prev = null;
      let i = 0;

      while (i < index) {
        prev = curr;
        curr = curr!.next;
        i++;
      }

      prev!.next = curr!.next;
      this.size--;
    }
  }

  render() {
    let curr = this.head;
    let res: T[] = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}
