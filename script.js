const core = require('@actions/core');
const github = require('@actions/github');

// Ref: https://stackoverflow.com/questions/63521430/clear-cache-in-github-actions
async function run() {
  try {
    const pattern = core.getInput('PATTERN');
    const token = core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(token);

    console.log(`Clearing caches matching pattern: ${pattern}`);

    const caches = await octokit.rest.actions.getActionsCacheList({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
    });

    for (const cache of caches.data.actions_caches) {
      if (new RegExp(pattern).test(cache.key)) {
        console.log(`Deleting cache with key: ${cache.key}`);

        await octokit.rest.actions.deleteActionsCacheById({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          cache_id: cache.id,
        });
      }
    }

    console.log("Cache clearing completed.");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
