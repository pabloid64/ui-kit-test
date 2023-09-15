import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js', // Путь к вашему основному файлу
  output: {
    file: 'dist/ui-kit.esm.js', // Путь к сгенерированному ESM бандлу
    format: 'esm', // Формат ESM
  },
  external: ['vue'],
  plugins: [
    terser(),
    vue(), // Плагин для обработки файлов Vue
    resolve(), // Разрешение модулей Node.js
    commonjs(), // Преобразование CommonJS модулей в ES модули
    babel({ 
      exclude: 'node_modules/**', // Транспиляция, исключая node_modules
      presets: ['@babel/preset-env'] 
    }), // Транспиляция в ES5
  ],
};