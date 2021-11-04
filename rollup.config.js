import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

const isProduction = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.tsx',
    output: {
        file: 'dist/bundle.js',
        sourcemap: true
    },
    plugins: [
        // dist cleanup
        isProduction && del({ targets: 'dist/*' }),

        // copy static assets
        copy(
            {
                targets: [
                    { src: 'src/index.html', dest: 'dist' },
                ],
            }
        ),

        // module resolution
        nodeResolve(),
        commonjs({
            include: 'node_modules/**',
        }),

        // language support
        typescript({ tsconfig: 'tsconfig.json' }),
        postcss({
            extract: false,
            minimize: isProduction,
            modules: true
        }),

        // dev server with live reload
        ...(isProduction ? [] : [
            serve({
                open: true,
                contentBase: 'dist'
            }),
            livereload('dist')
        ]),

        // preact alias react
        alias({
            entries: [
              { find: 'react', replacement: 'preact/compat' },
              { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
              { find: 'react-dom', replacement: 'preact/compat' },
              { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
            ]
        }),

        // replace env variables
        replace({
            'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
            preventAssignment: true
        })
    ],
};