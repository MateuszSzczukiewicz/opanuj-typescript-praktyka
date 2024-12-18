export class Person {
    #id: number;
    constructor(
        public name: string,
        public age: number,
    ) {
        this.#id = Math.random();
    }

    identify() {
        console.log(`ID: ${this.#id}, Name: ${this.name}`);
    }
}
