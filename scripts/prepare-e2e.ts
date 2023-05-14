import path from 'path';
import fs from 'fs-extra';
import * as execa from 'execa';

const exampleDir = path.resolve(__dirname, '../e2e/playground/basic');
const ROOT = path.resolve(__dirname, '../');

const defaultOptions = {
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
    // pnpm build
    execa.commandSync('pnpm tsup:build', {
      cwd: ROOT,
      ...defaultOptions
    });
    // npx playwright install
    execa.commandSync('npx playwright install', {
      cwd: ROOT,
      ...defaultOptions
    });
  }
  // pnpm dev
  execa.commandSync('pnpm dev', {
    cwd: exampleDir,
    ...defaultOptions
  });
}

prepareE2E();
