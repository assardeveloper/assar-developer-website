#!/bin/zsh
# Rebuilds the site (pulling your newest YouTube videos and GitHub repos) and deploys it to Firebase.
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")/.."
npm run build
firebase deploy --only hosting:assardeveloper-dev --non-interactive
