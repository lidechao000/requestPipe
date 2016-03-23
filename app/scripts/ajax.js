/**
 * @file localStorage缓存ajax请求数据
 * @author lidechaobaidu.com
 */

define(function (require) {
    var util = require('./util');
    var storage = require('./storage');
    $.extend({

        /**
         * ajax扩展
         * @param  {Object} options 请求参数
         * @param  {number} time    单位秒的时间数据 默认 1000s
         * @return {Object} jq promise对象
         */
        request: function (options, time) {
            var deferred = new $.Deferred();
            var key = util.createKey(options);
            var data = storage.get(key);
            // 缓存中存在有效数据
            if (data && !storage.isExpire(key)) {
                deferred.resolve(data);
                return deferred.promise();
            }
            // 缓存中存在过期数据，
            // 暂时返回过期数据，同时发送ajax更新数据
            else if (data) {
                deferred.notify(data);
                storage.remove(key);
            }
            // 缓存中无数据，发送请求并放到缓存中
            $.ajax(options)
                .done(function (data) {
                    storage.set(key, data, time);
                    deferred.resolve(data);
                });
            return deferred.promise();
        }
    });
});
