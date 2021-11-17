import * as core from "@actions/core";
import * as github from "@actions/github";

const exportVariable = (key: string, val: string): void => {
  core.exportVariable(key, val);
  console.log(key, val);
};

try {
  const version = core.getInput("version") || "1.0";
  if (!version || !version.match(/\d+\.\d+/)) {
    core.setFailed(`Unexpected version "${version}" must be something like "2.1"`);
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
