import babel from 'rollup-plugin-babel'
import localResolve from 'rollup-plugin-local-resolve';
import svgToJsx from 'rollup-plugin-svg-to-jsx'

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
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      presets: [['es2015', { modules: false }], 'react'],
      plugins: [
        'transform-object-rest-spread',
        'transform-runtime',
        'transform-react-remove-prop-types',
        [
          'transform-define', 'scripts/define.js'
        ]
      ]
    })
  ]
};
