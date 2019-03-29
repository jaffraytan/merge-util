/**
 * 广州丰石科技有限公司拥有本软件版权 2019-03-27 并保留所有权利。
 * Copyright 2019, Guangzhou Rich Stone Data Technologies Company Limited,
 * All rights reserved.
 */

 /**
 * mergeUtil 命名空间
 */
export namespace mergeUtil {

/**
 * 内置对象，用于处理merge时无法遍历的对象的问题
        const BUILTIN_OBJECT = {
            '[object Error]': 1,
            '[object CanvasGradient]': 1,
            '[object CanvasPattern]': 1,
            '[object Image]': 1,
            '[object Canvas]': 1
        };
 */
    export const BUILTIN_OBJECT: any;
    
    /**
     * 类型化数组
        const TYPED_ARRAY = {
            '[object Int8Array]': 1,
            '[object Uint8Array]': 1,
            '[object Uint8ClampedArray]': 1,
            '[object Int16Array]': 1,
            '[object Uint16Array]': 1,
            '[object Int32Array]': 1,
            '[object Uint32Array]': 1,
            '[object Float32Array]': 1,
            '[object Float64Array]': 1
        };
     */
    export const TYPED_ARRAY: any;

    /**
     * 对象实例方法toString的快捷方式
     */
    export const objToString: any;

    /**
     * @Description 判断参数对象是否数组
     * @method isArray
     * @param {*} value
     * @return {boolean}
     */
    export function isArray(value: any): boolean;

    /**
     * @Description 判断参数对象是否为日期
     * @method isDate
     * @param {*} value
     * @return {boolean}
     */
    export function isDate(value: any): boolean;
        
    /**
     * @Description 判断参数对象是否为正则表达式
     * @method isRegExp
     * @param {*} value
     * @return {boolean}
     */
    export function isRegExp(value: any): boolean;
    
    /**
     * @Description 判断参数对象是否函数
     * @method isFunction
     * @param {*} value
     * @return {boolean}
     */
    export function isFunction(value: any): boolean;

    /**
     * @Description 判断参数对象是否字符串
     * @method isString
     * @param {*} value
     * @return {boolean}
     */
    export function isString(value: any): boolean;

    /**
     * @Description 判断参数对象是否对象
     * @method isObject
     * @param {*} value
     * @return {boolean}
     */
    export function isObject(value: any): boolean;
    
    /**
     * @Description 判断参数对象是否包含属性，Object.prototype.hasOwnProperty.call(obj, key) 的快捷方式
     * @method hasOwn
     * @param {*} obj
     * @param {*} key
     * @return {boolean}
     */
    export function hasOwn(obj: any, key: any): boolean;

    /**
     * @Description 判断参数对象是否为内置对象
     * @method isBuiltInObject
     * @param {*} value
     * @return {boolean}
     */
    export function isBuiltInObject(value: any): boolean;

    /**
     * @Description 判断参数对象是否为类型化数组
     * @method isTypedArray
     * @param {*} value
     * @return {boolean}
     */
    export function isTypedArray(value: any): boolean;

    /**
     * @Description 判断参数对象是否DOM对象
     * @method isDom
     * @param {*} value
     * @return {boolean}
     */
    export function isDom(value: any): boolean;

    /**
     * @Description 克隆日期对象
     * @method cloneDate
     * @param {Date} value
     * @return {Date}
     */
    export function cloneDate(value: Date): Date;

    /**
     * @Description 克隆正则表达式对象
     * @method cloneRegExp
     * @param {RegExp} value
     * @return {RegExp}
     */
    export function cloneRegExp(value: RegExp): RegExp;

    /**
     * @Description 克隆函数
     * @method cloneFunction
     * @param {RegExp} value
     * @return {RegExp}
     */
    export function cloneFunction(value: RegExp): RegExp;

    /**
     * @Description 克隆对象
     * 能被克隆的对象类型：
     *     Plain object, Array, TypedArray, number, string, null, undefined.
     * 直接用原始数据进行赋值的数据类型：
     *     BUILTIN_OBJECT
     * 用户定义类的实例将克隆到一个原型中没有属性的普通对象。
     * @method clone
     * @param {*} source
     * @return {*} new
     */
    export function clone(source: any): any;

    /**
     * @Description 合并函数
     * @method merge
     * @param {*} target
     * @param {*} source
     * @param {boolean} [overwrite=false]
     * @return {Object}
     */
    export function merge(target: any, source: any, overwrite?: boolean): any;

    /**
     * @Description 合并函数，对merge的封装
     * @method mergeAll
     * @param {Array} targetAndSources，第一个元素为目标对象，后续元素为源对象
     * @param {boolean} [overwrite=false]
     * @return {Object}
     */
    export function mergeAll(targetAndSources: any[], overwrite? : boolean): any;

}