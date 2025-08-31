---
title: "02-full-example-vcs"
description: "Wrapper types for sync/atomic enforcing Whatever Nonsense."
draft: false
# include this page in the overview if at least one tag matches params.handleTags
# (default: ["go-module", "hugo-module"])
tags:
  - "go-module"

# Vanity import path root
# Defaults to host+path from this page's page .Permalink if omitted
import_path: "go.example.org/02-full-example-vcs"

# VCS-backed repo (most common)
repo:
  # Version control system (VCS) to use. Defaults to "git".
  # Possible values: git|hg|svn|bzr|fossil.
  vcs: "git"
  # The Go import path repository root (so: no protocol:// prefix, no .git/hg/...
  # suffix). See https://pkg.go.dev/cmd/go#hdr-Remote_import_paths for details.
  root: "codeberg.example.com/FIXME-FIXME-FIXME/02-full-example-vcs"
  subdir: "" # optional: e.g. "src/02-full-example-vcs" for nested modules


# go-source (for deep links to dirs/files/lines in your source browser)
# Provide the three templates here. If omitted: derive common GitHub-style paths
# from repoRoot.
source:
  dir:  "https://codeberg.example.com/FIXME-FIXME-FIXME/02-full-example-vcs/tree{/dir}"
  file: "https://codeberg.example.com/FIXME-FIXME-FIXME/02-full-example-vcs/blob{/dir}/{file}"
  line: "https://codeberg.example.com/FIXME-FIXME-FIXME/02-full-example-vcs/blob{/dir}/{file}#L{line}"

# optional
urls:
  doc: "https://example.net/02-full-example-vcs/doc/"
  website: "https://example.com/url-to-your-mega-tool-website/"
  source: "https://example.org/repo/" # Defaults to https://<repo root>. Set a custom URL here, or set to false (without quotes) to hide the link.
  redirect: false # redirects only humans / browsers
---
