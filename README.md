# meteor-tutorial-cli

CLI for creating Meteor Tutorials

### Install

```bash
npm install meteor-tutorial-cli
```

### Usage


#### Patch file

`filename` is optional.

```bash
meteor-tutorial patch [filename]
```

#### Git Log to file

`filename` is optional.

```bash
meteor-tutorial log [filename]
```

#### New step

`number` is optional.

If number is not specified then step number is auto-generated based on latest `Step XX.XX` commit.

`git add` all modified files and `git commit` them with `Step XX.XX: description` format.

```bash
meteor-tutorial step <description> [number]
```

### Roadmap

- Auto tags based on `Step X.X:` format

### Notes

Based on [kamilkisiela/socially-helpers](https://github.com/kamilkisiela/meteor-angular-socially-helpers).
