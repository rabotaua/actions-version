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

## Build

`npm run build`

**WARNING:** neither `parcel` nor `ncc` do not work under Windows

## TODO

- prettier
- eslint
- husky pre commit build OR add action which will build and commit result
