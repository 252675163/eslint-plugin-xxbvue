# eslint-plugin-xxbvue

custom eslint rules for vue project

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-xxbvue`:

```
$ npm install eslint-plugin-xxbvue --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-xxbvue` globally.

## Usage

Add `xxbvue` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["xxbvue"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "xxbvue/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here
