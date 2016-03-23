/**
 * 工具函数
 * @file 根据ajax参数生成唯一key
 * @author lidechaobaidu.com
 * @param  {Object} require require.js 方法
 * @return {Object} util 工具函数对象
 */

define(function (require) {

    /**
     * @namespace
     */
    var util = {};

    /**
     * 生成键值方法
     * @param  {Object} options   ajax请求参数
     * @param  {string} pre       key的前缀
     * @return {string} 字符串键值
     */
    util.createKey = function (options, pre) {
        var result = [];
        pre = pre || '';
        var type = $.type(options);
        if (type === 'object') {
            _.each(options, function (val, key) {
                result.push(util.createKey(val, pre + key));
            });
        }
        else if (type === 'array') {
            _.each(options, function (val) {
                result.push(util.createKey(val, pre));
            });
        }
        else {
            options = pre + options;
            return options;
        }
        return result.sort().join('-');
    };
    return util;
});
