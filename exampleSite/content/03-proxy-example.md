---
title: "03-proxy-example"
draft: false
tags:
  - "go-module"

# Vanity import path root
# Defaults to host+path from this page's page .Permalink if omitted
import_path: "go.example.org/03-proxy-example"

# module proxy (preferred if you run your own proxy, emits something like
# <meta name="go-import" content="example.org mod https://proxy.example.org">)
mod_proxy:
  url: "https://proxy.example.org"

# go-source (for deep links to dirs/files/lines in your source browser)
# Provide the three templates here. If omitted: derive common GitHub-style paths
# from repoRoot.
source:
  dir:  "https://codeberg.example.com/FIXME-FIXME-FIXME/03-proxy-example/tree{/dir}"
  file: "https://codeberg.example.com/FIXME-FIXME-FIXME/03-proxy-example/blob{/dir}/{file}"
  line: "https://codeberg.example.com/FIXME-FIXME-FIXME/03-proxy-example/blob{/dir}/{file}#L{line}"

# optional
urls:
  doc: "https://example.net/03-proxy-example/doc/"
  website: "https://example.com/url-to-your-mega-tool-website/"
  source: "https://example.org/repo/" # Defaults to https://<repo root>. Set a custom URL here, or set to false (without quotes) to hide the link.
  redirect: false # redirects only humans / browsers
---
