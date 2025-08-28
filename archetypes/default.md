---
title: "{{ replace .File.ContentBaseName "-" " " | strings.ToLower }}"
draft: false
# include this page if it matches params.handleTags (default: ["go-module"])
# (default: ["go-module", "hugo-module"])
tags:
  - "go-module"
  - "hugo-module"

# Vanity import path root
# Defaults to host+path from this page's page .Permalink if omitted
import_path: "go.example.org/{{ replace .File.ContentBaseName "-" " " | strings.ToLower }}"

# Choose ONE of these blocks to drive the <meta name="go-import"> tag:
# 1) VCS-backed repo (most common)
repo:
  # Version control system (VCS) to use. Defaults to "git".
  # Possible values: git|hg|svn|bzr|fossil.
  vcs: "git"
  # The Go import path repository root (so: no protocol:// prefix, no .git/hg/...
  # suffix). See https://pkg.go.dev/cmd/go#hdr-Remote_import_paths for details.
  root: "github.com/FIXME-FIXME-FIXME/{{ replace .File.ContentBaseName "-" " " | strings.ToLower }}"
  #subdir: "" # optional: e.g. "src/package02" for nested modules

# 2) OR a module proxy (preferred if you run your own proxy, emits something like
#    <meta name="go-import" content="example.org mod https://proxy.example.org">)
# mod_proxy:
#   url: "https://proxy.example.org"

# go-source (for deep links to dirs/files/lines in your source browser)
# Provide the three templates here. If omitted: derive common GitHub-style paths
# from repoRoot.
# source:
#   dir:  "https://github.com/foobar-blubber/package02/tree{/dir}"
#   file: "https://github.com/foobar-blubber/package02/blob{/dir}/{file}"
#   line: "https://github.com/foobar-blubber/package02/blob{/dir}/{file}#L{line}"

# optional
# urls:
#   doc: "https://example.com/url-to-your-own-docs/"
#   website: "https://example.org/url-to-your-mega-tool-website/"
#   source: "https://example.org/url-to-your-mega-tool-website/" # Defaults to https://<repo root>. Set a custom URL here, or set to false (without quotes) to hide the link.
#   redirect: "https://example.org/url-to-your-mega-tool-website/" # redirects only humans / browsers
---
