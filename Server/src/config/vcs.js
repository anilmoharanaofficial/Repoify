import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import initRepo from "../commands/init.js";
import addRepo from "../commands/add.js";
import commitRepo from "../commands/commit.js";
import pushRepo from "../commands/push.js";
import pullRepo from "../commands/pull.js";
import revertRepo from "../commands/revert.js";
import { startServer } from "../app.js";

const vcs = () => {
  yargs(hideBin(process.argv))
    .command("start", "Starts a new server", {}, startServer)
    .command("init", "Initialise a new repository", {}, initRepo)
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
        commitRepo(argv.message);
      }
    )
    .command("push", "Push commits", {}, pushRepo)
    .command("pull", "Pull commits", {}, pullRepo)
    .command(
      "revert <commitID>",
      "Revert to a specific commit",
      (yargs) => {
        yargs.positional("commitID", {
          describe: "Comit ID to revert to",
          type: "string",
        });
      },
      (argv) => {
        revertRepo(argv.commitID);
      }
    )
    .demandCommand(1, "You need at least one command")
    .help().argv;
};

export default vcs;
