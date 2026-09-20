const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

/**
 * The web app's `src/lib` holds the single source of truth for site copy,
 * team members and the telemetry model. Metro only watches the project root
 * by default, so it is added here and imported through the `@shared/*` path
 * alias declared in tsconfig.json.
 */
config.watchFolders = [path.join(workspaceRoot, 'src', 'lib')];
config.resolver.nodeModulesPaths = [path.join(projectRoot, 'node_modules')];

module.exports = config;
