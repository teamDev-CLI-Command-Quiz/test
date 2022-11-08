"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller_1 = require("./Controller/Controller");
var CLI_1 = require("./Model/CLI");
var cli = new CLI_1.CLI();
Controller_1.Controller.activateCLI(cli);
