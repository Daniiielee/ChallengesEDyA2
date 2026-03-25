export interface Persona {
  id: string;
  nombre: string;
  monto: number;
  fecha: Date;
}

export class Queue<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | null {
    return this.items.length > 0 ? this.items.shift()! : null;
  }

  peek(): T | null {
    return this.items.length > 0 ? this.items[0] : null;
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  print(): void {
    this.items.forEach(item => {
      console.log(item);
    });
  }
}