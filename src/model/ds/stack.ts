interface StackInterface<T> {
    push(element: T): void;
    pop(): T | undefined;
    size(): number;
}

export class Stack<T> implements StackInterface<T> {
    #array: T[] = [];
    
    push(element: T): void {
        this.#array.push(element);
    }

    pop(): T | undefined {
        return this.#array.pop();
    }

    size(): number {
        return this.#array.length;
    }
}