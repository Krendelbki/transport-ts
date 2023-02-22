interface QueueInterface<T> {
    enqueue(element: T): void;
    dequeue(): T | undefined;
    size(): number;
}

export class Queue<T> implements QueueInterface<T> {
    #array: T[] = [];

    enqueue(element: T): void {
        this.#array.push(element);
    }

    dequeue(): T | undefined {
        return this.#array.shift();
    }

    size(): number {
        return this.#array.length;
    }
}