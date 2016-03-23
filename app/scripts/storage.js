/**
 * 缓存工具
 * 默认采用 localStorage
 * 备用 js 对象模拟
 * @file Storage 操作
 * @author lidechaobaidu.com
 */

define(function (require) {
    var localStorage = window.localStorage;

    /**
     * 默认过期时间
     *
     * @const
     * @type {number}
     */
    var EXPIRE_TIME = 1000;

    /**
     * @namespace
     */
    var storage = {

        /**
         * 根据键判断数据是否过期
         * @inner
         * @param  {string}  key 过期时间的键
         * @return {boolean} 数据过期为true
         */
        isExpire: function (key) {
            var expireTime = this.get(key, 'expireTime');
            if (expireTime) {
                return expireTime < new Date();
            }
            return true;
        },

        /**
         * 获取缓存数据
         * @param  {string} key  数据在缓存中的键
         * @param  {Object} type 获取数据类型 data/expireTime
         * @return {Object} 缓存数据
         */
        get: function (key, type) {
            if (!key) {
                return;
            }
            type = type || 'data';
            // 取出的json数据
            try {
                var json = JSON.parse(localStorage.getItem(key));
            }
            catch (error) {
                throw new Error(error.message);
            }
            return json && json[type] ? json[type] : undefined;
        },

        /**
         * 向缓存中添加数据以及过期时间
         * @param {string} key   数据在缓存中的键
         * @param {Object} data  需要缓存的数据
         * @param {number} time  数据过期时间
         */
        set: function (key, data, time) {
            if (key && data) {
                time = time || EXPIRE_TIME;
                localStorage.setItem(key, JSON.stringify({
                    data: data,
                    expireTime: +(new Date()) + time
                }));
            }
        },

        /**
         * 删除数据
         * @param {string} key  数据在缓存中的键
         */
        remove: function (key) {
            if (key) {
                localStorage.removeItem(key);
            }
        },

        /**
         * 清空所有数据
         */
        clear: function () {
            localStorage.clear();
        }
    };

    // 如果浏览器不支持localStorage 采用js 变量缓存方式替代
    if (!localStorage) {
        var store = {};
        // 重写一些针对localStorage的操作
        storage.set = function (key, data) {
            if (key && data && store[key]) {
                store[key] = data;
                return this;
            }
        };

        storage.get = function (key) {
            if (key && store[key]) {
                return store[key];
            }
        };

        storage.remove = function (key) {
            if (key && store[key]) {
                delete store[key];
            }
        };

        storage.clear = function () {
            if (store) {
                store = {};
            }
        };
    }
    return storage;
});
