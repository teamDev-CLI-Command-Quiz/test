"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
var Node_1 = require("./Node");
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
    }
    Object.defineProperty(LinkedList.prototype, "getHead", {
        get: function () {
            return this.head;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LinkedList.prototype, "setHead", {
        set: function (head) {
            this.head = head;
        },
        enumerable: false,
        configurable: true
    });
    LinkedList.prototype.popFront = function () {
        if (this.head === null)
            return;
        this.head = this.head.getNext;
        var iterator = this.head;
        while (iterator != null) {
            iterator = iterator.getNext;
        }
    };
    LinkedList.prototype.popLast = function () {
        if (this.head === null)
            return;
        var iterator = this.head;
        while (iterator.getNext.getNext != null)
            iterator = iterator.getNext;
    };
    LinkedList.prototype.append = function (name, attribute, parent) {
        var newNode = new Node_1.Nodes(name, attribute, parent);
        if (this.head === null) {
            this.head = newNode;
            return this.head;
        }
        var iterator = this.head;
        while (iterator.getNext != null)
            iterator = iterator.getNext;
        iterator.setNext = newNode;
        iterator = iterator.getNext;
    };
    LinkedList.prototype.preappend = function (name, attribute, parent) {
        var newNode = new Node_1.Nodes(name, attribute, parent);
        if (this.head === null) {
            this.head = newNode;
        }
        else {
            newNode.setNext = this.head;
            this.head = newNode;
        }
    };
    LinkedList.prototype.printList = function () {
        var iterator = this.head;
        var ans = "";
        while (iterator !== null) {
            ans += " " + iterator.getName;
            iterator = iterator.getNext;
        }
        return ans.substring(1);
    };
    LinkedList.prototype.search = function (name) {
        var iterator = this.head;
        while (iterator !== null) {
            if (iterator.getName === name)
                break;
            iterator = iterator.getNext;
        }
        return iterator;
    };
    LinkedList.prototype.remove = function (name) {
        var iterator = this.head;
        while (iterator.getNext !== null) {
            if (iterator.getNext.getName === name)
                break;
            iterator = iterator.getNext;
        }
        iterator.setNext = iterator.getNext.getNext;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
