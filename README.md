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

> ⚠ Easy adaption of the optics is not implemented yet (see [Issues](https://github.com/foundata/hugo-theme-govanity/issues)). Coming releases will provide sane defaults and config options in this regard, stay tuned.


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
