# Development

This file provides information for maintainers and contributors to `hugo-theme-govanity`.


# Table of contents

- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Testing](#testing)
- [Releases](#releases)


## Prerequisites<a id="prerequisites"></a>

- A recent version of **Go** (see the value listed in [`go.mod`](./go.mod) for the minimum version).
- A recent version **[`hugo`](https://gohugo.io/installation/) (extended edition)** (see the value listed in [`config/_default/module.yaml`](./config/_default/module.yaml) for the minimum version).


## Getting started<a id="getting-started"></a>

1. Clone the repository:
   ```bash
   git clone https://github.com/foundata/hugo-theme-govanity.git
   ```
2. Test that the installation works:
   ```bash
   # Show version
   hugo version

   # Test with the local version
   cd ./hugo-theme-govanity/exampleSite
   HUGO_MODULE_WORKSPACE=hugo.work hugo server --ignoreVendorPaths "**"

   # Print a module dependency graph
   HUGO_MODULE_WORKSPACE=hugo.work hugo mod graph
   ```


## Testing<a id="testing"></a>

Nothing special or automated yet. Therefore just some hints for manual testing:

- Run the `exampleSite` and watch for any Hugo warnings or errors:
  ```bash
  cd ./hugo-theme-govanity/exampleSite
  HUGO_MODULE_WORKSPACE=hugo.work hugo server --ignoreVendorPaths "**"
  ```
- Try different content types and features. Enable `params.feature.debug: true` and verify that the context values (e.g., `layout`) appear as expected.


## Releases<a id="releases"></a>

1. Run [`hugo mod tidy`](https://gohugo.io/commands/hugo_mod_tidy/).
2. Do proper [Testing](#testing). Continue only if everything is fine.
3. Determine the next version number. This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
4. Update needed parts to match the new release version:
   - [`CHANGELOG.md`](./CHANGELOG.md): Insert a section for the new release. Do not forget the comparison link at the end of the file.
   - If there where breaking changes: [adapt the go module path](https://go.dev/doc/modules/release-workflow#breaking).
5. If everything is fine: commit the changes, tag the release and push:
   ```bash
   version="<FIXME version>"
   git add \
     "./CHANGELOG.md" \
     "./go.mod"
   git commit -m "Release preparations: v${version}"

   git tag "v${version}" "$(git rev-parse --verify HEAD)" -m "version ${version}"
   git show "v${version}"

   git push origin main --follow-tags
   ```
   If something minor went wrong (like missing `CHANGELOG.md` update), delete the tag and start over:
   ```bash
   git tag -d "v${version}" # delete the old tag locally
   git push origin ":refs/tags/v${version}" # delete the old tag remotely
   ```
   This is *only* possible if there was no [GitHub release](https://github.com/foundata/hugo-theme-govanity/releases/). Use a new patch version number otherwise.
6. Use [GitHub's release feature](https://github.com/foundata/hugo-theme-govanity/releases/new), select the tag you pushed and create a new release:
   * Use `v<version>` as title
   * A description is optional. In doubt, use `See CHANGELOG.md for more information about this release.`
7. Check if the GitHub API delivers the correct version as `latest`:
   ```bash
   curl -s -L https://api.github.com/repos/foundata/hugo-theme-govanity/releases/latest | jq -r '.tag_name' | sed -e 's/^v//g'
   ```
