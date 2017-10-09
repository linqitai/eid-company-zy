/*By wgyi 2015-5-16*/

define("form", function (require, exports, module) {
    var core = require('core');
    $("form").on('blur input propertychange change', "*[data-format]",
        function () {
            var patrn = new RegExp($(this).attr('data-format'));
            if (!patrn.exec($(this).val())) {
                if ($(this).val() == "") {
                    //$(this).parent().append(createMsgHolder('info',$(this).attr('data-onfocus')));
                } else {
                    createMsgHolder('error', $(this).attr('data-onerror'), $(this));
                }
                $(this).addClass('formaterr');
            } else {
                removeMsgHolder($(this));
                $(this).removeClass('formaterr');
            }
        }
    );
    $("form").on('blur', "*[data-format]",
        function () {
            var patrn = new RegExp($(this).attr('data-format'));
            if (!patrn.exec($(this).val())) {
                if ($(this).val() == "") {
                    removeMsgHolder($(this));
                } else {
                    createMsgHolder('error', $(this).attr('data-onerror'), $(this));
                }
                $(this).addClass('formaterr');
            } else {
                removeMsgHolder($(this));
                $(this).removeClass('formaterr');
            }
        }
    );
    $("form").on('blur input propertychange change', "*[data-valueas]",
        function () {
            var oriValue = $($(this).attr("data-valueas")).val();
            if ($(this).val() == "") {
                createMsgHolder('info', $(this).attr('data-onfocus'), $(this));
            } else {
                if ($(this).val() != oriValue) {
                    createMsgHolder('error', $(this).attr('data-onerror'), $(this));
                } else {
                    removeMsgHolder($(this));
                }
            }
        }
    );
    $("form").on('focus click', "*[data-onfocus]",
        function () {
            createMsgHolder('info', $(this).attr('data-onfocus'), $(this));
        }
    );

    $("form").on('input propertychange', "input[name=checkCode]",
        function () {
            this.value = this.value.toUpperCase();
        }
    );

    $("form").find("input[type=password][check-strength]").on('input propertychange focus',
        function () {
            $(".strength-bar").remove();
            if (this.value != "") {
                var checkresult = PasswordStrength.StrengthLevel(this.value);
                if (isNaN(checkresult.value)) {
                    $(this).parents(".controls:first").before('<label class="control-lable strength-bar"><div style="color:#ff6e00">密码中含有不允许的字符</div></label>');
                } else if (checkresult.value < 21) {
                    $(this).parents(".controls:first").before('<label class="control-lable strength-bar"><span style="background:#fcbf90"></span>' + checkresult.level + '</label>');
                } else if (checkresult.value < 30) {
                    $(this).parents(".controls:first").before('<label class="control-lable strength-bar"><span style="background:#fcbf90"></span><span style="background:#fe903d"></span>' + checkresult.level + '</label>');
                } else {
                    $(this).parents(".controls:first").before('<label class="control-lable strength-bar"><span style="background:#fcbf90"></span><span style="background:#fe903d"></span><span style="background:#ff6e00"></span>' + checkresult.level + '</label>');
                }
                if (checkresult.value > $(this).attr("check-strength")) {
                    $(this).attr("data-format", "^[a-zA-Z\\d\\(\\)\\-\\,\\.\\?\\:\\;\\'\\!]{1,20}$");
                } else {
                    $(this).attr("data-format", "^.{0}$");
                }
            }
        });

    var PasswordStrength = {
        Level: ["高", "中", "低"],
        LevelValue: [30, 21, 0],
        //强度值
        Factor: [1, 1, 1, 1],
        //字符加数,分别为字母，数字，其它
        KindFactor: [0, 15, 15, 15],
        //密码含几种组成的加数
        Regex: [/[a-z]/g, /[A-Z]/g, /\d/g, /[\(\)\-\,\.\?\:\;\'\!]/g] //字符正则数字正则其它正则
    }

    PasswordStrength.StrengthValue = function (pwd) {
        if (pwd.length == 0) return 0;
        var strengthValue = 0;
        var ComposedKind = 0;
        for (var i = 0; i < this.Regex.length; i++) {
            var chars = pwd.match(this.Regex[i]);
            if (chars != null) {
                strengthValue += this.Factor[i] * (chars.length > 20 ? 20 : chars.length);
                ComposedKind++;
            }
        }
        strengthValue += this.KindFactor[ComposedKind - 1];
        return strengthValue;
    }

    PasswordStrength.StrengthLevel = function (pwd) {
        var result = {
            value: this.StrengthValue(pwd)
        };

        for (var i = 0; i < this.LevelValue.length; i++) {
            if (result.value >= this.LevelValue[i]) {
                result.level = this.Level[i];
                break;
            }
        }
        return result;
    }

    $(document).on('submit', 'form[data-role=ajax]', function () {
        var that = this;
        var verificationSucc = checkFormVerification(this);
        if (verificationSucc) {
            var layerIndex = layer.load(0, {shade: 0.2});
            $(this).ajaxSubmit({
                type: 'post',
                success: function (json) {
                    layer.close(layerIndex);
                    var result;
                    if (json instanceof Object) {
                        result = json;
                    }
                    else {
                        result = eval('(' + json + ')');
                    }
                    if (result.code == 0) {
                        var dataReload = $(that).data('reload');
                        var isLayerFrame = parent ? parent.layer.getFrameIndex(window.name) : false; //先得到当前iframe层的索引

                        var location = dataReload == 'none' ? {
                            reload: function () {
                            }
                        } : isLayerFrame && dataReload != 'self' ? parent.location : window.location;
                        layer.msg("操作成功完成！" + (result.msg ? result.msg : ""), {
                            icon: 1,
                            time: 2500 //2.5秒关闭（如果不配置，默认是3秒）
                        }, function () {
                            if (result.redirect) {
                                location.href = result.redirect;
                            } else if (core.getQueryString("goto")) {
                                location.href = decodeURIComponent(modal.core.getQueryString("goto"));
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
                },
                error: function (err) {
                    layer.close(layerIndex);
                    if (err.status != 403) {
                        $(document).html(err.responseText);
                    } else {
                        var modal = $('<div class="modal" id="modal-add-event" data-backdrop="static">\r\n                <div class="modal-header">\r\n                  <h3>系统消息</h3>\r\n                </div>\r\n                <div class="modal-body">\r\n                  <p class="ft18">您的登陆已失效，请重新登陆。</p>\r\n                </div>\r\n                <div class="modal-footer"><a href="/login" class="btn btn-primary">确定</a> </div>\r\n           </div>');
                        $("body").append(modal);
                        modal.modal({keyboard: false});
                    }
                }
            });
        }
        return false;
    });

    function checkFormVerification(form) {
        var verificationSucc = true;
        var verification = $(form).find("*[data-format]:visible");
        var firstErrorElemtent;
        for (var i = verification.length - 1; i >= 0; i--) {
            var element = verification.eq(i);
            removeMsgHolder($(element));
            var patrn = new RegExp(element.attr('data-format'));
            var value = element.val();
            if (!patrn.exec(value === null || value === undefined ? "" : value)) {
                firstErrorElemtent = element;
                if (element.attr('data-onerror')) {
                    createMsgHolder('error', element.attr('data-onerror'), element);
                }
                $(element).addClass('formaterr');
                verificationSucc = false;
            } else {
                $(element).removeClass('formaterr');
            }
        }
        verification = $(form).find("*[data-valueas]:visible");
        for (var i = verification.length - 1; i >= 0; i--) {
            var element = verification.eq(i);
            removeMsgHolder($(element));
            var oriValue = $(element.attr("data-valueas")).val();
            if (element.val() == "") {
                firstErrorElemtent = element;
                if (element.attr('data-onerror')) {
                    createMsgHolder('info', element.attr('data-onerror'), element);
                }
                $(element).addClass('formaterr');
                verificationSucc = false;
            } else {
                if (element.val() != oriValue) {
                    firstErrorElemtent = element;
                    if (element.attr('data-onerror')) {
                        createMsgHolder('error', element.attr('data-onerror'), element);
                    }
                    $(element).addClass('formaterr');
                    verificationSucc = false;
                }
            }
        }
        if (!verificationSucc) {
            setTimeout(function () {
                firstErrorElemtent.focus();
            }, 200);
        }
        return verificationSucc;
    }

    module.exports = {
        checkFormVerification: checkFormVerification
    }
    var msgHolderMapper = {};
    var msgHolderIndex = 0;

    function createMsgHolder(type, content, _for) {
        if (content) {
            var msgholder = $('<div class="msgholder ' + type + '" data-index="' + (++msgHolderIndex) + '">' + content + '</div>');
            msgHolderMapper[msgHolderIndex] = _for[0];
            // 移除重复的
            removeMsgHolder(_for);
            if (_for.is('select') && _for.next(".select2-container").length > 0) {
                _for = _for.next(".select2-container");
            } else if (_for.parent('.input-group').length > 0) {
                _for = _for.parent('.input-group');
            } else if (_for.parent('.form-control').length > 0) {
                _for = _for.parent('.form-control');
            }
            _for.after(msgholder);
            return msgholder;
        }
    }

    function removeMsgHolder(_for) {
        $(".msgholder").each(function () {
            if (msgHolderMapper[$(this).data('index')] == _for[0]) {
                $(this).remove();
            }
        });
    }
});
