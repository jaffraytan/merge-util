/**
 * 用立即执行函数方式封装内部所有对象和方法，避免命名空间冲突
 * 立即执行函数的参数为环境变量检测结果，如果参数为真，则为node环境，否则为浏览器环境
 * 如果是node环境，则exports mergeUtil对象；如果是浏览器环境则将mergeUtil对象作为全局变量window的属性
 * 
 */
;(function(hasModule) {
    //定义命名空间
    const mergeUtil = {
        
        // 内置对象，用于处理merge时无法遍历的对象的问题
        BUILTIN_OBJECT: {
            '[object Error]': 1,
            '[object CanvasGradient]': 1,
            '[object CanvasPattern]': 1,
            '[object Image]': 1,
            '[object Canvas]': 1
        },

        //类型化数组
        TYPED_ARRAY: {
            '[object Int8Array]': 1,
            '[object Uint8Array]': 1,
            '[object Uint8ClampedArray]': 1,
            '[object Int16Array]': 1,
            '[object Uint16Array]': 1,
            '[object Int32Array]': 1,
            '[object Uint32Array]': 1,
            '[object Float32Array]': 1,
            '[object Float64Array]': 1
        },

        //对象实例方法toString的快捷方式
        objToString: Object.prototype.toString,

        /**
         * @Description 判断参数对象是否数组
         * @method isArray
         * @param {*} value
         * @return {boolean}
         */
        isArray(value) {
            return this.objToString.call(value) === '[object Array]';
        },

        /**
         * @Description 判断参数对象是否为日期
         * @method isDate
         * @param {*} value
         * @return {boolean}
         */
        isDate(value) {
            return this.objToString.call(value) === '[object Date]';
        },

        /**
         * @Description 判断参数对象是否为正则表达式
         * @method isRegExp
         * @param {*} value
         * @return {boolean}
         */
        isRegExp(value) {
            return this.objToString.call(value) === '[object RegExp]';
        },

        /**
         * @Description 判断参数对象是否函数
         * @method isFunction
         * @param {*} value
         * @return {boolean}
         */
        isFunction(value) {
            return typeof value === 'function';
        },
        
        /**
         * @Description 判断参数对象是否字符串
         * @method isString
         * @param {*} value
         * @return {boolean}
         */
        isString(value) {
            return this.objToString.call(value) === '[object String]';
        },

        /**
         * @Description 判断参数对象是否对象
         * @method isObject
         * @param {*} value
         * @return {boolean}
         */
        isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return type === 'function' || (!!value && type === 'object');
        },

        /**
         * @Description 判断参数对象是否包含属性
         * @method hasOwn
         * @param {*} obj
         * @param {*} key
         * @return {boolean}
         */
        hasOwn(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        },

        /**
         * @Description 判断参数对象是否为内置对象
         * @method isBuiltInObject
         * @param {*} value
         * @return {boolean}
         */
        isBuiltInObject(value) {
            return !!this.BUILTIN_OBJECT[this.objToString.call(value)];
        },

        /**
         * @Description 判断参数对象是否为类型化数组
         * @method isTypedArray
         * @param {*} value
         * @return {boolean}
         */
        isTypedArray(value) {
            return !!this.TYPED_ARRAY[this.objToString.call(value)];
        },

        /**
         * @Description 判断参数对象是否DOM对象
         * @method isDom
         * @param {*} value
         * @return {boolean}
         */
        isDom(value) {
            return typeof value === 'object'
                && typeof value.nodeType === 'number'
                && typeof value.ownerDocument === 'object';
        },

        /**
         * @Description 克隆日期对象
         * @method cloneDate
         * @param {Date} value
         * @return {Date}
         */
        cloneDate(value) {
            return new Date(value.valueOf());
        },

        /**
         * @Description 克隆正则表达式对象
         * @method cloneRegExp
         * @param {RegExp} value
         * @return {RegExp}
         */
        cloneRegExp(value) {
            var pattern = value.valueOf();
            var flags = '';
            flags += pattern.global ? 'g' : '';
            flags += pattern.ignoreCase ? 'i' : '';
            flags += pattern.multiline ? 'm' : '';
            return new RegExp(pattern.source, flags);
        },

        /**
         * @Description 克隆函数
         * @method cloneFunction
         * @param {RegExp} value
         * @return {RegExp}
         */
        cloneFunction(value) {
            var newfun = new Function('return ' + value.toString())();
            for (var key in value)
                newfun[key] = value[key];
            return newfun;
        },

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
        clone(source) {
            if (source == null || typeof source !== 'object') {
                return source;
            }
        
            var result = source;
            var typeStr = this.objToString.call(source);
        
            if (typeStr === '[object Date]') {
                result = this.cloneDate(source);
            }
            else if (typeStr === '[object RegExp]') {
                result = this.cloneRegExp(source);
            }
            else if (typeStr === '[object Function]') {
                result = this.cloneFunction(source);
            }
            else if (typeStr === '[object Array]') {
                result = [];
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = this.clone(source[i]);
                }
            }
            else if (this.TYPED_ARRAY[typeStr]) {
                var Ctor = source.constructor;
                if (source.constructor.from) {
                    result = Ctor.from(source);
                }
                else {
                    result = new Ctor(source.length);
                    for (var i = 0, len = source.length; i < len; i++) {
                        result[i] = this.clone(source[i]);
                    }
                }
            }
            else if (!this.BUILTIN_OBJECT[typeStr] && !this.isDom(source)) {
                result = {};
                for (var key in source) {
                    if (this.hasOwn(source, key)) {
                        result[key] = this.clone(source[key]);
                    }
                }
            }
        
            return result;
        },
       
        /**
         * @Description 合并函数
         * @method merge
         * @param {*} target
         * @param {*} source
         * @param {boolean} [overwrite=false]
         * @return {Object}
         */
        merge(target, source, overwrite) {
            // We should escapse that source is string
            // and enter for ... in ...
            if (!this.isObject(source) || !this.isObject(target)) {
                return overwrite ? this.clone(source) : target;
            }

            for (var key in source) {
                if (this.hasOwn(source, key)) {
                    var targetProp = target[key];
                    var sourceProp = source[key];

                    if (this.isObject(sourceProp)
                        && this.isObject(targetProp)
                        //&& !this.isArray(sourceProp)
                        //&& !this.isArray(targetProp)
                        && !this.isDom(sourceProp)
                        && !this.isDom(targetProp)
                        && !this.isBuiltInObject(sourceProp)
                        && !this.isBuiltInObject(targetProp)
                    ) {
                        // 如果需要递归覆盖，就递归调用merge
                        this.merge(targetProp, sourceProp, overwrite);
                    }
                    else if (overwrite || !(key in target)) {
                        // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                        // NOTE，在 target[key] 不存在的时候也是直接覆盖
                        target[key] = this.clone(source[key], true);
                    }
                }
            }

            return target;
        },

        /**
         * @Description 合并函数，对merge的封装
         * @method mergeAll
         * @param {Array} targetAndSources，第一个元素为目标对象，后续元素为源对象
         * @param {boolean} [overwrite=false]
         * @return {Object}
         */
        mergeAll(targetAndSources, overwrite) {
            var result = targetAndSources[0];
            for (var i = 1, len = targetAndSources.length; i < len; i++) {
                result = this.merge(result, targetAndSources[i], overwrite);
            }
            return result;
        }

    };
    
    //环境判断
    if (hasModule) {
        //如果是node环境，则exports mergeUtil对象
		module.exports = mergeUtil;
	} else {
        //如果是浏览器环境则将mergeUtil对象作为全局变量window的属性
		window['mergeUtil'] = mergeUtil;
    }
    
})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);