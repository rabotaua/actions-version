import core from '@actions/core';
import github from '@actions/github';

try {
  const version = core.getInput('version');
  if (!version || !version.match(/\d+\.\d+/)) {
    core.setFailed(`Unexpected version "${version}" must be something like "2.1"`);
  }

  core.exportVariable('GITHUB_SHA_SHORT', (github.context.eventName === 'pull_request' ? github.context.payload.pull_request?.head.sha : github.context.sha).substring(0, 7))
  core.exportVariable('GITHUB_BRANCH_SLUG', process.env.GITHUB_HEAD_REF?.split('/')?.pop() || github.context.ref.split('/').pop())
  core.exportVariable('VERSION', `${version}.${process.env.GITHUB_RUN_NUMBER}-${process.env.GITHUB_SHA_SHORT}-${process.env.GITHUB_BRANCH_SLUG}`)

} catch (error) {
  core.setFailed((error as Error).message);
}
