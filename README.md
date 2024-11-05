## Introduction

This GitHub Action deletes cache entries based on a specified pattern. Useful for managing cache in CI/CD pipelines.

## Usage

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      # `actions:write` permission is required to delete caches
      #
      # refs:
      #  - https://stackoverflow.com/questions/70435286/resource-not-accessible-by-integration-on-github-post-repos-owner-repo-ac
      #  - https://github.com/actions/cache/blob/6849a6489940f00c2f30c0fb92c6274307ccb58a/tips-and-workarounds.md?plain=1#L57
      #  - https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#permissions
      actions: write
    steps:
      - name: Clear Cache
        uses: open-control-systems/gh-action-cache-clear@v0.0.2
        with:
          PATTERN: "^ccache-last-hash"
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
