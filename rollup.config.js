import path from 'path'
import vue from 'rollup-plugin-vue';
// import babel from 'rollup-plugin-babel';
// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2'
import cleaner from 'rollup-plugin-cleaner'
import { terser } from 'rollup-plugin-terser'

import resolve from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import css from 'rollup-plugin-css-only'
import pkg from './package.json'
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias'

const bannerTxt = `/*! Ryvok ui-kit v${pkg.version} */`

const getPlugins = (props = {vue: {}, typescript: {}}) => [
  css({
    output: 'bundle.css'
  }),
  vue({
    data: {
      scss: () => `@import "src/assets/styles/variables.scss";`,
      sass: () => `@import "src/assets/styles/variables.scss";`,
    },
    ...props.vue,
    css: false
  }),
  // Минифицируем для продуктовой сборки
  process.env.NODE_ENV === 'production' ? terser() : '',
  alias({
    entries: {
      '@': path.resolve(__dirname, 'src')
    }
  }),

  resolve({
    extensions: ['.vue', '.js', '.ts']
  }),
  typescript(props.typescript),
  babel(),
  cjs(),
  image()
]

const result = {
  input: './src/index.ts',
  external: ['vue', 'vue-property-decorator'],
  output: {
    format: 'esm',
    file: 'lib/index.esm.js',
    // name: 'index.esm',
    // dir: 'lib',
    banner: bannerTxt,
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
  },
  plugins: [
    ...getPlugins({
      template: {
        isProduction: true,
        compilerOptions: {
          whitespace: 'condense'
        }
      }
    }),
    cleaner({
      targets: ['./lib']
    })
  ]
};


// const result = {
//   input: 'src/index.ts', // Путь к вашему основному файлу
//   output: {
//     file: 'dist/ui-kit.esm.js', // Путь к сгенерированному ESM бандлу
//     format: 'esm', // Формат ESM
//     exports: 'named',
//     globals: {
//       vue: 'Vue'
//     },
//   },
//   external: ['vue', 'vue-property-decorator'],
//   plugins: [
//     css({
//       output: 'bundle.css'
//     }),
//     vue({
//       data: {
//         scss: () => `@import "src/assets/styles/variables.scss";`,
//         sass: () => `@import "src/assets/styles/variables.scss";`,
//       },
//       css: false
//     }),
//     terser(),

//     alias({
//       entries: {
//         '@': path.resolve(__dirname, 'src')
//       }
//     }),

//     rslv({
//       extensions: ['.vue', '.js', '.ts']
//     }), // Разрешение модулей Node.js
//     typescript(),
//     bbl(),
//     cjs(), // Преобразование CommonJS модулей в ES модули
//     image(),
//     cleaner({
//       targets: ['./dist']
//     })
//   ],
// };

export default result