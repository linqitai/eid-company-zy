/*!
 * jQuery Validation Plugin v1.13.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
define(function(require, exports, module){
	var $=require("$");
	require("./jquery.validate");
	$.format = function (source, params) {
	    if (arguments.length == 1)
	        return function () {
	            var args = $.makeArray(arguments);
	            args.unshift(source);
	            return $.format.apply(this, args);
	        };
	    if (arguments.length > 2 && params.constructor != Array) {
	        params = $.makeArray(arguments).slice(1);
	    }
	    if (params.constructor != Array) {
	        params = [params];
	    }
	    $.each(params, function (i, n) {
	        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	    });
	    return source;
	};

	var cnmsg = {  
	    required: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>必填字段",   
	    remote: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请修正该字段",   
	    email: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确格式的电子邮件",   
	    url: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的网址",  
	    date: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的日期",   
	    dateISO: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的日期 (ISO).",  
	    number: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的数字",   
	    digits: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>只能输入整数",   
	    creditcard: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入合法的信用卡号",   
	    equalTo: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>两次输入的密码不一致",   
	    accept: "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入拥有合法后缀名的字符串",   
	    maxlength: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入少于{0}个字的内容"),   
	    minlength: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个长度最少是 {0} 的字符串"),   
	    rangelength: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个长度介于 {0} 和 {1} 之间的字符串"),   
	    range: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个介于 {0} 和 {1} 之间的值"),   
	    max: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个最大为 {0} 的值"),  
	    min: jQuery.format("<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入一个最小为 {0} 的值")
	};

	jQuery.extend(jQuery.validator.messages, cnmsg);

});