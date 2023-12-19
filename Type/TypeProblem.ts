type Product = {
    name: string;
    price: number;
    description: string;
}

type User = {
    name: string;
    age: number;
    email: string;
}

type Dictionary = {
    [key: string]: string | number;
}

type Func = (num: number) => boolean;

type Elementt = string | number;
type ArrayElement = Elementt[];

type Article = {
    title: string;
    author: string;
    content: string;
    date?: Date;
}

type Tuplee = [string, number];


type FuncArray = Function[];

type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Sarturday' | 'Sunday'; 

class Queue<T> {
    private items: T[] = [];
    push(item: T) {
        this.items.push(item);
    }

    pop(): T {
        return this.items.shift() as T;
    }

    getLength(): number {
        return this.items.length;
    }
}
