const { execSync } = require('child_process');
const path = require('path');

const tscPath = path.resolve(__dirname, '..', 'ORION', 'node_modules', 'typescript', 'bin', 'tsc');
console.log('Compiling iMpact AI Core Framework and Test Suites...');
execSync(`node "${tscPath}" --project tsconfig.test.json`, { stdio: 'inherit', cwd: __dirname });

console.log('\nExecuting verification suite...');
execSync(`node "${path.resolve(__dirname, 'dist-test', 'tests', 'iMpactCore.test.js')}"`, { stdio: 'inherit', cwd: __dirname });
