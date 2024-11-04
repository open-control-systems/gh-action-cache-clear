/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 345:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 753:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(345);
const github = __nccwpck_require__(753);

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

module.exports = __webpack_exports__;
/******/ })()
;