/**
 * 基础模块
 * 2016/3/22 11:08:04 by wgyi
 */
dataListCollection = [];
define("core", function (require, exports, module) {
    var security = require('security');
    module.exports = {
        showTable: function (config, callFun) {
            var pageSize = config.pageSize ? config.pageSize : 10;
            var container = config.container;
            var dataListUrl = config.dataListUrl;
            var queryObject = config.queryObject;
            var page = config.pageIndex = config.pageIndex ? config.pageIndex : 1;
            var params = config.params;
            if (config.cache == false) {
                dataListCollection[dataListUrl] = undefined;
            }
            $('.pagination li').attr('disabled', true);
            var bufferSize = config.cache === false ? pageSize : pageSize * 5, page;
            module.exports.getPageDataList(dataListUrl, queryObject, pageSize, bufferSize, page, function (pageCount, dataList) {
                if (!(container instanceof jQuery)) {
                    container = $(container);
                }
                container.children('.table[data-sign=' + module.exports.md5(dataListUrl) + ']').remove();
                container.children('.centterw').remove();
                var table = $('<table class="table table-border table-bordered table-hover table-bg"></table>').attr('data-sign', module.exports.md5(dataListUrl));
                container.append(table);
                var thead = $('<thead><tr></tr></thead>');
                table.append(thead);
                var tbody = $('<tbody></tbody>');
                table.append(tbody);
                // 表头
                var tr = thead.children();
                for (var i = 0; i < params.length; i++) {
                    var noaccess = false;
                    if (params[i].authorityConfig) {
                        for (var operator in params[i].authorityConfig) {
                            if (!security.matchers[operator](params[i].authorityConfig[operator])) {
                                noaccess = true;
                            }
                        }
                    }
                    if (!noaccess && params[i].name !== undefined) {
                        var th = $("<th style='text-align:center;'>" + params[i].name + "</th>");
                        th.css({width: params[i].width});
                        if (params[i].type === 'checkbox') {
                            th.append($('<input type="checkbox" data-col="' + i + '"/>').on('click', function () {
                                var that = this;
                                $(this).parents('table').find('td input[data-col=' + $(this).data('col') + ']').each(function () {
                                    this.checked = that.checked;
                                });
                            }));
                        }
                        tr.append(th);
                    }
                }
                // 表格内容
                if (dataList.length == 0) {
                    tr = $("<tr><td nodata style='text-align:center;' colspan=\"" + params.length + "\">没有数据需要显示</td></tr>");
                    tbody.append(tr);
                } else {
                    for (var i = 0; i < dataList.length && i < pageSize; i++) {
                        tr = $("<tr data-id-flag=\"" + config.key(dataList, i) + "\"></tr>");
                        tr.data('item', dataList[i]);
                        var trs = tbody.children("[data-id-flag='" + config.key(dataList, i) + "']");
                        for (var j = 0; j < params.length; j++) {
                            var noaccess = false;
                            if (params[j].authorityConfig) {
                                for (var operator in params[j].authorityConfig) {
                                    if (!security.matchers[operator](params[j].authorityConfig[operator])) {
                                        noaccess = true;
                                        break;
                                    }
                                }
                            }
                            if (!noaccess) {
                                if (trs.length > 0) {
                                    if (trs.children().eq(j).text() != params[j].value(dataList, i)) {
                                        trs.children().eq(j).text(trs.children().eq(j).text() + ", " + params[j].value(dataList, i));
                                    }
                                } else {
                                    var td = $("<td></td>");
                                    td.addClass(params[j]['class']);
                                    tr.append(td);
                                    if (params[j].type === 'checkbox') {
                                        td.append('<input type="checkbox" data-row="' + i + '" data-col="' + j + '"/>');
                                        td.css({'text-align': 'center'});
                                        if (params[j].value && params[j].value(dataList, i)) {
                                            td.find('input[type=checkbox]')[0].checked = true;
                                        }
                                    } else {
                                        var context = params[j].value(dataList, i);
                                        if (context != undefined) {
                                            if (context instanceof Object) {
                                                td.append(context);
                                            } else {
                                                td.html(context);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        tbody.append(tr);
                    }
                }
                module.exports.addPagination(module.exports.showTable, config, pageCount, callFun);
                if (callFun) {
                    callFun(table);
                }
                $('.pagination li').attr('disabled', false);
                table.security();
            });
        },
        getPageDataList: function (url, queryObject, pageSize, bufferSize, page, callback) {
            var pageDataList = dataListCollection[url];
            if (pageDataList == undefined) {
                pageDataList = [];
                dataListCollection[url] = pageDataList;
            }
            var dataIndex = -1;
            for (var i = 0; i < pageDataList.length; i++) {
                if (pageDataList[i].startPage <= page && page <= pageDataList[i].endPage) {
                    dataIndex = i;
                }
            }
            //如果请求的页码不在缓存中
            if (dataIndex == -1) {
                var pageCurrent = page * pageSize % bufferSize == 0 ? page * pageSize / bufferSize : parseInt(page * pageSize / bufferSize) + 1;
                this.query(url + (url.indexOf('?') > 0 ? '&' : '?') + 'pageIndex=' + pageCurrent + '&pageSize=' + bufferSize, queryObject, function (dataCount, oriDataList) {
                    var pageCount = dataCount % pageSize == 0 ? dataCount / pageSize : parseInt(dataCount / pageSize) + 1;
                    var item = {
                        dataList: oriDataList,
                        startPage: (pageCurrent - 1) * (bufferSize / pageSize) + 1,
                        endPage: (pageCurrent - 1) * (bufferSize / pageSize) + (oriDataList.length % pageSize == 0 ? oriDataList.length / pageSize : parseInt(oriDataList.length / pageSize) + 1),
                        pageCount: pageCount
                    }
                    dataIndex = insertPageDataList(item);
                    callback(pageCount, getResultData(dataIndex));
                });
            } else {
                callback(pageDataList[dataIndex].pageCount, getResultData(dataIndex));
            }

            function getResultData(dataIndex) {
                var dataList = [];
                //请求的页码在缓存中
                var bufferDataList = pageDataList[dataIndex];
                while (dataList.length < pageSize) {
                    var data = bufferDataList.dataList[((page - 1) % (bufferSize / pageSize)) * pageSize + dataList.length];
                    if (data) {
                        dataList[dataList.length] = data;
                    } else {
                        return dataList;
                    }
                }
                return dataList;
            }

            function insertPageDataList(item) {
                for (var i = pageDataList.length - 1; i >= 0; i--) {
                    if (pageDataList[i].endPage < item.startPage) {
                        for (var k = pageDataList.length - 1; k >= i + 1; k--) {
                            pageDataList[k + 1] = pageDataList[k];
                        }
                        pageDataList[i + 1] = item;
                        return i + 1;
                    }
                }
                pageDataList[pageDataList.length] = item;
                return pageDataList.length - 1;
            }
        },
        addPagination: function (viewFun, config, pageCount, callFun) {
            var container = config.container;
            if (container instanceof jQuery) {
                //如果是jQuery对象什么也不做
            } else {
                container = $(container);
            }
            if (pageCount > 1) {
                var centterw = $('<div class="centterw"><div class="pagination alternate"><ul></ul></div></div>');
                var pagination = centterw.children().children();
                if (config.pageIndex == 1) {
                    pagination.append($('<li class="disabled">上一页</li>'));
                } else {
                    var li = $('<li>上一页</li>');
                    li.click(function () {
                        if ($(this).attr('disabled'))
                            return;
                        config.pageIndex -= 1;
                        viewFun(config, callFun);
                    });
                    pagination.append(li);
                }
                var startPage = 0;
                var endPage = 0;
                if (pageCount <= 9 || config.pageIndex < 5) {
                    startPage = 1;
                    endPage = pageCount > 9 ? 9 : pageCount;
                } else if (config.pageIndex > pageCount - 5) {
                    startPage = pageCount - 8;
                    endPage = pageCount;
                } else {
                    startPage = config.pageIndex - 4;
                    endPage = config.pageIndex + 4;
                }
                for (var i = startPage; i <= endPage; i++) {
                    if (i == config.pageIndex) {
                        pagination.append($('<li class="active">' + i + '</li>'));
                    } else {
                        var li = $('<li>' + i + '</li>');
                        li.click(function () {
                            if ($(this).attr('disabled'))
                                return;
                            config.pageIndex = parseInt($(this).text());
                            viewFun(config, callFun);
                        });
                        pagination.append(li);
                    }
                }
                if (config.pageIndex == pageCount) {
                    pagination.append($('<li class="disabled">下一页</li>'));
                } else {
                    var li = $('<li>下一页</li>');
                    li.click(function () {
                        if ($(this).attr('disabled'))
                            return;
                        config.pageIndex += 1;
                        viewFun(config, callFun);
                    });
                    pagination.append(li);
                }
                // pagination.append($('<p>共' + dataCount + '条记录</p>'));
                pagination.append($('<p>当前<b>' + config.pageIndex + '</b>/' + pageCount + '页</p>'));
                container.append(centterw);
            }
        },
        query: function (url, queryObject, callBack, loader) {
            var loadIndex = layer.load(0, {shade: false});
            for (var param in queryObject) {
                if (queryObject[param] === "") {
                    delete queryObject[param];
                }
            }
            ajax = $.ajax({
                url: encodeURI(url),
                type: 'post',
                async: true,
                data: queryObject,
                success: function (json) {
                    layer.close(loadIndex);
                    var data;
                    if (json instanceof Object) {
                        data = json;
                    }
                    else {
                        data = eval('(' + json + ')');
                    }
                    if (data.code == 0) {
                        if (data.list != undefined) {
                            callBack(data.count, data.list);
                        } else {
                            callBack(data);
                        }
                    } else {
                        layer.msg((data.error ? data.error : "请求失败！"), {
                            icon: 2,
                            time: 3500
                        });
                    }
                },
                error: function (err) {
                    layer.close(loadIndex);
                    layer.alert("请求被服务器拒绝，请重新登陆后重试。<br/>" + err.statusText + "(" + err.status + ")");
                }
            });
        },
        ajaxSubmit: function (config) {
            var _successFunc = config.success;
            var _errorFunc = config.error;
            var core = this;
            config.success = function (json, b, c) {
                var result;
                if (json instanceof Object) {
                    result = json;
                }
                else {
                    result = eval('(' + json + ')');
                }
                var doContinue = _successFunc ? _successFunc(result, b, c) : true;
                // 不传返回值默认继续执行
                if (!doContinue && doContinue != undefined) return;
                if (result.code == 0) {
                    var isLayerFrame = parent ? parent.layer.getFrameIndex(window.name) : false; //先得到当前iframe层的索引
                    var location = isLayerFrame ? parent.location : window.location;
                    layer.msg("操作成功完成！" + (result.msg ? result.msg : ""), {
                        icon: 1,
                        time: 2500 //2.5秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        if (result.redirect) {
                            location.href = result.redirect;
                        } else if (core.getQueryString("goto")) {
                            location.href = decodeURIComponent(core.getQueryString("goto"));
                        } else {
                            location.reload();
                        }
                    });
                } else {
                    layer.msg((result.error ? result.error : "请求失败！"), {
                        icon: 2,
                        time: 3500
                    });
                }
            }
            config.error = function (err) {
                _errorFunc && _errorFunc(err);
                layer.alert("请求被服务器拒绝，请重新登陆后重试。<br/>" + err.statusText + "(" + err.status + ")");
            }
            $.ajax(config);
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        fullAttribute: function (parent, data) {
            parent.find("*[name]").each(function () {
                if ($(this).is('select')) {
                    var val = data[$(this).attr('name')];
                    $(this).val((val && val.split) ? val.split(',') : val);
                } else {
                    data[$(this).attr('name')] !== undefined && $(this).val(data[$(this).attr('name')]);
                }
            });
        },
        clone: function (jsonObj) {
            var buf;
            if (jsonObj instanceof Array) {
                buf = [];
                var i = jsonObj.length;
                while (i--) {
                    buf[i] = arguments.callee(jsonObj[i]);
                }
                return buf;
            } else if (typeof jsonObj == "function") {
                return jsonObj;
            } else if (jsonObj instanceof Object) {
                buf = {};
                for (var k in jsonObj) {
                    buf[k] = arguments.callee(jsonObj[k]);
                }
                return buf;
            } else {
                return jsonObj;
            }
        },
        getStrLength: function (str) {
            var realLength = 0, len = str.length, charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
            }
            return realLength;
        },
        ellipsis: function (str, len) {
            var resultStr = "";
            var realLength = 0, charCode = -1, maxRealLength = (len - 4) / 2;
            var leftIndex = 0;
            var rightIndex = str.length - 1;
            for (; leftIndex < str.length && realLength < maxRealLength; leftIndex++) {
                charCode = str.charCodeAt(leftIndex);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
                resultStr += String.fromCharCode(charCode);
            }
            realLength = 0;
            var rightResultStr = "";
            for (; rightIndex >= 0 && realLength < maxRealLength; rightIndex--) {
                if (rightIndex <= leftIndex) {
                    // 右游标与左游标重合，当前字符串不需要做省略处理
                    return str;
                }
                charCode = str.charCodeAt(rightIndex);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
                rightResultStr = String.fromCharCode(charCode) + rightResultStr;
            }
            return resultStr + "..." + rightResultStr;
        },
        /**
         *
         * @param config
         * {
         *     type : [left,center,right],
         *     maxlength:20
         * }
         */
        ellipsisTips: function (config) {
            var type = config.type;
            var maxLength = config.maxLength;
            var text = config.text;
            var ellipsisStr = '';
            switch (type) {
                case 'left':
                    var realLength = 0;
                    var rightResultStr = "";
                    for (var rightIndex = text.length - 1; rightIndex >= 0 && realLength < maxLength; rightIndex--) {
                        var charCode = text.charCodeAt(rightIndex);
                        if (charCode >= 0 && charCode <= 128) realLength += 1;
                        else realLength += 2;
                        rightResultStr = String.fromCharCode(charCode) + rightResultStr;
                    }
                    ellipsisStr = '...' + rightResultStr;
                    break;
                case 'center':
                    ellipsisStr = module.exports.ellipsis(text, maxLength);
                    break;
                case 'right':
                    var realLength = 0;
                    for (var leftIndex = 0; leftIndex < text.length && realLength < maxLength; leftIndex++) {
                        charCode = text.charCodeAt(leftIndex);
                        if (charCode >= 0 && charCode <= 128) realLength += 1;
                        else realLength += 2;
                        ellipsisStr += String.fromCharCode(charCode);
                    }
                    ellipsisStr += '...';
                    break;
            }
            return $('<span>' + ellipsisStr + '</span>').data('original', text).hover(function () {
                $(this).data('layer-id', layer.tips($(this).data('original'), this, {
                    tips: [1, '#3595CC'],
                    time: 60000
                }));
            }, function () {
                layer.close($(this).data('layer-id'));
            });
        },
        md5: function (string) {

            function RotateLeft(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            }

            function AddUnsigned(lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            }

            function F(x, y, z) {
                return (x & y) | ((~x) & z);
            }

            function G(x, y, z) {
                return (x & z) | (y & (~z));
            }

            function H(x, y, z) {
                return (x ^ y ^ z);
            }

            function I(x, y, z) {
                return (y ^ (x | (~z)));
            }

            function FF(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function GG(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function HH(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function II(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function ConvertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            };

            function WordToHex(lValue) {
                var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
                }
                return WordToHexValue;
            };

            function Utf8Encode(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            };

            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
            var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
            var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
            var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

            string = Utf8Encode(string);

            x = ConvertToWordArray(string);

            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;

            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = AddUnsigned(a, AA);
                b = AddUnsigned(b, BB);
                c = AddUnsigned(c, CC);
                d = AddUnsigned(d, DD);
            }

            var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

            return temp.toLowerCase();
        },
        /**
         * 数字格式转换成千分位
         *@param{Object}num
         */
        commafy: function (num) {
            if ((num + "").trim() == "") {
                return "";
            }
            if (isNaN(num)) {
                return "";
            }
            num = num + "";
            if (/^.*\..*$/.test(num)) {
                varpointIndex = num.lastIndexOf(".");
                varintPart = num.substring(0, pointIndex);
                varpointPart = num.substring(pointIndex + 1, num.length);
                intPart = intPart + "";
                var re = /(-?\d+)(\d{3})/
                while (re.test(intPart)) {
                    intPart = intPart.replace(re, "$1,$2")
                }
                num = intPart + "." + pointPart;
            } else {
                num = num + "";
                var re = /(-?\d+)(\d{3})/
                while (re.test(num)) {
                    num = num.replace(re, "$1,$2")
                }
            }
            return num;
        },
        /**
         * 去除千分位
         *@param{Object}num
         */
        delcommafy: function (num) {
            if ((num + "").Trim() == "") {
                return "";
            }
            num = num.replace(/,/gi, '');
            return num;
        }
    }
    $.fn.checkedItems = function () {
        var items = [];
        $(this).find("tbody").find("input[type=checkbox]:checked").each(function () {
            items.push($(this).parents('tr:first').data('item'));
        });
        return items;
    };
});
define("security", function (require, exports, module) {
    module.exports = {
        setAccessList: function (array) {
            module.exports.accessList = array;
            $("body").security();
        },
        matchers: {
            or: function (authorities) {
                if (module.exports.accessList) {
                    for (var i = 0; i < authorities.length; i++) {
                        for (var j = 0; j < module.exports.accessList.length; j++) {
                            var access = module.exports.accessList[j];
                            for (var z = 0; z < authorities[i].length && z < access.length; z++) {
                                if (authorities[i].charAt(z) == '_') {
                                    access = access.substring(0, z) + '_' + access.substring(z + 1);
                                } else if (access.charAt(z) == '_') {
                                    authorities[i] = authorities[i].substring(0, z) + '_' + authorities[i].substring(z + 1);
                                }
                            }
                            if (authorities[i] === access) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            //ma: function (authorities) {
            //    if (module.exports.accessList) {
            //        for (var i = 0; i < authorities.length; i++) {
            //            for (var j = 0; j < module.exports.accessList.length; j++) {
            //                if (authorities[i] + pageAccess === module.exports.accessList[j].substring(1)) {
            //                    return true;
            //                }
            //            }
            //        }
            //    }
            //    return false;
            //}
        }
    };
    $.fn.security = function () {
        $(this).find("*[data-authority]").each(function () {
            var authority = $(this).data('authority');
            var hasAuth = module.exports.matchers['or'](authority.split(','), module.exports.accessList);
            hasAuth ? $(this).show() : $(this).remove();
        });
        //$(this).find("*[data-auth]").each(function () {
        //    var auth = $(this).data('auth');
        //    var hasAuth = module.exports.matchers['ma'](auth.split(','), module.exports.accessList);
        //    hasAuth ? $(this).show() : $(this).remove();
        //});
    };
});

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (s, i) {
        return args[i];
    });
}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}