#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import initRepo from "../commands/init.js";

yargs(hideBin(process.argv))
  .command("init", "Initialize a new repository", {}, initRepo)
  .demandCommand(1, "You need to specify a command")
  .help().argv;
