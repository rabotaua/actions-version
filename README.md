# Version

GitHub action to generate version numbers based on current build

## Inputs

## `version`

**Required** version prefix to use

## Example usage

```yml
uses: rabotaua/actions-version@main
with:
  version: 2.1
```

Action will generate `VERSION` environment variable which then can be used anywhere:

```yml
- run: echo $VERSION
```

Version consists of: `[version].[build]-[sha]-[branch]` so output will be `2.1.3-dfcc185-main`

Also `GITHUB_SHA_SHORT` and `GITHUB_BRANCH_SLUG` are exported just in case

## Build

`npm run build`

**WARNING:** neither `parcel` nor `ncc` do not work under Windows

If you have made changes you **should** commit both source and dist

## Context

Because of how GitHub works underneath there are few tricky things around pull requests

For usual builds commits are here `github.context.sha` but for pull requests actual commits are here `github.context.payload.pull_request?.head.sha`

The same story for branch names, here is an example

For usual build:

```ini
github.context.sha = xxxxxx
github.context.ref = refs/heads/main
```

For pull request:

```ini
github.context.sha = yyyyyy # merge commit
github.context.ref = refs/pull/3/merge

github.context.payload.pull_request.head.sha = xxxxxx # expected commit
process.env.GITHUB_HEAD_REF = refs/head/main # expected branch
```
