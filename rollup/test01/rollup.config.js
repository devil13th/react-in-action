import {uglify} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
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
    input: './index.js',
    //你想将其格式化成什么格式(必选项不然会报错)
    //format: 'es',
    output:{
        file:'./bundle.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**', // only transpile our source code
            runtimeHelpers: true
        }),
        uglify()
    ]
    
};