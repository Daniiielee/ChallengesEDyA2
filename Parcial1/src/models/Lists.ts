import { Node } from './Nodes';

export class SimpleLinkedList<T> {
  public head: Node<T> | null = null;
  append(value: T) {
    const newNode = new Node(value);
    if (!this.head) { this.head = newNode; }
    else {
      let curr = this.head;
      while (curr.next) { curr = curr.next; }
      curr.next = newNode;
    }
  }
  remove(condition: (val: T) => boolean) {
    if (!this.head) return;
    if (condition(this.head.value)) { this.head = this.head.next; return; }
    let curr = this.head;
    while (curr.next && !condition(curr.next.value)) { curr = curr.next; }
    if (curr.next) { curr.next = curr.next.next; }
  }
  toArray(): T[] {
    const res: T[] = [];
    let curr = this.head;
    while (curr) { res.push(curr.value); curr = curr.next; }
    return res;
  }
}

export class DoublyLinkedList<T> {
  public head: Node<T> | null = null;
  public tail: Node<T> | null = null;
  append(value: T) {
    const newNode = new Node(value);
    if (!this.tail) { this.head = newNode; this.tail = newNode; }
    else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  toArray(): T[] {
    const res: T[] = [];
    let curr = this.head;
    while (curr) { res.push(curr.value); curr = curr.next; }
    return res;
  }
}

export class CircularLinkedList<T> {
  public head: Node<T> | null = null;
  append(value: T) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let curr = this.head;
      while (curr.next !== this.head) { curr = curr.next!; }
      curr.next = newNode;
      newNode.next = this.head;
    }
  }
  toArray(): T[] {
    const res: T[] = [];
    if (!this.head) return res;
    let curr = this.head;
    do { res.push(curr.value); curr = curr.next!; } while (curr !== this.head);
    return res;
  }
}

export class CircularDoublyLinkedList<T> {
  public head: Node<T> | null = null;
  append(value: T) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      const tail = this.head.prev!;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
  }
  toArray(): T[] {
    const res: T[] = [];
    if (!this.head) return res;
    let curr = this.head;
    do { res.push(curr.value); curr = curr.next!; } while (curr !== this.head);
    return res;
  }
}