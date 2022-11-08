import { Controller } from "./Controller/Controller";
import { CLI } from "./Model/CLI";

let cli:CLI = new CLI();

Controller.activateCLI(cli);