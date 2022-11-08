import { Nodes } from "./Node"

export class LinkedList{
    private head:Nodes|null

    constructor(){
        this.head = null
    }

    public get getHead():Nodes | null{
        return this.head
    }

    public set setHead(head:Nodes | null){
        this.head = head
    }

    public popFront():void{
        if (this.head === null) return;
        this.head = this.head.getNext;
        let iterator = this.head;
        while (iterator != null){
            iterator = iterator.getNext;
        }
    }

    public popLast():void{
        if (this.head === null) return;
        let iterator:Nodes|null = this.head;
        while (iterator!.getNext!.getNext != null) iterator = iterator!.getNext;
        
    }

    public append(name:string, attribute:string, parent:Nodes|null):Nodes|void{
        let newNode:Nodes = new Nodes(name, attribute, parent);
        if (this.head === null) {
            this.head = newNode;
            return this.head;
        }
        let iterator:Nodes|null = this.head;
        while (iterator.getNext != null) iterator = iterator.getNext;  
        
        iterator.setNext = newNode;
        iterator = iterator.getNext;
    }

    public preappend(name:string, attribute:string, parent:Nodes|null):void{
        let newNode:Nodes = new Nodes(name, attribute, parent);
        if (this.head === null) {
            this.head = newNode;
        } else {
            newNode.setNext = this.head;
            this.head = newNode;
        }
    }

    public printList():string{
        let iterator:Nodes|null = this.head;
        let ans:string = "";

        while (iterator !== null) {
            ans += " " + iterator.getName;
            iterator = iterator.getNext;
        }
        return ans.substring(1);
    }

    public search(name:string):Nodes|null{
        let iterator = this.head;
        while (iterator !== null){
            if (iterator.getName === name) break;
            
            iterator = iterator.getNext;
        }
        return iterator;
    }

    public remove(name:string):void{
        let iterator:Nodes|null = this.head;
        while(iterator!.getNext !== null){
            if (iterator!.getNext.getName === name) break;
            iterator = iterator!.getNext;
        }

        iterator!.setNext = iterator!.getNext!.getNext;
    }
}