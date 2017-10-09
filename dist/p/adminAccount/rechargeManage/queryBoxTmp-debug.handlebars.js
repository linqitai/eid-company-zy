define("xg/eid-company-zy/1.0.4/p/adminAccount/rechargeManage/queryBoxTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helperMissing = helpers.helperMissing,
            escapeExpression = this.escapeExpression,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                helper, options;
            buffer += '\r\n    <div class="queryBox text" id="statusSelect" style="margin-bottom:50px;">\r\n        已累计充值' + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.rechargeTotalAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.rechargeTotalAmount, options))) + "元，赠送" + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.giftTotalAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.giftTotalAmount, options))) + "元，共计" + escapeExpression((helper = helpers.formatMoney || depth0 && depth0.formatMoney, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.totalAmount, options) : helperMissing.call(depth0, "formatMoney", depth0 && depth0.totalAmount, options))) + "元\r\n    </div>\r\n    ";
            return buffer
        }

        function program3(depth0, data) {
            return " "
        }
        buffer += ' \r\n\r\n<div style="float:right;width:350px;">\r\n    <div style="height:20px;width:350px;">\r\n        <form id="dataCount_searchForm">\r\n            <div class="col-xs-8">\r\n                <label class="form-label col-xs-4 col-sm-4">客户名称：</label>\r\n                <div class="formControls col-xs-8 col-sm-8">\r\n                    <input type="text" class="input-text" placeholder="请输入客户名称" name="companyName" id="searchText">\r\n                </div>\r\n            </div>\r\n            <div class="btn btn-default col-xs-2" id="search_button" style="margin-right:50px;">搜索</div>\r\n            \r\n        </form>\r\n    </div>\r\n\r\n    <br> ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n</div>";
        return buffer
    })
});