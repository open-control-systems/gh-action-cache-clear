## Introduction

This GitHub Action deletes cache entries based on a specified pattern. Useful for managing cache in CI/CD pipelines.

## Usage

```yaml
- name: Clear Cache
  uses: open-control-systems/gh-action-cache-clear@v0.0.1
  with:
    pattern: "^ccache-last-hash"
    github_token: ${{ secrets.GITHUB_TOKEN }}
