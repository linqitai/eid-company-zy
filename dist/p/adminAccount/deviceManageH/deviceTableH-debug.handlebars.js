define("xg/eid-company-zy/1.0.4/p/adminAccount/deviceManageH/deviceTableH-debug.handlebars", ["alinw/handlebars/1.3.0/runtime-debug"], function(require, exports, module) {
    var Handlebars = require("alinw/handlebars/1.3.0/runtime-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [4, ">= 1.0.0"];
        helpers = this.merge(helpers, Handlebars.helpers);
        data = data || {};
        var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            helperMissing = helpers.helperMissing,
            self = this;

        function program1(depth0, data) {
            var buffer = "",
                stack1;
            buffer += "\r\n";
            stack1 = helpers.each.call(depth0, depth0, {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n";
            return buffer
        }

        function program2(depth0, data) {
            var buffer = "",
                stack1, helper, options;
            buffer += "\r\n  <tr>\r\n    <td>";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.parentName, {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            stack1 = helpers["if"].call(depth0, depth0 && depth0.parentPhone, {
                hash: {},
                inverse: self.noop,
                fn: self.program(5, program5, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "</td>\r\n    <td>";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.childName, {
                hash: {},
                inverse: self.noop,
                fn: self.program(7, program7, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            stack1 = helpers["if"].call(depth0, depth0 && depth0.childPhone, {
                hash: {},
                inverse: self.noop,
                fn: self.program(9, program9, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "</td>\r\n    <td>";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.deviceMac, {
                hash: {},
                inverse: self.noop,
                fn: self.program(11, program11, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "</td>\r\n    <td>";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.deviceIp, {
                hash: {},
                inverse: self.noop,
                fn: self.program(13, program13, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "</td>\r\n    ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.program(17, program17, data),
                fn: self.program(15, program15, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.forbidden, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.forbidden, "==", 0, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n    <td>";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.lastUseTime, {
                hash: {},
                inverse: self.noop,
                fn: self.program(19, program19, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "</td>\r\n    <td>";
            stack1 = helpers["if"].call(depth0, depth0 && depth0.version, {
                hash: {},
                inverse: self.noop,
                fn: self.program(21, program21, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "</td>\r\n    <td>\r\n        ";
            stack1 = (helper = helpers.ifCond || depth0 && depth0.ifCond, options = {
                hash: {},
                inverse: self.program(25, program25, data),
                fn: self.program(23, program23, data),
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.forbidden, "==", 0, options) : helperMissing.call(depth0, "ifCond", depth0 && depth0.forbidden, "==", 0, options));
            if (stack1 || stack1 === 0) {
                buffer += stack1
            }
            buffer += "\r\n    </td>\r\n  </tr>\r\n";
            return buffer
        }

        function program3(depth0, data) {
            var buffer = "",
                stack1, helper;
            if (helper = helpers.parentName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.parentName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "/";
            return buffer
        }

        function program5(depth0, data) {
            var stack1, helper;
            if (helper = helpers.parentPhone) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.parentPhone;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program7(depth0, data) {
            var buffer = "",
                stack1, helper;
            if (helper = helpers.childName) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.childName;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + "/";
            return buffer
        }

        function program9(depth0, data) {
            var stack1, helper;
            if (helper = helpers.childPhone) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.childPhone;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program11(depth0, data) {
            var stack1, helper;
            if (helper = helpers.deviceMac) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.deviceMac;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program13(depth0, data) {
            var stack1, helper;
            if (helper = helpers.deviceIp) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.deviceIp;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program15(depth0, data) {
            return '<td class="c-red">禁用</td>'
        }

        function program17(depth0, data) {
            return '<td class="c-green">启用</td>'
        }

        function program19(depth0, data) {
            var helper, options;
            return escapeExpression((helper = helpers.formatDate || depth0 && depth0.formatDate, options = {
                hash: {},
                data: data
            }, helper ? helper.call(depth0, depth0 && depth0.lastUseTime, options) : helperMissing.call(depth0, "formatDate", depth0 && depth0.lastUseTime, options)))
        }

        function program21(depth0, data) {
            var stack1, helper;
            if (helper = helpers.version) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.version;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            return escapeExpression(stack1)
        }

        function program23(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <a href="javascript:void(0)" class="enDisable" data-forbidden="1" data-deviceid="';
            if (helper = helpers.deviceId) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.deviceId;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '" data-devicemac="';
            if (helper = helpers.deviceMac) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.deviceMac;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '">启用</a>\r\n        ';
            return buffer
        }

        function program25(depth0, data) {
            var buffer = "",
                stack1, helper;
            buffer += '\r\n            <a href="javascript:void(0)" class="enDisable" data-forbidden="0" data-deviceid="';
            if (helper = helpers.deviceId) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.deviceId;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '" data-devicemac="';
            if (helper = helpers.deviceMac) {
                stack1 = helper.call(depth0, {
                    hash: {},
                    data: data
                })
            } else {
                helper = depth0 && depth0.deviceMac;
                stack1 = typeof helper === functionType ? helper.call(depth0, {
                    hash: {},
                    data: data
                }) : helper
            }
            buffer += escapeExpression(stack1) + '">禁用</a>\r\n        ';
            return buffer
        }

        function program27(depth0, data) {
            return '\r\n    <tr>\r\n        <td class="text-c" colspan="8">查无数据</td>\r\n    </tr>\r\n'
        }
        buffer += '<thead class="text-c">\r\n    <tr>\r\n        <th>客户名称/联系电话</th>\r\n        <th>门店名称/联系电话</th>\r\n        <th>设备MAC地址</th>\r\n        <th>IP地址</th>\r\n        <th>状态</th>\r\n        <th>最后调用时间</th>\r\n        <th>设备版本号</th>\r\n        <th>操作</th>\r\n    </tr>\r\n</thead>\r\n<tbody class="text-c">\r\n';
        stack1 = helpers["if"].call(depth0, depth0, {
            hash: {},
            inverse: self.program(27, program27, data),
            fn: self.program(1, program1, data),
            data: data
        });
        if (stack1 || stack1 === 0) {
            buffer += stack1
        }
        buffer += " \r\n</tbody>";
        return buffer
    })
});