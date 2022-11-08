"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodes = void 0;
var LinkedList_1 = require("./LinkedList");
var Nodes = /** @class */ (function () {
    function Nodes(name, attribute, parent, content) {
        if (content === void 0) { content = "No data"; }
        this.name = name;
        this.attribute = attribute;
        this.parent = parent;
        this.content = content;
        this.name = name;
        this.attribute = attribute;
        this.parent = parent;
        this.content = content;
        this.next = null;
        this.list = new LinkedList_1.LinkedList();
    }
    Object.defineProperty(Nodes.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setName", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getAttribute", {
        get: function () {
            return this.attribute;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setAttribute", {
        set: function (attribute) {
            this.attribute = attribute;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getParent", {
        get: function () {
            return this.parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setParent", {
        set: function (parent) {
            this.parent = parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getContent", {
        get: function () {
            return this.content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setContent", {
        set: function (content) {
            this.content = content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getNext", {
        get: function () {
            return this.next;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setNext", {
        set: function (next) {
            this.next = next;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "getList", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Nodes.prototype, "setList", {
        set: function (list) {
            this.list = list;
        },
        enumerable: false,
        configurable: true
    });
    return Nodes;
}());
exports.Nodes = Nodes;
