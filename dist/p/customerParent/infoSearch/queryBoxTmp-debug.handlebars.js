define("xg/eid-company-zy/1.0.4/p/customerParent/infoSearch/queryBoxTmp-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, helper, functionType = "function",
            escapeExpression = this.escapeExpression;
        buffer += '<div class="queryBox text" id="statusSelect">\r\n    <label class="labelText w70 pull-left text-r">状态：</label>\r\n    <input class="btn radius btn-link statu-all" type="button"id="statu" value="全部" data-status=""data-a="">\r\n    <input class="btn btn-link radius asd"  type="button" value="未查看"id="statu1" data-statu="4" data-a="1"><span>(';
        if (helper = helpers.notChecked) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.notChecked;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius" type="button" value="未处理"id="statu2" data-statu="0" data-a="2"><span>(';
        if (helper = helpers.businessUntreatedCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.businessUntreatedCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius statu-unpass" type="button"id="statu3" value="未通过" data-statu="2"data-a="3"><span>(';
        if (helper = helpers.businessNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.businessNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius statu-pass" type="button"id="statu4" data-a="4"value="已通过" data-statu="1"><span>(';
        if (helper = helpers.businessPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.businessPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n</div>\r\n<div class="queryBox text" id="statusSelect1">\r\n    <label class="labelText w70 pull-left text-r">风险等级：</label>\r\n    <input class="btn radius  btn-link color-all" type="button"id="levebtn" data-b=""value="全部" data-level="">\r\n    <input class="btn  btn-link radius color-red" type="button"id="levebtn1" data-b="1" value="红" data-level="3">\r\n    <input class="btn btn-link radius color-yellow" type="button"id="levebtn2" data-b="2" value="黄" data-level="2">\r\n    <input class="btn btn-link radius color-green" type="button"id="levebtn3" data-b="3" value="绿" data-level="1">\r\n</div>\r\n<div class="queryBox text" id="statusSelect2">\r\n    <label class="labelText w70 pull-left text-r">身份信息：</label>\r\n    <input class="btn radius primary" type="button" id="idcard" value="全部" data-c=""data-idval="">\r\n    <input class="btn btn-link radius" type="button" id="idcard1"value="验证通过" data-c="1"data-idval="1"><span>(';
        if (helper = helpers.identityPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.identityPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    \r\n    <input class="btn btn-link radius" type="button" id="idcard2" value="验证失败" data-c="2"data-idval="-1"><span>(';
        if (helper = helpers.identityNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.identityNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius" type="button"id="idcard3" value="身份证过期" data-c="3"data-idval="3"><span>(';
        if (helper = helpers.identityExpiredCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.identityExpiredCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n</div>\r\n<div class="queryBox text" id="statusSelect3">\r\n    <label class="labelText w70 pull-left text-r">人脸对比：</label>\r\n    <input class="btn radius primary" type="button" id="face"value="全部" data-d=""data-face="">\r\n    <input class="btn btn-link radius" type="button"id="face1" value="识别通过"data-d="1" data-face="10"><span>(';
        if (helper = helpers.faceVerificationPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceVerificationPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius" type="button" id="face2"value="人工通过" data-d="2"data-face="20"><span>(';
        if (helper = helpers.faceVerificationLabourPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceVerificationLabourPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius" type="button"id="face3" value="未通过" data-d="3"data-face="-10"><span>(';
        if (helper = helpers.faceVerificationNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceVerificationNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius" type="button"id="face4" value="人工未通过"data-d="4" data-face="-20"><span>(';
        if (helper = helpers.faceVerificationLabourNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.faceVerificationLabourNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n\r\n</div>\r\n<div class="queryBox text" id="statusSelect5">\r\n    <label class="labelText w70 pull-left text-r">查询来源：</label>\r\n    <input class="btn radius primary" type="button" value="全部" data-e=""data-face="">\r\n    <input class="btn btn-link radius" type="button" value="人证通" data-e="1"data-source="1">\r\n    <input class="btn btn-link radius" type="button" value="接口"data-e="2" data-source="3">\r\n    <input class="btn btn-link radius" type="button" value="App"data-e="3" data-source="2">\r\n\r\n</div>\r\n<div class="queryBox text" id="statusSelect4">\r\n    <label class="labelText w70 pull-left text-r">手机校验：</label>\r\n    <input class="btn radius btn-link mobile-all" type="button"id="check" value="全部" data-f=""data-status="">\r\n    <input class="btn btn-link radius" type="button" id="check1"value="未校验"data-f="1" data-status="0"><span>(';
        if (helper = helpers.mobileCheckUntreatedCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobileCheckUntreatedCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius" type="button" id="check2"value="校验失败"data-f="2" data-status="1"><span>(';
        if (helper = helpers.mobileCheckNotPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobileCheckNotPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ')</span>\r\n    <input class="btn btn-link radius mobile-succ" type="button"id="check3"data-f="3" value="校验成功" data-status="2"><span>(';
        if (helper = helpers.mobileCheckPassCount) {
            stack1 = helper.call(depth0, {
                hash: {},
                data: data
            })
        } else {
            helper = depth0 && depth0.mobileCheckPassCount;
            stack1 = typeof helper === functionType ? helper.call(depth0, {
                hash: {},
                data: data
            }) : helper
        }
        buffer += escapeExpression(stack1) + ")</span>\r\n</div>\r\n\r\n\r\n\r\n\r\n";
        return buffer
    })
});