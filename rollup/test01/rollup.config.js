import {uglify} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-cpy';
/*
export default {
    input: './index.js',
     //也可以是一个
     ouput:{
         file:'./bundle.js',
         format: 'cjs',
     },
     format: 'cjs',
}
*/

export default {
    //目录
    input: './src/index.js',
    //你想将其格式化成什么格式(必选项不然会报错)
    //format的值可以是 system, amd, cjs, es, iife, umd
    //format: 'es',
    output:[
        {
            file:'./es/bundle.js',
            format: 'es',
            sourcemap: true
        },
        {
            file:'./cjs/bundle.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            name: "test",
            file:'./umd/bundle.js',
            format: 'umd',
            sourcemap: true
        },
        {
            name: "test",
            file:'./amd/bundle.js',
            format: 'amd',
            sourcemap: true
        },
        
        {
            name: "idx",
            file:'./dist/bundle.js',
            format: 'umd',
            sourcemap: true
        }
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**', // only transpile our source code
            runtimeHelpers: true
        }),
        //uglify()
        copy([
            //{ files: 'umd/*.js*', dest: '../website/public/static/js' },
            //{ files: 'umd/*.css*', dest: '../website/public/static/css' },

            { files: 'css/*.css*', dest: 'dist/css' },
            { files: 'index.html', dest: 'dist' }
        ])
    ]
    
};