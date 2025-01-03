// Zaimplementuj typ MergeableObject z wykorzystaniem typów wbudowanych - Exclude i NonNullable.
type MergeableObject<T> = T extends object ? NonNullable<Exclude<T, Function>> : never;

export function mergeObjects<T extends object, U extends object>(obj1: MergeableObject<T>, obj2: MergeableObject<U>): T & U {
    const merged = { ...obj1, ...obj2 };
    console.log(merged);
    return merged;
}
