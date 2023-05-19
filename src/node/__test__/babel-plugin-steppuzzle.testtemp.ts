import { expect, test, describe } from 'vitest';
import babelPluginSteppuzzle from '../babel-plugin-steppuzzle';
import { TransformOptions, transformAsync } from '@babel/core';
import os from 'os';
import { MASK_SPLITTER } from '../constants';

const isWindows = os.platform() === 'win32';

describe('babel-plugin-steppuzzle', () => {
  const STEPPUZZLE_PATH = '../Comp/index';
  const prefix = isWindows ? 'C' : '';
  const IMPORTER_PATH = prefix + '/User/project/test.tsx';
  const babelOptions: TransformOptions = {
    filename: IMPORTER_PATH,
    presets: ['@babel/preset-react'],
    plugins: [babelPluginSteppuzzle]
  };
  test('Should compile jsx identifier', async () => {
    const code = `import Aside from '${STEPPUZZLE_PATH}';export default function App() {return <Aside __step />}`;
    const result = await transformAsync(code, babelOptions);
    expect(result?.code).toContain(
      `__step: "${STEPPUZZLE_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    );
  });
});
