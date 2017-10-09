(function() {
    var root = this;
    var config = {
        alias: {
            'seajs-debug': 'seajs/seajs-debug/1.1.1/seajs-debug',
            '$': 'jquery/jquery/1.10.1/jquery',
            '$-debug': 'jquery/jquery/1.10.1/jquery-debug',
            'jquery': 'jquery/jquery/1.10.1/jquery',
            'jquery-debug': 'jquery/jquery/1.10.1/jquery-debug',
            'handlebars': 'alinw/handlebars/1.3.0/runtime',
            'zepto': '../../c/js/base/zepto.js',
            'cookie': '../../c/js/base/zepto.cookie.js',
            'callbacks': '../../c/js/base/zepto.callbacks.js',
            'deferred': '../../c/js/base/zepto.deferred.js',
            'touch': '../../c/js/base/zepto.touch.js',
            'fx':'../../c/js/base/zepto.jx.js',
            'sm':'../../c/js/base/sm.js',
            'dragloader': '../../c/js/base/dragloader.js',
            'sm-extend': '../../c/js/base/sm-extend.js',
            'sm-city-picker': '../../c/js/base/sm-city-picker.js',
            'sm-router': '../../c/js/base/sm.router.js',
            'exif': '../../c/js/exif.js',
            'validator': '../../c/js/mvalidate.js',
            'tools': '../../c/js/tools.js',
            'swiper':'../../c/js/base/swiper.js',
            'fastclick': '../../c/js/fastclick.js',
            'area': '../../c/js/area.js',
            'moment': '../../c/js/moment.js',
            'common': '../../p/common/index.js',
            'iscroll':'../../c/js/iscroll-infinite.js',
            'registerHelper': '../../c/js/registerHelper',
            'bootstrap': '../../c/js/bootstrap',
        },
        paths: {},
        comboSyntax: ['??', ','],
        comboMaxLength: 1000,
        preload: ['$'],
        charset: 'utf-8',
        timeout: 1000,
        debug: true
    };

    // 仅限浏览器时使用
    if (root.seajs) {
        if (typeof define === 'function') {
            define(function(require, exports, module) {
                module.exports = config; // avoid warning on console
            });
        }
        root.seajs.config(config);
    }

    return config;
}).call(this);
