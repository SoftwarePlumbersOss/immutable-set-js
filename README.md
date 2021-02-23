# immutable-set

The simplest possible implementation of an immutable set (compatible with the buildin Set) in Typescript.
This can also be used in javascript.

If you are looking for sophistication, immutable-js is probably the way to go. If, on the other hand, you
just want to expose some set objects as constants in your APIs, and you are frustrated that Object.freeze
doesn't work, this might well work for you.

```typescript
    let set = new ImmutableSet<string>(['a', 'b', 'c']);
```

* The methods has, forEach, keys, entries, values should all work exactly as for a standard Set.
* Iteration should work as for a standard Set
* The add method words, does not modify the set, but returns a new set with the element added
* The add operation constructs new sets lazily.

```typescript
    let set = new ImmutableSet<string>().add('a').add('b').add('c');
    set.forEach(item=>console.log(item));
    let array = [ ...set ]; // The overhead of actually building a set will be incurred here
```

