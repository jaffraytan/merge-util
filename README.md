# rs-merge-util
一个支持同时合并多个JSON对象的JS函数库，支持深度拷贝，支持拷贝日期、正则表达式以及函数对象，可选由后面的参数覆盖前面参数的同名非原子属性。本库支持在Node.js环境和浏览器环境下使用。

 Merge multiple objects into one, include Date/RegExp/Function instance, source objects are cloned, optionally overwrite the same property. Similar to other merge libs on NPM but more flexible. Works in Node.js and browser.

#1. 安装 (Installation)
```bash
npm install rs-merge-util --save
```

#2. 使用 (Usage)
##2.1) Node.js环境 (for Node.js Project)
```js
const mergeUtil = require("./rs-merge-util");
console.log(mergeUtil);

const obj1 = {a: 1, b: 2};
const obj2 = {b: 3, c: 4};
const obj = mergeUtil.mergeAll([{}, obj1, obj2], true);
console.log('obj: ', obj);
```

##2.2) TS（Angular）环境 (for TypeScript, Angular Project)
```ts
import { mergeUtil } from 'rs-merge-util';
console.log(mergeUtil);

const obj1 = {a: 1, b: 2};
const obj2 = {b: 3, c: 4};
const obj = mergeUtil.mergeAll([{}, obj1, obj2], true);
console.log('obj: ', obj);
```

##2.3) 浏览器环境 (In Browser)
```html
<script src="./rs-merge-util.js"></script>
<script>
console.log(mergeUtil);

const obj1 = {a: 1, b: 2};
const obj2 = {b: 3, c: 4};
const obj = mergeUtil.mergeAll([{}, obj1, obj2], true);
console.log('obj: ', obj);
</script>
```
#3. API

> * BUILTIN_OBJECT: Object

> * TYPED_ARRAY: Object

> * objToString: function
>> objToString = Object.prototype.toString

> * function isArray(value: any): boolean

> * function isDate(value: any): boolean

> * function isRegExp(value: any): boolean

> * function isFunction(value: any): boolean

> * function isString(value: any): boolean

> * function isObject(value: any): boolean

> * function hasOwn(obj: any, key: any): boolean
>> Object.prototype.hasOwnProperty.call(obj, key);

> * function isBuiltInObject(value: any): boolean;

> * function isTypedArray(value: any): boolean;

> * function isDom(value: any): boolean;

> * function cloneDate(value: Date): Date;

> * function cloneRegExp(value: RegExp): RegExp;

> * function cloneFunction(value: RegExp): RegExp;

> * function clone(source: any): any;

> * function merge(target: any, source: any, overwrite?: boolean): any;

> * function mergeAll(targetAndSources: any[], overwrite? : boolean): any;
