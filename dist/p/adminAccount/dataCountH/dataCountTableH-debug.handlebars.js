define("xg/eid-company-zy/1.0.4/p/adminAccount/dataCountH/dataCountTableH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this,
            helperMissing = helpers.helperMissing;

        function program1(depth0, data) {
            var buffer = "",
                stack1;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>总计</td>\r\n            <td>' + escapeExpression((stack1 = (stack1 = (stack1 = depth0 && depth0.obj, stack1 == null || stack1 === false ? stack1 : stack1.queryTotal), stack1 == null || stack1 === false ? stack1 : stack1.start), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "至" + escapeExpression((stack1 = (stack1 = (stack1 = depth0 && depth0.obj, stack1 == null || stack1 === false ? stack1 : stack1.queryTotal), stack1 == null || stack1 === false ? stack1 : stack1.end), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</td>\r\n            <td>" + escapeExpression((stack1 = (stack1 = (stack1 = depth0 && depth0.obj, stack1 == null || stack1 === false ? stack1 : stack1.queryTotal), stack1 == null || stack1 === false ? stack1 : stack1.identityTime), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</td>\r\n            <td>" + escapeExpression((stack1 = (stack1 = (stack1 = depth0 && depth0.obj, stack1 == null || stack1 === false ? stack1 : stack1.queryTotal), stack1 == null || stack1 === false ? stack1 : stack1.reportTime), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "</td>\r\n            <td>\r\n                " + escapeExpression((stack1 = (stack1 = (stack1 = depth0 && depth0.obj, stack1 == null || stack1 === false ? stack1 : stack1.queryTotal), stack1 == null || stack1 === false ? stack1 : stack1.amount), typeof stack1 === functionType ? stack1.apply(depth0) : stack1)) + "\r\n            </td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program3(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8"></td>\r\n        </tr>\r\n        '
        }

        function program5(depth0, data) {
            var buffer = "",
                stack1;
            buffer += " ";
            stack1 = helpers.each.call(depth0, depth0 && depth0.list, {
                hash: {},
                inverse: self.noop,
                fn: self.program(6, program6, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            return buffer
        }

        function program6(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += '\r\n        <tr class="text-c">\r\n            <td>\r\n                ';
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(7, program7, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.haveSub, "==", false, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.haveSub, "==", false, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += " ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(9, program9, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.haveSub, "==", true, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.haveSub, "==", true, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += '\r\n\r\n            </td>\r\n            <td><a href="/company/count/timeDetail.htm?companyId=';
            if (helper = helpers.companyId) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.companyId;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&start=";
            if (helper = helpers.start) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.start;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&end=";
            if (helper = helpers.end) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.end;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&queryDateType=";
            if (helper = helpers.queryDateType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.queryDateType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&source=";
            if (helper = helpers.source) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.source;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '&queryBranch=true"\r\n                    class="detailInfor">';
            if (helper = helpers.start) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.start;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "至";
            if (helper = helpers.end) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.end;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</a></td>\r\n            <td class="sureinfo"><a class="detailBtn underLine" href="/company/inforService.htm?companyId=';
            if (helper = helpers.companyId) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.companyId;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&_startTime=";
            if (helper = helpers.start) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.start;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&_endTime=";
            if (helper = helpers.end) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.end;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&queryDateType=";
            if (helper = helpers.queryDateType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.queryDateType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '&queryBranch=1">';
            if (helper = helpers.identityTime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.identityTime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '</a></td>\r\n            <td><a class="detailBtn underLine" href="/company/inforService.htm?companyId=';
            if (helper = helpers.companyId) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.companyId;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&_startTime=";
            if (helper = helpers.start) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.start;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&_endTime=";
            if (helper = helpers.end) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.end;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "&queryDateType=";
            if (helper = helpers.queryDateType) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.queryDateType;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '&businessProgress=10&queryBranch=1">';
            if (helper = helpers.reportTime) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.reportTime;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</a></td>\r\n            <td>\r\n                ";
            if (helper = helpers.amount) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.amount;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "\r\n            </td>\r\n        </tr>\r\n        ";
            return buffer
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += " ";
            if (helper = helpers.companyName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.companyName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + " ";
            return buffer
        }

        function program9(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += ' <a href="/company/count/shopDetail.htm?companyId=';
            if (helper = helpers.companyId) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.companyId;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '"\r\n                    class="detailInfor">';
            if (helper = helpers.companyName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.companyName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "</a> ";
            return buffer
        }

        function program11(depth0, data) {
            return '\r\n        <tr>\r\n            <td class="text-c" colspan="8">查无数据</td>\r\n        </tr>\r\n        '
        }
        buffer += '\r\n<a style="float:right;margin:0 26px 20px 0;height:40px;width:100px;border:1px solid #ccc;text-align:center;line-height:40px;"\r\n    id="deleveval">excel导出</a>\r\n<table class="table table-border table-bordered table-hover">\r\n    <thead class="text-c">\r\n        <tr>\r\n            <th>店铺</th>\r\n            <th>查询时间</th>\r\n            <th>身份核验次数</th>\r\n            <th>EID报告次数</th>\r\n            <th>总金额</th>\r\n        </tr>\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(3, program3, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += '\r\n\r\n    </thead>\r\n    <tbody class="text-c">\r\n        ';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(11, program11, data),
            fn: self.program(5, program5, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += "\r\n    </tbody>\r\n</table>";
        return buffer
    })
});