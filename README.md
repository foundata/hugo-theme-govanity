# Hugo theme: govanity

⚠️ **Experimental - Not ready for production use yet.**

`hugo-theme-govanity` (Vanity URLs for Go packages with Hugo)

Further reading, references:

* [Vanity import paths in Go](https://sagikazarmark.hu/blog/vanity-import-paths-in-go/) by Márk Sági-Kazár
* [Using Go Vanity URLs with Hugo](https://blog.jbowen.dev/2020/07/using-go-vanity-urls-with-hugo/) by Jessica Bowen
* [`go` docs: Remote import paths](https://pkg.go.dev/cmd/go#hdr-Remote_import_paths)


## Table of contents

- [Installation](#installation)
  - [Using Hugo modules](#installation-hugo-modules)
  - [Using Git submodules](#installation-git-submodules)
- [Usage and configuration](#usage)
- [Licensing, copyright](#licensing-copyright)
- [Author information](#author-information)



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


## Usage and configuration<a id="usage"></a>

FIXME




## Licensing, copyright<a id="licensing-copyright"></a>

<!--REUSE-IgnoreStart-->
Copyright (c) 2025 foundata GmbH (https://foundata.com)

This project is licensed under the GNU General Public License v3.0 or later (SPDX-License-Identifier: `GPL-3.0-or-later`), see [`LICENSES/GPL-3.0-or-later.txt`](LICENSES/GPL-3.0-or-later.txt) for the full text.

The [`REUSE.toml`](REUSE.toml) file provides detailed licensing and copyright information in a human- and machine-readable format. This includes parts that may be subject to different licensing or usage terms, such as third-party components. The repository conforms to the [REUSE specification](https://reuse.software/spec/). You can use [`reuse spdx`](https://reuse.readthedocs.io/en/latest/readme.html#cli) to create a [SPDX software bill of materials (SBOM)](https://en.wikipedia.org/wiki/Software_Package_Data_Exchange).
<!--REUSE-IgnoreEnd-->

[![REUSE status](https://api.reuse.software/badge/github.com/foundata/hugo-theme-govanity)](https://api.reuse.software/info/github.com/foundata/hugo-theme-govanity)


## Author information<a id="author-information"></a>

This project was created and is maintained by [foundata](https://foundata.com/).
