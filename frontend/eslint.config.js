const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
	expoConfig,
	{
		// Optional: override/add custom rules here
		rules: {
			// Example rules — adjust to your team's style:
			"semi": ["error", "always"],
			"quotes": ["error", "double"],
			"indent": ["error", "tab"]
		},
		// Optional: ignore certain files or folders from linting
		ignores: [
			"node_modules/",
			// e.g. ignore build, dist, etc.
		],
	},
]);