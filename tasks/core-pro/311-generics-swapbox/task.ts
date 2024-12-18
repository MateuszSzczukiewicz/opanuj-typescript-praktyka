function swapNumbers(a: number, b: number): [number, number] {
    return [b, a];
}

function swapStrings(a: string, b: string): [string, string] {
    return [b, a];
}

export function swapBox<T, K>(a: T, b: K) {
    return [b, a]
}

const [n1, n2] = swapNumbers(10, 20);
const [s1, s2] = swapStrings('hello', 'world');
const [x, y] = swapBox(false, true);
