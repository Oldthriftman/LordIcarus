# [NAME] — blog

Jekyll blog built for GitHub Pages (no custom plugins, so Pages builds it natively).

## Customize
- `_config.yml` → `title` / `author` (replace `[NAME]`), `description`, `home_posts`.
- `assets/me.jpg` → your photo (square, ≥ 200×200; it's cropped to a circle). The committed file is a placeholder.

## Write a post
Create `_posts/YYYY-MM-DD-slug.md`:

```markdown
---
title: "Post title"
description: "Optional summary for the home card (defaults to the first paragraph)."
image: /assets/posts/cover.jpg   # optional card cover
---

Your Markdown here.
```

## Run locally
```sh
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

## Publish
Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
For a user site the repo must be named `<username>.github.io` and `baseurl` stays empty;
for any other repo name set `baseurl: "/<repo>"` in `_config.yml`.

## Edit in the browser (Pages CMS)
Log in at https://app.pagescms.org with GitHub and open this repo (config: `.pages.yml`).
Uploaded images go to `assets/posts/`. If the repo is renamed to `Oldthriftman.github.io`,
set `baseurl: ""` in `_config.yml` and `media.output: /assets/posts` in `.pages.yml`.
