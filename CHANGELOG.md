# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]

- Nothing worth mentioning yet.


## [1.1.0] - 2025-08-31

### Added

- Styling based on [Pico CSS](https://picocss.com/).
- Dark/light mode switch.
- Many options to configure the theme's behavior (see README section “Settings”).
- German translation (#5).

## Changed

- All strings are now handled via Hugo's i18n mechanism. You can easily override them in your local site configuration (#5).
- A page's `description` in Front Matter is now used for metadata, the overview page, and as a section in the detail view (#4).
- The build now fails with errors if mandatory `<meta>` tags cannot be generated (#3).
- ⚠ Renamed `params.handleTags` to `params.theme.vanityPageTags` and changed the default value from `["go-module", "hugo-module"]` to `["go-module"]`.


## [1.0.0] - 2025-08-29

### Added

- All functionality and files.


[unreleased]: https://github.com/foundata/hugo-theme-govanity/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/foundata/hugo-theme-govanity/releases/tag/v1.1.0
[1.0.0]: https://github.com/foundata/hugo-theme-govanity/releases/tag/v1.0.0
