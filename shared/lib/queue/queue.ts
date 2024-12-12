export class Queue<T> {
  private items: Record<number, T | null> = {};
  private head: number = 0;
  private tail: number = 0;

  enqueue(item: T): void {
    this.items[this.tail] = item;
    this.tail++;
  }

  dequeue(): T | null {
    if (this.isEmpty()) return null;

    const item = this.items[this.head];

    this.items[this.head] = null;
    this.head++;

    if (this.head === this.tail) {
      this.clear();
    }

    return item ?? null;
  }

  peek(): T | null {
    return this.items[this.head] ?? null;
  }

  isEmpty(): boolean {
    return this.head === this.tail;
  }

  size(): number {
    return this.tail - this.head;
  }

  clear(): void {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
}
