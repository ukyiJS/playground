export class PriorityQueue<T> {
  private heap: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    this.compare = compareFn;
  }

  enqueue(item: T): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  dequeue(): T | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop() ?? null;

    const [top] = this.heap;

    this.heap[0] = this.heap.pop() as T;
    this.bubbleDown();

    return top;
  }

  peek(): T | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number): number {
    return (2 * index) + 1;
  }

  private rightChildIndex(index: number): number {
    return (2 * index) + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;

    while (index > 0 && this.compare(this.heap[index], this.heap[this.parentIndex(index)]) < 0) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  private bubbleDown(): void {
    let index = 0;

    while (this.leftChildIndex(index) < this.heap.length) {
      const leftChild = this.leftChildIndex(index);
      const rightChild = this.rightChildIndex(index);
      let smallestChild = leftChild;

      if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[leftChild]) < 0) smallestChild = rightChild;

      if (this.compare(this.heap[index], this.heap[smallestChild]) <= 0) break;

      this.swap(index, smallestChild);
      index = smallestChild;
    }
  }
}
