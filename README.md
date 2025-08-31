# Hugo theme: govanity (vanity URLs for Go modules / packages with Hugo)

The **`govanity` Hugo theme** simplifies building and maintaining a vanity base domain such as `go.example.com` or `example.dev` and serving the required `<meta>` tags for [vanity import paths](https://pkg.go.dev/cmd/go#hdr-Remote_import_paths).

The generated static site can be deployed on any static-capable host. The landing page lists all modules; each module is a content file with fitting front matter. See [`archetypes/default.md`](archetypes/default.md) for a ready-to-use template.


## Table of contents

- [Why vanity import paths?](#reasoning)
- [Demo](#demo)
- [Installation](#installation)
  - [Using Hugo modules](#installation-hugo-modules)
  - [Using Git submodules](#installation-git-submodules)
- [Configuration](#configuration)
  - [Settings](#settings)
    - [`vanityPageTags`](#setting-vanityPageTags)
    - [`header.logo`](#setting-header-logo)
    - [`header.showTitle`](#setting-header-showTitle)
    - [`header.title`](#setting-header-title)
    - [`footer.additionalText`](#setting-footer-additionalText)
    - [`footer.additionalTextTrailingBreak`](#setting-footer-additionalTextTrailingBreak)
    - [`footer.showThemeInfo`](#setting-footer-showThemeInfo)
    - [`footer.showTrademarksInfo`](#setting-footer-showTrademarksInfo)
    - [`footer.showGoGopherInfo`](#setting-footer-showGoGopherInfo)
- [Usage](#usage)
  - [Creating new entries](#usage-add-entries)
  - [Deployment](#deployment)
- [Compatibility](#compatibility)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Licensing, copyright](#licensing-copyright)
- [Author information](#author-information)


## Why vanity import paths?<a id="reasoning"></a>

By default, Go imports point to repository hosts, e.g.:

```go
import "github.com/user-or-org/foo"
```

Vanity import paths decouple the import path from the code host. For example, the module **hugo-theme-dev** can be imported as:

```go
import "golang.foundata.com/hugo-theme-dev"
```

Under the hood, the site serves `<meta name="go-import" ...>` that redirect tooling to the real repository (e.g. GitHub).

**Further reading, references:**

* [Vanity import paths in Go](https://sagikazarmark.hu/blog/vanity-import-paths-in-go/) by Márk Sági-Kazár
* [Using Go Vanity URLs with Hugo](https://blog.jbowen.dev/2020/07/using-go-vanity-urls-with-hugo/) by Jessica Bowen
* [`go` docs: Remote import paths](https://pkg.go.dev/cmd/go#hdr-Remote_import_paths)


## Demo<a id="demo"></a>

Clone the repository and run the included [example content](./exampleSite/content/) (requires Hugo, Go, and Git):

```bash
git clone https://github.com/foundata/hugo-theme-govanity.git
cd ./hugo-theme-govanity/exampleSite
HUGO_MODULE_WORKSPACE=hugo.work hugo server --ignoreVendorPaths "**"
```

Or look at the following pages using this theme:

* https://golang.foundata.com/


## Installation<a id="installation"></a>

### Using Hugo modules<a id="installation-hugo-modules"></a>

Add the following module path(s) to your [`theme:` configuration](https://gohugo.io/hugo-modules/theme-components/):

```yaml
theme:
  - "golang.foundata.com/hugo-theme-govanity"
```

Hugo automatically fetches and import theme module paths as Go/Hugo modules, so you do **not** need to list them under `module.imports` manually. Using modules requires [Hugo, Go, and Git](https://gohugo.io/hugo-modules/use-modules/#prerequisite) to be installed on your system.


### Using Git submodules<a id="installation-git-submodules"></a>

From the root directory of your Hugo site, initialize a new Git repository (if you haven't already), then add the theme as a [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules):

```bash
git submodule add https://github.com/foundata/hugo-theme-govanity.git themes/govanity
```

Now reference the theme directory name in your [`theme:` configuration](https://gohugo.io/hugo-modules/theme-components/):

```yaml
theme:
  - "govanity"
```


## Configuration<a id="configuration"></a>

Set your **vanity base URL** in the Hugo config (this must be the (sub)domain that serves your vanity paths):

```yaml
baseURL: "https://go.example.com/"
```

> ℹ️ **Heads-up:** Exact host + path matters to the Go toolchain. Use HTTPS and avoid extra path segments in `baseURL`. Do not forget the trailing slash.


### Settings<a id="settings"></a>

This section documents the theme options you can place under `params.theme` in your Hugo configuration. The example configurations and are safe to copy-paste. All keys are optional and the theme falls back to sensible behavior unless otherwise noted.

> ⚠ Easy adaption of colors is not implemented yet (see [Issue #6](https://github.com/foundata/hugo-theme-govanity/issues/6)). Coming releases will provide this, stay tuned.


#### `vanityPageTags`<a id="setting-vanityPageTags"></a>

- Type: List of strings.
- Default: `["go-module"]`
- Purpose:
  - Only content pages that define **at least one of these tags** in their Front Matter **are treated as vanity module pages** (included in the overview and get the `go-import` / `go-source` meta tags emitted early).
  - Put the tags in each module page's Front Matter under `tags:`.
- **Example (config):**
  ```yaml
  params:
    theme:
      vanityPageTags:
        - "go-module"
        - "hugo-module"
  ```
- **Example (page Front Matter):**
  ```yaml
  ---
  title: "hugo-theme-dev"
  tags:
    - "go-module"
    - "hugo-module"
  repo:
    root: "github.com/foundata/hugo-theme-dev"
  ---
  ```


#### `header.logo`<a id="setting-header-logo"></a>

- Type: Object with `src`, optional `width`, optional `height`.
- Default: Not set.
- Purpose:
  -  Show a logo in the header.
  - `src` is a **relative path under `/assets`** (e.g., `images/logo.svg`).
  -  `width` and `height` become `<img>` attributes (strings), letting you control layout.
- **Example (config):**
  ```yaml
  params:
    theme:
      header:
        logo:
          # This image is shipped with the theme
          src: "images/logo-go-gopher-network.svg"
          width: "40"
          height: "35"
  ```


#### `header.showTitle`<a id="setting-header-showTitle"></a>

- Type: Boolean.
- Default: `true`
- Purpose:
  - Toggle a text title in the header (rendered next to the logo if a logo is set).
  - If enabled, the theme displays either `header.title` or falls back to `.Site.Title`.
- **Example (config):**
  ```yaml
  params:
    theme:
      header:
        showTitle: true
  ```


#### `header.title`<a id="setting-header-title"></a>

- Type: String.
- Default: Not set.
- Purpose:
  - Used only if `header.showTitle` is `true`. If empty or unset, the theme uses `.Site.Title`.
  - Explicit header title as kind of text logo
- **Example (config):**
  ```yaml
  params:
    theme:
      header:
        showTitle: true
        title: "Go import path overview"
  ```


#### `footer.additionalText`<a id="setting-footer-additionalText"></a>

- Type: String.
- Default: `""`
- Purpose:
  - Optional extra text in the footer. Markdown is allowed (but raw HTML will be filtered).
  - If empty, no extra text is rendered.
- **Example (config):**
  ```yaml
  params:
    theme:
      footer:
        additionalText: "© 2025 AMCE Inc. | [Contact Us](https://exmaple.com/contact)"
  ```

#### `footer.additionalTextTrailingBreak`<a id="setting-footer-additionalTextTrailingBreak"></a>

- Type: Boolean.
- Default: `true`
- Purpose:
  - Add a line break after `additionalText`.
  - Useful if the line gets too long when combining `additionalText` with attribution toggles below.
- **Example (config):**
  ```yaml
  params:
    theme:
      footer:
        additionalText: "© 2025 AMCE Inc. | [Contact Us](https://exmaple.com/contact)"
        additionalTextTrailingBreak: true # will add a <br> after the additional text
  ```


#### `footer.showThemeInfo`<a id="setting-footer-showThemeInfo"></a>

- Type: Boolean.
- Default: `true`
- Purpose: Show a short theme attribution link in the footer.
- **Example (config):**
  ```yaml
  params:
    theme:
      footer:
        showThemeInfo: true
  ```

#### `footer.showTrademarksInfo`<a id="setting-footer-showTrademarksInfo"></a>

- Type: Boolean.
- Default: `true`
- Purpose: Show a link to Google's [Go Brand and Trademark Usage Guidelines](https://go.dev/brand) (recommended).
- **Example (config):**
  ```yaml
  params:
    theme:
      footer:
        showTrademarksInfo: true
  ```

#### `footer.showGoGopherInfo`<a id="setting-footer-showGoGopherInfo"></a>

- Type: Boolean.
- Default: `true`
- Purpose: Show attribution information about the  [Go Gopher](https://go.dev/blog/gopher) (recommended).
- **Example (config):**
  ```yaml
  ```yaml
  params:
    theme:
      footer:
        showGoGopherInfo: true
  ```


## Usage<a id="usage"></a>

### Creating new entries<a id="usage-add-entries"></a>

Add a new Markdown file **directly under the content root** for each module (no nested folders). For example:

```
content/hugo-theme-dev.md
```

You can use the provided archetype to scaffold the front matter:

```bash
hugo new hugo-theme-dev.md
# or explicitly: hugo new --kind default hugo-theme-dev.md
```

Below is the **minimal** set you'll typically use (see [`archetypes/default.md`](archetypes/default.md) for the full, annotated version):

```yaml
---
title: "hugo-theme-dev"
tags:
  - "go-module"
  - "hugo-module"
repo:
  root: "github.com/foundata/hugo-theme-dev"
---
```

The theme emits `<meta name="go-import">` (and optionally `<meta name="go-source">`) very early in the page `<head>` as recommended by Go's docs. The single package page also shows helpful commands and links for humans.


### Deployment<a id="deployment"></a>

This is a static site: deploy anywhere you can host static files (e.g. your small VM, GitHub Pages, Netlify, Cloudflare Pages, S3 + CDN). Ensure:

1. The site is served at your `baseURL` host (e.g., `https://go.example.com/`).
2. Requests like `https://go.example.com/hugo-theme-dev?go-get=1` return HTML that includes the `go-import` meta tag.
3. Avoid JavaScript/CSS before the meta tag in `<head>` (the theme already places it first).


## Troubleshooting<a id="troubleshooting"></a>

- **`no go-import meta tags`**: Verify the request path and that the HTML contains the correct `<meta name="go-import" ...>` tag. Try visiting the page with `?go-get=1`.
- **Module not listed on the overview**: Check the page `tags` and `params.handleTags`.
- **Imports still point to the old host**: Clear module cache (`go clean -modcache`) and ensure DNS/HTTPS and exact paths are correct.


## Compatibility<a id="compatibility"></a>

This project is compatible with Hugo (extended) ≥ v0.148.0 and should always work with the latest Hugo release (we usually run the latest Hugo ourselves and fix issues promptly). It has been tested at least with:

- [Hugo extended v0.149.0](https://github.com/gohugoio/hugo/releases/tag/v0.149.0)
- [Hugo extended v0.148.0](https://github.com/gohugoio/hugo/releases/tag/v0.148.0)

If your version isn't listed, it might still work. Just give it a try.


## Contributing<a id="contributing"></a>

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) if you want to get involved.

This projects's functionality is mature, so there might be little activity on the repository in the future. Don't get fooled by this, the project is under active maintenance and used daily by the maintainers.


## Licensing, copyright<a id="licensing-copyright"></a>

<!--REUSE-IgnoreStart-->
Copyright (c) 2025 foundata GmbH (https://foundata.com)

This project is licensed under the GNU General Public License v3.0 or later (SPDX-License-Identifier: `GPL-3.0-or-later`), see [`LICENSES/GPL-3.0-or-later.txt`](LICENSES/GPL-3.0-or-later.txt) for the full text.

The [`REUSE.toml`](REUSE.toml) file provides detailed licensing and copyright information in a human- and machine-readable format. This includes parts that may be subject to different licensing or usage terms, such as third-party components. The repository conforms to the [REUSE specification](https://reuse.software/spec/). You can use [`reuse spdx`](https://reuse.readthedocs.io/en/latest/readme.html#cli) to create a [SPDX software bill of materials (SBOM)](https://en.wikipedia.org/wiki/Software_Package_Data_Exchange).
<!--REUSE-IgnoreEnd-->

[![REUSE status](https://api.reuse.software/badge/github.com/foundata/hugo-theme-govanity)](https://api.reuse.software/info/github.com/foundata/hugo-theme-govanity)


## Author information<a id="author-information"></a>

This project was created and is maintained by [foundata](https://foundata.com/).
