const { spawnSync } = require('node:child_process');
const path = require('node:path');

const testFile = path.join(__dirname, 'dom-logic.test.js');
const result = spawnSync(process.execPath, ['--test', testFile], {
  stdio: 'inherit'
});

process.exit(result.status ?? 1);
