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

## TODO

- prettier
- eslint
- husky pre commit build OR add action which will build and commit result
