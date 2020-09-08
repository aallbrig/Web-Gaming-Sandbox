#!/usr/bin/env sh

git__get_tag_without_v() {
  git_tag="$(git describe --tags "$(git rev-list --tags --max-count=1)")"
  echo "${git_tag:1}"
}
