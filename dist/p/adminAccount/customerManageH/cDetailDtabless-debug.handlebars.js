define("xg/eid-company-zy/1.0.4/p/adminAccount/customerManageH/cDetailDtabless-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            helper, options, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression;
        buffer += '<div style="float:right;margin-bottom:20px;">已累计充值' + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.rechargeTotalAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.rechargeTotalAmount, options))) + "元，赠送" + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.giftTotalAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.giftTotalAmount, options))) + "元，共计" + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
            hash: {},
            data: data
        }, helper ? helper.call(depth0, depth0 && depth0.totalAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.totalAmount, options))) + "元</div>";
        return buffer
    })
});