import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import svgToJsx from 'rollup-plugin-svg-to-jsx';
import replace from 'rollup-plugin-replace';
import fs from 'fs';
import path from 'path';

var pack = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf8'));

export default {
  input: './src/index.js',
  output: {
    file: './dist/emoji-mart.es.js',
    format: 'es'
  },
  plugins: [
    localResolve(),
    svgToJsx(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    replace({
      EMOJI_DATASOURCE_VERSION: `'${pack.devDependencies['emoji-datasource']}'`
    })
  ]
};
