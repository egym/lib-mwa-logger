const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { default: dts } = require('rollup-plugin-dts');

const packageJson = require('./package.json');
const peerDependencies = Object.keys(packageJson.peerDependencies || {});
const isExternal = (id) => peerDependencies.some((dependency) => id === dependency || id.startsWith(`${dependency}/`));

module.exports = [
  {
    input: 'src/index.ts',
    external: isExternal,
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', sourceMap: false }),
    ]
  },
  {
    input: 'dist/mwa-logger/esm/types/index.d.ts',
    external: isExternal,
    output: [
      { file: 'dist/mwa-logger/index.d.ts', format: 'esm' }
    ],
    plugins: [dts()]
  }
]
