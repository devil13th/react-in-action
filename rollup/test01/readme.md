> import uglify from 'rollup-plugin-uglify'; 
应该是
> import {uglify} from 'rollup-plugin-uglify'; 

影响到对es6的class写法的编译
> import resolve from 'rollup-plugin-node-resolve';


```

{
  "presets": [
    ["env",{
      "modules": false
    }],
    "stage-0"
  ],
  "plugins": ["transform-runtime","external-helpers"]
}
```