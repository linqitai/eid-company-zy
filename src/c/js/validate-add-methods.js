/*!
 * jQuery Validation Plugin v1.13.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
define(function(require, exports, module){
	require("./jquery.validate");
	var $=require("jquery");

	$.validator.addMethod("mobile", function(value, element) {
		 var mobile = value.replace(/[\-\/]/g, "");
	    return this.optional(element) || /^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile);
	}, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的手机号");

	$.validator.addMethod("idcard", function(value, element) {
	    return this.optional(element) || /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
	}, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的身份证号");

	$.validator.addMethod("email", function(value, element) {
	    return this.optional(element) || /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/.test(value);
	}, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的邮箱地址");

	$.validator.addMethod("registerpsd", function(value, element) {
	    return this.optional(element) || /(?!^[0-9]+$)(?!^[a-z]+$)(?!^[^A-z0-9]+$)^.{6,15}$/.test(value);
	}, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>密码格式有问题");  

	$.validator.addMethod("coord", function(value, element) {       
        return this.optional(element) || /\d{3}\.\d+\,\d{2}\.\d+/.test(value);       
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'></i>请输入正确的经纬度");  

    $.validator.addMethod("twoPoint", function(value, element) {    
        return !value || /^\d+\.?\d{0,2}$/.test(value);    
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'></i>最多保留两位小数");

	$.validator.addMethod("realyname", function(value, element) {
		return this.optional(element) || /^[\u4e00-\u9fa5]{2,6}$/.test(value);
	}, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的姓名");

    $.validator.addMethod("bankcard", function(value, element) {
        return this.optional(element) || /^[0-9]{16,19}$/.test(value);
    }, "<i class='kuma-tiptext-icon kuma-icon' title='出错'>&#42;</i>请输入正确的银行卡号");
});