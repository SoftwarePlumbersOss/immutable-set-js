import { ImmutableSet } from './set';

describe('immutable set has read operations similar to core Set', ()=> {
    test('has applies in the same way', ()=>{
        let immutableSet = new ImmutableSet<string>().add("a").add("b");
        expect(immutableSet.has('a')).toBe(true);
        expect(immutableSet.has('b')).toBe(true);
        expect(immutableSet.has('c')).toBe(false);
    });

    test('iterate applies in same order', ()=>{
        let set = new Set<string>().add('b').add('a').add('c');
        let immutableSet = new ImmutableSet<string>().add("b").add("a").add("c");
        expect([...immutableSet]).toEqual([...set]);
    })
});