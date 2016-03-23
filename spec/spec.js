/**
 * 单元测试
 * @file 单元测试
 * @author lidechaobaidu.com
 * @param {Object} require require.js 方法
 */

define(function (require) {
    require('../app/scripts/ajax');
    var util = require('../app/scripts/util');
    var storage = require('../app/scripts/storage');
    describe('util.createKey传递各类型参数的验证', function () {
        it('字符串', function () {
            var options = 'string';
            var exp = 'string';
            expect(exp).toEqual(util.createKey(options));
        });
        it('数字', function () {
            var options = 123;
            var exp = '123';
            expect(exp).toEqual(util.createKey(options));
        });
        it('bool', function () {
            var options = true;
            var exp = 'true';
            expect(exp).toEqual(util.createKey(options));
        });
        it('null', function () {
            var options = null;
            var exp = 'null';
            expect(exp).toEqual(util.createKey(options));
        });
        it('undefined', function () {
            var options;
            var exp = 'undefined';
            expect(exp).toEqual(util.createKey(options));
        });
        it('数组', function () {
            var options = [1, 2, 3, 5];
            var exp = '1-2-3-5';
            expect(exp).toEqual(util.createKey(options));
        });
        it('对象', function () {
            var options = {
                page: 1,
                total: 1
            };
            var exp = 'page1-total1';
            expect(exp).toEqual(util.createKey(options));
        });
        it('对象数组', function () {
            var options = [{
                key1: 'a',
                key2: 'b'
            }, {
                key3: 'c',
                key4: 'd'
            }];
            var exp = 'key1a-key2b-key3c-key4d';
            expect(exp).toEqual(util.createKey(options));
        });
        it('数组对象', function () {
            var options = {
                key1: [1, 2, 3],
                key2: [1, 2, 4]
            };
            var exp = 'key11-key12-key13-key21-key22-key24';
            expect(exp).toEqual(util.createKey(options));
        });
        it('多层混合嵌套', function () {
            var options = {
                key1: [{
                    key2: 1,
                    key4: [1, 2, 4],
                    key5: {
                        key6: 1,
                        key7: [
                            [1, 2],
                            [4, 5], {
                                key8: 1
                            }
                        ]
                    }
                }, 2, 3],
                key2: [1, 2, 4]
            };
            var exp = 'key12-key13-key1key21-key1key41-key1key42-key1key44-key1'
                + 'key5key61-key1key5key71-key1key5key72-key1key5key74-key1key5'
                + 'key75-key1key5key7key81-key21-key22-key24';
            expect(exp).toEqual(util.createKey(options));
        });
    });
    describe('util.createKey生成key的唯一性', function () {
        it('对象属性顺序不同', function () {
            var option1 = {
                key1: 'a',
                key2: 'b'
            };
            var option2 = {
                key2: 'b',
                key1: 'a'
            };
            expect(util.createKey(option2)).toEqual(util.createKey(option1));
        });
        it('对象属性值为数组改变数组顺序生成相同key', function () {
            var option1 = {
                key1: [1, 2, 3],
                key2: [3, 2, 1]
            };
            var option2 = {
                key1: [1, 2, 3],
                key2: [3, 2, 1]
            };
            expect(util.createKey(option2)).toEqual(util.createKey(option1));
        });
        it('对象属性值为数组并对调值后生成不同key', function () {
            var option1 = {
                key1: [1, 2, 3],
                key2: [4, 5, 6]
            };
            var option2 = {
                key1: [4, 5, 6],
                key2: [1, 2, 3]
            };
            expect(util.createKey(option2)).not.toEqual(util.createKey(option1));
        });
        it('对象属性值为对象并对调值后生成不同key', function () {
            var option1 = {
                key1: {
                    key3: 1,
                    key4: 2
                },
                key2: 'b'
            };
            var option2 = {
                key1: {
                    key3: 2,
                    key4: 1
                },
                key2: 'b'
            };
            expect(util.createKey(option2)).not.toEqual(util.createKey(option1));
        });
    });
    describe('storage对象功能验证', function () {
        it('set/get/remove/clear获取缓存数据', function () {
            var data = {
                data: []
            };
            storage.set('test1-test2', data);
            expect(data).toEqual(storage.get('test1-test2'));
            storage.remove('test1-test2');
            expect(storage.get('test1-test2')).toBeUndefined();
            storage.set('test1-test2', data);
            storage.clear();
            expect(0).toEqual(localStorage.length);
        });
        it('isExpire是否过期验证', function () {
            storage.set('test1-test2', {}, 10000);
            expect(false).toEqual(storage.isExpire('test1-test2'));
            localStorage.clear();
            storage.set('test1-test2', {}, -1);
            expect(true).toEqual(storage.isExpire('test1-test2'));
            localStorage.clear();
        });
    });
});
