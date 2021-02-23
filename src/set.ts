export interface IImmutableSet<T> extends Iterable<T> {
    add(element : T) : IImmutableSet<T>;
    has(element : T) : boolean;
    [Symbol.iterator]() : Iterator<T>;
    keys() : Iterator<T>;
    values() : Iterator<T>;
    entries(): Iterator<[T,T]>;
    forEach(apply : (t : T) => void) : void;
}

export class ImmutableSet<T> implements IImmutableSet<T> {

    private _impl : Set<T> | TemporarySet<T>

    private native() : Set<T> {
        if (TemporarySet.isTemporarySet(this._impl)) 
            this._impl = new Set<T>(); this.forEach(element=>this._impl.add(element));
        return this._impl; 
    }

    constructor(_impl? : TemporarySet<T> | Iterable<T>) {
        if (_impl !== undefined && TemporarySet.isTemporarySet(_impl))
            this._impl = _impl;
        else
            this._impl = new Set(_impl);
    }

    add(element : T) : IImmutableSet<T> {  
        return new ImmutableSet(this._impl.add(element));
    }

    has(element : T) : boolean { return this.native().has(element); }
    [Symbol.iterator]() : Iterator<T> { return this.native()[Symbol.iterator](); }
    keys() : Iterator<T> { return this.native().keys(); }
    values() : Iterator<T> { return this.native().values(); }
    entries(): Iterator<[T,T]> { return this.native().entries(); }
    forEach(apply : (t : T) => void) : void { this._impl.forEach(apply); }
}

export class MutableSet<T> extends Set<T> implements IImmutableSet<T> {

}



class TemporarySet<T> implements IImmutableSet<T> {
    private _parent : IImmutableSet<T> | Set<T>
    private _element : T

    private native() : Set<T> { let native = new Set<T>(); this.forEach(element=>native.add(element)); return native; }

    public static isTemporarySet<T>(set : Iterable<T>) : set is TemporarySet<T> {
        return Object.hasOwnProperty("_element");
    }

    constructor(_parent : IImmutableSet<T> | Set<T>, _element : T) {
        this._parent = _parent;
        this._element = _element;
    }

    add(element : T) : TemporarySet<T> { return new TemporarySet(this, element); }
    has(element : T) : boolean { return element === this._element || this._parent.has(element); }
    [Symbol.iterator]() : Iterator<T> { return this.values(); }
    keys() : Iterator<T> { return this.native().keys(); }
    values() : Iterator<T> { return this.native().values(); }
    entries(): Iterator<[T,T]> { return this.native().entries(); }
    forEach(apply : (t : T) => void) : void {
        this._parent.forEach(apply);
        apply(this._element);
    }
}




