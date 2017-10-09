define("xg/eid-company-zy/1.0.4/c/js/dashboard-debug", ["xg/eid-company-zy/1.0.4/c/js/base-debug.core", "security-debug"], function(require, exports, module) {
    var core = require("xg/eid-company-zy/1.0.4/c/js/base-debug.core")
});
dataListCollection = [];
define("xg/eid-company-zy/1.0.4/c/js/base-debug.core", ["security-debug"], function(require, exports, module) {
    var security = require("security-debug");
    module.exports = {
        showTable: function(config, callFun) {
            var pageSize = config.pageSize ? config.pageSize : 10;
            var container = config.container;
            var dataListUrl = config.dataListUrl;
            var queryObject = config.queryObject;
            var page = config.pageIndex = config.pageIndex ? config.pageIndex : 1;
            var params = config.params;
            if (config.cache == false) {
                dataListCollection[dataListUrl] = undefined
            }
            $(".pagination li").attr("disabled", true);
            var bufferSize = config.cache === false ? pageSize : pageSize * 5,
                page;
            module.exports.getPageDataList(dataListUrl, queryObject, pageSize, bufferSize, page, function(pageCount, dataList) {
                if (!(container instanceof jQuery)) {
                    container = $(container)
                }
                container.children(".table[data-sign=" + module.exports.md5(dataListUrl) + "]").remove();
                container.children(".centterw").remove();
                var table = $('<table class="table table-border table-bordered table-hover table-bg"></table>').attr("data-sign", module.exports.md5(dataListUrl));
                container.append(table);
                var thead = $("<thead><tr></tr></thead>");
                table.append(thead);
                var tbody = $("<tbody></tbody>");
                table.append(tbody);
                var tr = thead.children();
                for (var i = 0; i < params.length; i++) {
                    var noaccess = false;
                    if (params[i].authorityConfig) {
                        for (var operator in params[i].authorityConfig) {
                            if (!security.matchers[operator](params[i].authorityConfig[operator])) {
                                noaccess = true
                            }
                        }
                    }
                    if (!noaccess && params[i].name !== undefined) {
                        var th = $("<th style='text-align:center;'>" + params[i].name + "</th>");
                        th.css({
                            width: params[i].width
                        });
                        if (params[i].type === "checkbox") {
                            th.append($('<input type="checkbox" data-col="' + i + '"/>').on("click", function() {
                                var that = this;
                                $(this).parents("table").find("td input[data-col=" + $(this).data("col") + "]").each(function() {
                                    this.checked = that.checked
                                })
                            }))
                        }
                        tr.append(th)
                    }
                }
                if (dataList.length == 0) {
                    tr = $("<tr><td nodata style='text-align:center;' colspan=\"" + params.length + '">没有数据需要显示</td></tr>');
                    tbody.append(tr)
                } else {
                    for (var i = 0; i < dataList.length && i < pageSize; i++) {
                        tr = $('<tr data-id-flag="' + config.key(dataList, i) + '"></tr>');
                        tr.data("item", dataList[i]);
                        var trs = tbody.children("[data-id-flag='" + config.key(dataList, i) + "']");
                        for (var j = 0; j < params.length; j++) {
                            var noaccess = false;
                            if (params[j].authorityConfig) {
                                for (var operator in params[j].authorityConfig) {
                                    if (!security.matchers[operator](params[j].authorityConfig[operator])) {
                                        noaccess = true;
                                        break
                                    }
                                }
                            }
                            if (!noaccess) {
                                if (trs.length > 0) {
                                    if (trs.children().eq(j).text() != params[j].value(dataList, i)) {
                                        trs.children().eq(j).text(trs.children().eq(j).text() + ", " + params[j].value(dataList, i))
                                    }
                                } else {
                                    var td = $("<td></td>");
                                    td.addClass(params[j]["class"]);
                                    tr.append(td);
                                    if (params[j].type === "checkbox") {
                                        td.append('<input type="checkbox" data-row="' + i + '" data-col="' + j + '"/>');
                                        td.css({
                                            "text-align": "center"
                                        });
                                        if (params[j].value && params[j].value(dataList, i)) {
                                            td.find("input[type=checkbox]")[0].checked = true
                                        }
                                    } else {
                                        var context = params[j].value(dataList, i);
                                        if (context != undefined) {
                                            if (context instanceof Object) {
                                                td.append(context)
                                            } else {
                                                td.html(context)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        tbody.append(tr)
                    }
                }
                module.exports.addPagination(module.exports.showTable, config, pageCount, callFun);
                if (callFun) {
                    callFun(table)
                }
                $(".pagination li").attr("disabled", false);
                table.security()
            })
        },
        getPageDataList: function(url, queryObject, pageSize, bufferSize, page, callback) {
            var pageDataList = dataListCollection[url];
            if (pageDataList == undefined) {
                pageDataList = [];
                dataListCollection[url] = pageDataList
            }
            var dataIndex = -1;
            for (var i = 0; i < pageDataList.length; i++) {
                if (pageDataList[i].startPage <= page && page <= pageDataList[i].endPage) {
                    dataIndex = i
                }
            }
            if (dataIndex == -1) {
                var pageCurrent = page * pageSize % bufferSize == 0 ? page * pageSize / bufferSize : parseInt(page * pageSize / bufferSize) + 1;
                this.query(url + (url.indexOf("?") > 0 ? "&" : "?") + "pageIndex=" + pageCurrent + "&pageSize=" + bufferSize, queryObject, function(dataCount, oriDataList) {
                    var pageCount = dataCount % pageSize == 0 ? dataCount / pageSize : parseInt(dataCount / pageSize) + 1;
                    var item = {
                        dataList: oriDataList,
                        startPage: (pageCurrent - 1) * (bufferSize / pageSize) + 1,
                        endPage: (pageCurrent - 1) * (bufferSize / pageSize) + (oriDataList.length % pageSize == 0 ? oriDataList.length / pageSize : parseInt(oriDataList.length / pageSize) + 1),
                        pageCount: pageCount
                    };
                    dataIndex = insertPageDataList(item);
                    callback(pageCount, getResultData(dataIndex))
                })
            } else {
                callback(pageDataList[dataIndex].pageCount, getResultData(dataIndex))
            }

            function getResultData(dataIndex) {
                var dataList = [];
                var bufferDataList = pageDataList[dataIndex];
                while (dataList.length < pageSize) {
                    var data = bufferDataList.dataList[(page - 1) % (bufferSize / pageSize) * pageSize + dataList.length];
                    if (data) {
                        dataList[dataList.length] = data
                    } else {
                        return dataList
                    }
                }
                return dataList
            }

            function insertPageDataList(item) {
                for (var i = pageDataList.length - 1; i >= 0; i--) {
                    if (pageDataList[i].endPage < item.startPage) {
                        for (var k = pageDataList.length - 1; k >= i + 1; k--) {
                            pageDataList[k + 1] = pageDataList[k]
                        }
                        pageDataList[i + 1] = item;
                        return i + 1
                    }
                }
                pageDataList[pageDataList.length] = item;
                return pageDataList.length - 1
            }
        },
        addPagination: function(viewFun, config, pageCount, callFun) {
            var container = config.container;
            if (container instanceof jQuery) {} else {
                container = $(container)
            }
            if (pageCount > 1) {
                var centterw = $('<div class="centterw"><div class="pagination alternate"><ul></ul></div></div>');
                var pagination = centterw.children().children();
                if (config.pageIndex == 1) {
                    pagination.append($('<li class="disabled">上一页</li>'))
                } else {
                    var li = $("<li>上一页</li>");
                    li.click(function() {
                        if ($(this).attr("disabled")) return;
                        config.pageIndex -= 1;
                        viewFun(config, callFun)
                    });
                    pagination.append(li)
                }
                var startPage = 0;
                var endPage = 0;
                if (pageCount <= 9 || config.pageIndex < 5) {
                    startPage = 1;
                    endPage = pageCount > 9 ? 9 : pageCount
                } else if (config.pageIndex > pageCount - 5) {
                    startPage = pageCount - 8;
                    endPage = pageCount
                } else {
                    startPage = config.pageIndex - 4;
                    endPage = config.pageIndex + 4
                }
                for (var i = startPage; i <= endPage; i++) {
                    if (i == config.pageIndex) {
                        pagination.append($('<li class="active">' + i + "</li>"))
                    } else {
                        var li = $("<li>" + i + "</li>");
                        li.click(function() {
                            if ($(this).attr("disabled")) return;
                            config.pageIndex = parseInt($(this).text());
                            viewFun(config, callFun)
                        });
                        pagination.append(li)
                    }
                }
                if (config.pageIndex == pageCount) {
                    pagination.append($('<li class="disabled">下一页</li>'))
                } else {
                    var li = $("<li>下一页</li>");
                    li.click(function() {
                        if ($(this).attr("disabled")) return;
                        config.pageIndex += 1;
                        viewFun(config, callFun)
                    });
                    pagination.append(li)
                }
                pagination.append($("<p>当前<b>" + config.pageIndex + "</b>/" + pageCount + "页</p>"));
                container.append(centterw)
            }
        },
        query: function(url, queryObject, callBack, loader) {
            var loadIndex = layer.load(0, {
                shade: false
            });
            for (var param in queryObject) {
                if (queryObject[param] === "") {
                    delete queryObject[param]
                }
            }
            ajax = $.ajax({
                url: encodeURI(url),
                type: "post",
                async: true,
                data: queryObject,
                success: function(json) {
                    layer.close(loadIndex);
                    var data;
                    if (json instanceof Object) {
                        data = json
                    } else {
                        data = eval("(" + json + ")")
                    }
                    if (data.code == 0) {
                        if (data.list != undefined) {
                            callBack(data.count, data.list)
                        } else {
                            callBack(data)
                        }
                    } else {
                        layer.msg(data.error ? data.error : "请求失败！", {
                            icon: 2,
                            time: 3500
                        })
                    }
                },
                error: function(err) {
                    layer.close(loadIndex);
                    layer.alert("请求被服务器拒绝，请重新登陆后重试。<br/>" + err.statusText + "(" + err.status + ")")
                }
            })
        },
        ajaxSubmit: function(config) {
            var _successFunc = config.success;
            var _errorFunc = config.error;
            var core = this;
            config.success = function(json, b, c) {
                var result;
                if (json instanceof Object) {
                    result = json
                } else {
                    result = eval("(" + json + ")")
                }
                var doContinue = _successFunc ? _successFunc(result, b, c) : true;
                if (!doContinue && doContinue != undefined) return;
                if (result.code == 0) {
                    var isLayerFrame = parent ? parent.layer.getFrameIndex(window.name) : false;
                    var location = isLayerFrame ? parent.location : window.location;
                    layer.msg("操作成功完成！" + (result.msg ? result.msg : ""), {
                        icon: 1,
                        time: 2500
                    }, function() {
                        if (result.redirect) {
                            location.href = result.redirect
                        } else if (core.getQueryString("goto")) {
                            location.href = decodeURIComponent(core.getQueryString("goto"))
                        } else {
                            location.reload()
                        }
                    })
                } else {
                    layer.msg(result.error ? result.error : "请求失败！", {
                        icon: 2,
                        time: 3500
                    })
                }
            };
            config.error = function(err) {
                _errorFunc && _errorFunc(err);
                layer.alert("请求被服务器拒绝，请重新登陆后重试。<br/>" + err.statusText + "(" + err.status + ")")
            };
            $.ajax(config)
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null
        },
        fullAttribute: function(parent, data) {
            parent.find("*[name]").each(function() {
                if ($(this).is("select")) {
                    var val = data[$(this).attr("name")];
                    $(this).val(val && val.split ? val.split(",") : val)
                } else {
                    data[$(this).attr("name")] !== undefined && $(this).val(data[$(this).attr("name")])
                }
            })
        },
        clone: function(jsonObj) {
            var buf;
            if (jsonObj instanceof Array) {
                buf = [];
                var i = jsonObj.length;
                while (i--) {
                    buf[i] = arguments.callee(jsonObj[i])
                }
                return buf
            } else if (typeof jsonObj == "function") {
                return jsonObj
            } else if (jsonObj instanceof Object) {
                buf = {};
                for (var k in jsonObj) {
                    buf[k] = arguments.callee(jsonObj[k])
                }
                return buf
            } else {
                return jsonObj
            }
        },
        getStrLength: function(str) {
            var realLength = 0,
                len = str.length,
                charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2
            }
            return realLength
        },
        ellipsis: function(str, len) {
            var resultStr = "";
            var realLength = 0,
                charCode = -1,
                maxRealLength = (len - 4) / 2;
            var leftIndex = 0;
            var rightIndex = str.length - 1;
            for (; leftIndex < str.length && realLength < maxRealLength; leftIndex++) {
                charCode = str.charCodeAt(leftIndex);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
                resultStr += String.fromCharCode(charCode)
            }
            realLength = 0;
            var rightResultStr = "";
            for (; rightIndex >= 0 && realLength < maxRealLength; rightIndex--) {
                if (rightIndex <= leftIndex) {
                    return str
                }
                charCode = str.charCodeAt(rightIndex);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
                rightResultStr = String.fromCharCode(charCode) + rightResultStr
            }
            return resultStr + "..." + rightResultStr
        },
        ellipsisTips: function(config) {
            var type = config.type;
            var maxLength = config.maxLength;
            var text = config.text;
            var ellipsisStr = "";
            switch (type) {
                case "left":
                    var realLength = 0;
                    var rightResultStr = "";
                    for (var rightIndex = text.length - 1; rightIndex >= 0 && realLength < maxLength; rightIndex--) {
                        var charCode = text.charCodeAt(rightIndex);
                        if (charCode >= 0 && charCode <= 128) realLength += 1;
                        else realLength += 2;
                        rightResultStr = String.fromCharCode(charCode) + rightResultStr
                    }
                    ellipsisStr = "..." + rightResultStr;
                    break;
                case "center":
                    ellipsisStr = module.exports.ellipsis(text, maxLength);
                    break;
                case "right":
                    var realLength = 0;
                    for (var leftIndex = 0; leftIndex < text.length && realLength < maxLength; leftIndex++) {
                        charCode = text.charCodeAt(leftIndex);
                        if (charCode >= 0 && charCode <= 128) realLength += 1;
                        else realLength += 2;
                        ellipsisStr += String.fromCharCode(charCode)
                    }
                    ellipsisStr += "...";
                    break
            }
            return $("<span>" + ellipsisStr + "</span>").data("original", text).hover(function() {
                $(this).data("layer-id", layer.tips($(this).data("original"), this, {
                    tips: [1, "#3595CC"],
                    time: 6e4
                }))
            }, function() {
                layer.close($(this).data("layer-id"))
            })
        },
        md5: function(string) {
            function RotateLeft(lValue, iShiftBits) {
                return lValue << iShiftBits | lValue >>> 32 - iShiftBits
            }

            function AddUnsigned(lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = lX & 2147483648;
                lY8 = lY & 2147483648;
                lX4 = lX & 1073741824;
                lY4 = lY & 1073741824;
                lResult = (lX & 1073741823) + (lY & 1073741823);
                if (lX4 & lY4) {
                    return lResult ^ 2147483648 ^ lX8 ^ lY8
                }
                if (lX4 | lY4) {
                    if (lResult & 1073741824) {
                        return lResult ^ 3221225472 ^ lX8 ^ lY8
                    } else {
                        return lResult ^ 1073741824 ^ lX8 ^ lY8
                    }
                } else {
                    return lResult ^ lX8 ^ lY8
                }
            }

            function F(x, y, z) {
                return x & y | ~x & z
            }

            function G(x, y, z) {
                return x & z | y & ~z
            }

            function H(x, y, z) {
                return x ^ y ^ z
            }

            function I(x, y, z) {
                return y ^ (x | ~z)
            }

            function FF(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b)
            }

            function GG(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b)
            }

            function HH(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b)
            }

            function II(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b)
            }

            function ConvertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - lByteCount % 4) / 4;
                    lBytePosition = lByteCount % 4 * 8;
                    lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
                    lByteCount++
                }
                lWordCount = (lByteCount - lByteCount % 4) / 4;
                lBytePosition = lByteCount % 4 * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray
            }

            function WordToHex(lValue) {
                var WordToHexValue = "",
                    WordToHexValue_temp = "",
                    lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = lValue >>> lCount * 8 & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2)
                }
                return WordToHexValue
            }

            function Utf8Encode(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c)
                    } else if (c > 127 && c < 2048) {
                        utftext += String.fromCharCode(c >> 6 | 192);
                        utftext += String.fromCharCode(c & 63 | 128)
                    } else {
                        utftext += String.fromCharCode(c >> 12 | 224);
                        utftext += String.fromCharCode(c >> 6 & 63 | 128);
                        utftext += String.fromCharCode(c & 63 | 128)
                    }
                }
                return utftext
            }
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22;
            var S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20;
            var S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23;
            var S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;
            string = Utf8Encode(string);
            x = ConvertToWordArray(string);
            a = 1732584193;
            b = 4023233417;
            c = 2562383102;
            d = 271733878;
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
                d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
                c = FF(c, d, a, b, x[k + 2], S13, 606105819);
                b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
                a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
                d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
                c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
                b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
                a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
                d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
                c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
                b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
                a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
                d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
                c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
                b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
                a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
                d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
                c = GG(c, d, a, b, x[k + 11], S23, 643717713);
                b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
                a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
                d = GG(d, a, b, c, x[k + 10], S22, 38016083);
                c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
                b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
                a = GG(a, b, c, d, x[k + 9], S21, 568446438);
                d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
                c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
                b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
                a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
                d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
                c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
                b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
                a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
                d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
                c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
                b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
                a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
                d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
                c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
                b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
                a = HH(a, b, c, d, x[k + 13], S31, 681279174);
                d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
                c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
                b = HH(b, c, d, a, x[k + 6], S34, 76029189);
                a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
                d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
                c = HH(c, d, a, b, x[k + 15], S33, 530742520);
                b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
                a = II(a, b, c, d, x[k + 0], S41, 4096336452);
                d = II(d, a, b, c, x[k + 7], S42, 1126891415);
                c = II(c, d, a, b, x[k + 14], S43, 2878612391);
                b = II(b, c, d, a, x[k + 5], S44, 4237533241);
                a = II(a, b, c, d, x[k + 12], S41, 1700485571);
                d = II(d, a, b, c, x[k + 3], S42, 2399980690);
                c = II(c, d, a, b, x[k + 10], S43, 4293915773);
                b = II(b, c, d, a, x[k + 1], S44, 2240044497);
                a = II(a, b, c, d, x[k + 8], S41, 1873313359);
                d = II(d, a, b, c, x[k + 15], S42, 4264355552);
                c = II(c, d, a, b, x[k + 6], S43, 2734768916);
                b = II(b, c, d, a, x[k + 13], S44, 1309151649);
                a = II(a, b, c, d, x[k + 4], S41, 4149444226);
                d = II(d, a, b, c, x[k + 11], S42, 3174756917);
                c = II(c, d, a, b, x[k + 2], S43, 718787259);
                b = II(b, c, d, a, x[k + 9], S44, 3951481745);
                a = AddUnsigned(a, AA);
                b = AddUnsigned(b, BB);
                c = AddUnsigned(c, CC);
                d = AddUnsigned(d, DD)
            }
            var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
            return temp.toLowerCase()
        },
        commafy: function(num) {
            if ((num + "").trim() == "") {
                return ""
            }
            if (isNaN(num)) {
                return ""
            }
            num = num + "";
            if (/^.*\..*$/.test(num)) {
                varpointIndex = num.lastIndexOf(".");
                varintPart = num.substring(0, pointIndex);
                varpointPart = num.substring(pointIndex + 1, num.length);
                intPart = intPart + "";
                var re = /(-?\d+)(\d{3})/;
                while (re.test(intPart)) {
                    intPart = intPart.replace(re, "$1,$2")
                }
                num = intPart + "." + pointPart
            } else {
                num = num + "";
                var re = /(-?\d+)(\d{3})/;
                while (re.test(num)) {
                    num = num.replace(re, "$1,$2")
                }
            }
            return num
        },
        delcommafy: function(num) {
            if ((num + "").Trim() == "") {
                return ""
            }
            num = num.replace(/,/gi, "");
            return num
        }
    };
    $.fn.checkedItems = function() {
        var items = [];
        $(this).find("tbody").find("input[type=checkbox]:checked").each(function() {
            items.push($(this).parents("tr:first").data("item"))
        });
        return items
    }
});
define("xg/eid-company-zy/1.0.4/c/js/base-debug.core", ["security-debug"], function(require, exports, module) {
    module.exports = {
        setAccessList: function(array) {
            module.exports.accessList = array;
            $("body").security()
        },
        matchers: {
            or: function(authorities) {
                if (module.exports.accessList) {
                    for (var i = 0; i < authorities.length; i++) {
                        for (var j = 0; j < module.exports.accessList.length; j++) {
                            var access = module.exports.accessList[j];
                            for (var z = 0; z < authorities[i].length && z < access.length; z++) {
                                if (authorities[i].charAt(z) == "_") {
                                    access = access.substring(0, z) + "_" + access.substring(z + 1)
                                } else if (access.charAt(z) == "_") {
                                    authorities[i] = authorities[i].substring(0, z) + "_" + authorities[i].substring(z + 1)
                                }
                            }
                            if (authorities[i] === access) {
                                return true
                            }
                        }
                    }
                }
                return false
            }
        }
    };
    $.fn.security = function() {
        $(this).find("*[data-authority]").each(function() {
            var authority = $(this).data("authority");
            var hasAuth = module.exports.matchers["or"](authority.split(","), module.exports.accessList);
            hasAuth ? $(this).show() : $(this).remove()
        })
    }
});
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(s, i) {
        return args[i]
    })
};
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
};
String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/g, "")
};
String.prototype.rtrim = function() {
    return this.replace(/(\s*$)/g, "")
};