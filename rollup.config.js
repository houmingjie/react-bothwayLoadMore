import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'es'
    },
    plugins: [
        resolve(),
        commonjs({
            include: 'node_modules/**',
        }),
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),
        filesize(),
    ],
    external:['react','react-dom','prop-types']
};
