export interface Libro {
  nombre: string;
  isbn: string;
  autor: string;
  editorial: string;
}

export class Stack<T> {
  private items: T[] = [];

  constructor(initialItems?: T[]) {
    if (initialItems) {
      this.items = [...initialItems];
    }
  }

  push(value: T): void {
    this.items.push(value);
  }

  pop(): T | null {
    return this.items.length > 0 ? (this.items.pop() as T) : null;
  }

  peek(): T | null {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items].reverse();
  }
}