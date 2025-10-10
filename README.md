# vscode-folgezettel

This extension provides a small set of filename-based commands for creating and navigating folgezettel-style notes in a zettelkasten, as [described by Bob Doto](https://writing.bobdoto.computer/how-to-use-folgezettel-in-your-zettelkasten-everything-you-need-to-know-to-get-started/).

## Commands

All commands are available from the Command Palette (press Ctrl/Cmd+Shift+P and type the command name). They operate on Markdown files in the root of the current workspace.

- `Folgezettel: New Train of Thought`
  - Creates and opens a new train of thought in the form `x.1`, where `x` is the next unused prefix

- `Folgezettel: New Sibling Thought`
  - Creates and opens a new thought on the same level in the tree as the currently-open thought (e.g. having the note `1.1` open and running this command would open `1.2`; `1.3b` would result in `1.3c`; etc.)

- `Folgezettel: New Child Thought`
  - Creates and opens a new thought one level deeper than the currently-open thought

- `Folgezettel: Go To Parent Thought`
  - Opens the note one level above the current note in the tree

## Contributing

This project [lives on GitHub](https://github.com/tomodachi94/vscode-folgezettel). Please write tests for any new features, and make sure lints pass (`npm test && npm lint`).

`src/web/pureFolgezettel.ts` should only contain abstract string parsing functions; do not use any functions or libraries not available for regular Node.js.
