#!/usr/bin/env bash
# Build the Jekyll site, upload it to the R2 bucket, and (re)deploy the Worker.
#
# Usage: ./deploy.sh
#
# Requires: Ruby 3.3 (via Homebrew), wrangler (authenticated). The Worker only
# needs redeploying when worker/index.js or wrangler.toml change, but running it
# every time is harmless.
set -euo pipefail
cd "$(dirname "$0")"

# Use Homebrew Ruby 3.3 — system Ruby 2.6 is too old for the GH Pages gems and
# Homebrew's default Ruby 4.x is too new for the theme.
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"
export GEM_HOME="$HOME/.gem/ruby33"
export PATH="$GEM_HOME/bin:$PATH"

BUCKET="slabgorb"
PARALLEL="${PARALLEL:-8}"

# Authenticate via the wrangler OAuth session (`wrangler login`), which covers
# both R2 writes and Worker deploys. Unset any ambient API token so a partial
# (e.g. R2-only) token can't shadow OAuth and break the Worker deploy.
unset CLOUDFLARE_API_TOKEN

echo "==> Building site (production)"
JEKYLL_ENV=production bundle exec jekyll build

echo "==> Uploading _site to R2 bucket '$BUCKET'"
cd _site
# Upload every file under _site/ as <key> = path relative to _site (the ./ prefix
# is stripped inside the worker). Content-Type is set by the Worker on serve.
find . -type f -print0 \
  | xargs -0 -P "$PARALLEL" -n1 sh -c 'k="${1#./}"; wrangler r2 object put "'"$BUCKET"'/$k" --file "$1" --remote >/dev/null' _
cd ..

echo "==> Deploying Worker"
wrangler deploy

echo "==> Done. Live at https://slabgorb.com and https://www.slabgorb.com"
