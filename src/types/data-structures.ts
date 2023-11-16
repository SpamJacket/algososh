export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getSize: () => number;
  render: () => T[];
};

export type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: (resetItem: T) => void;
  clear: () => void;
  getHead: () => number | null;
  getTail: () => number | null;
  render: () => T[];
};

export type TLinkedList<T> = {
  unshift: (element: T) => void;
  push: (element: T) => void;
  shift: () => void;
  pop: () => void;
  appendByIndex: (element: T, index: number) => void;
  removeByIndex: (index: number) => void;
  getSize: () => number;
  render: () => T[];
};
