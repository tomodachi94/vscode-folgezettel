# Change Log

All notable changes to the `vscode-folgezettel` extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.3] - 2026-01-11

- Explicitly disable this extension in [Untrusted Workspaces](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust#_restricted-mode),
  because all of its operations involve parsing filenames, which could be dangerous with untrusted input.

## [0.0.2] - 2025-10-10

### Fixed

- Go To Parent Thought: Handle case where a title in the parent is present (fixes [#1](https://github.com/tomodachi94/vscode-folgezettel/issues/1))

## [0.0.1] - 2025-10-09

### Added

- Initial release.

[unreleased]: https://github.com/tomodachi94/vscode-folgezettel/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/tomodachi94/vscode-folgezettel/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/tomodachi94/vscode-folgezettel/releases/tag/v0.0.1
