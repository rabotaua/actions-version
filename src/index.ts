import * as core from "@actions/core";
import * as github from "@actions/github";
import { existsSync, readFileSync } from "fs";

const exportVariable = (key: string, val: string): void => {
  core.exportVariable(key, val);
  core.setOutput(key, val);
  console.log(key, val);
};

try {
  let version = core.getInput("version") || "";
  if (!version) {
    core.setFailed("version is required");
  }
  if (!version.match(/\d+\.\d+/) && existsSync(version)) {
    version =
      readFileSync(version, "utf8")
        ?.match(/FROM\s+.+:(.+)/)
        ?.pop()
        ?.split("-")
        ?.shift()
        ?.match(/[0-9.]+/)
        ?.shift() || "";
  }
  if (!version) {
    core.setFailed(`Unexpected version "${version}" must be something like "2.1" or path to Dockerfile like "./Dockerfile"`);
  }

  // Described in readme, context section
  const commit = github.context.eventName === "pull_request" ? github.context.payload.pull_request?.head.sha : github.context.sha;
  const branch = (process.env.GITHUB_HEAD_REF || github.context.ref).split("/").pop()!;

  const num = github.context.runNumber;
  const sha = commit.substring(0, 7);

  exportVariable("GITHUB_SHA_SHORT", sha);
  exportVariable("GITHUB_BRANCH_SLUG", branch);
  exportVariable("VERSION", `${version}.${num}-${sha}-${branch}`);
} catch (error) {
  core.setFailed((error as Error).message);
}
