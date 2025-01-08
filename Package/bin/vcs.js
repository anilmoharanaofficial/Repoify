#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import initRepo from "../commands/init.js";
import addRepo from "../commands/add.js";
import loginCommand from "../commands/login.js";
import commitRepo from "../commands/commit.js";
import pushRepo from "../commands/push.js";

yargs(hideBin(process.argv))
  .command("login", "Login to the server", {}, () => loginCommand())
  .command("init", "Initialize a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      if (!argv.message.trim()) {
        console.error("Error: Commit message cannot be empty.");
        process.exit(1);
      }
      commitRepo(argv.message);
    }
  )
  .command("push", "Push commits", {}, pushRepo)
  .demandCommand(1, "You need to specify a command")
  .help().argv;
