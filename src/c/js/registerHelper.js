define(function (require, exports, module) {
  var Tools = require("../../c/js/tools");
  var Handlebars = require("handlebars");
  //IFCODE == === < > <= >= && DE
  Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
    switch (operator) {
      case "!=":
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case "==":
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case "===":
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case "<":
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case "<=":
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case ">":
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case ">=":
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case "&&":
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case "||":
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });
  Handlebars.registerHelper("getLocalTime1", function (item) {
    return Tools.getnewdate(item);
  });
  //年月日
  Handlebars.registerHelper("formatDate", function (item, options) {
    return Tools.formatDate(item);
  });
  //年月日 时分秒
  Handlebars.registerHelper("formatDateFull", function (item, options) {
    return Tools.formatDateAll(item);
  });
  //状态
  Handlebars.registerHelper("formatstatu", function (item, options) {
    return Tools.formatstatu(item, options);
  });
  Handlebars.registerHelper("formatstatue", function (item, options) {
    return Tools.formatstatue(item, options);
  });
  Handlebars.registerHelper("formatstatues", function (item, options) {
    return Tools.formatstatues(item, options);
  });

  Handlebars.registerHelper("formatDateAll", function (operator, item, options) {
    var timeObj = Tools.showCountDown(item);
    switch (operator) {
      case "day":
        return timeObj.d;
      case "hour":
        return timeObj.h;
      case "minute":
        return timeObj.m;
      // default:
      // return options.fn(this);
    }
  });

  Handlebars.registerHelper("statusText", function (value, options) {
    var status = ["未处理", "已通过", "未通过", "黑名单"];
    return status[value];
  });
  Handlebars.registerHelper("check", function (item, options) {
    return item == 0 ? "未查看" : "已查看";
  });
  Handlebars.registerHelper("infoStatus", function (item, options) {
    var status = "";
    if (item == 0) {
      status = "已查看";
    } else if (item == 1) {
      status = "已通过";
    } else if (item == 2) {
      status = "未通过";
    } else if (item == 3) {
      status = "黑名单";
    }
    return status;
  });
  Handlebars.registerHelper("accountStatusInList", function (item, options) {
    return item == 0 ? "启用" : "禁用";
  });
  Handlebars.registerHelper("accountStatus", function (item, options) {
    return item == 0 ? "禁用" : "启用";
  });
  Handlebars.registerHelper("infoSex", function (item, options) {
    if (item == null || item == "") {
      return "--";
    } else {
      return item == 2 ? "女" : "男";
    }
  });
  //报告比对结果
  Handlebars.registerHelper("infoResult", function (item, options) {
    // return item == 0 ? "人脸比对成功" : "人脸比对失败";
    if (item == 0) {
      return "人脸比对成功"
    } else {
      if (options == 40) {
        return "人脸比对失败,人工审核通过"
      }
    }
  });
  //详情比对结果
  Handlebars.registerHelper("infoResults", function (item, options) {
    // return item == 0 ? "人脸比对成功" : "人脸比对失败";
    if (item == 0) {
      return "人脸比对成功"
    } else {
      if (options == -20) {
        return "人脸比对失败,人工审核失败"
      } else if (options == 20) {
        return "人脸比对失败,人工审核成功"
      } else if (options != -20 && options != -20) {
         return "人脸比对失败"
      }
    }
  });
  Handlebars.registerHelper("formatMoney", function (item, options) {
    return Tools.formatMoney(item);
  });
  Handlebars.registerHelper("validateStatus", function (item, options) {
    //手机验证状态     0未校验，1校验失败，2校验成功',
    var status = ["手机号码与身份未校验", "手机号码与身份匹配失败", "手机号码与身份匹配成功"];
    return status[item];
  });
  Handlebars.registerHelper("countAge", function (item, options) {
    //手机验证状态     0未校验，1校验失败，2校验成功',
    if (item != null && item != "") {
      var year = item.substring(0, 4);
      var now = new Date().getFullYear();
      return now - year + 1;
    } else {
      return "--";
    }
  });
  Handlebars.registerHelper("getIndex0", function (item, options) {
    //手机验证状态     0未校验，1校验失败，2校验成功',
    console.log(item[0]);
    return item[0];
  });
  Handlebars.registerHelper("getIndex1", function (item, options) {
    //手机验证状态     0未校验，1校验失败，2校验成功',
    console.log(item[1]);
    return item[1];
  });
  Handlebars.registerHelper("getIndex2", function (item, options) {
    //手机验证状态     0未校验，1校验失败，2校验成功',
    console.log(item[2]);
    return item[2];
  });
  Handlebars.registerHelper("setMobile", function (item, options) {
    var phone = item;
    phone = phone.split("");
    phone.splice(3, 0, "-");
    phone.splice(8, 0, "-");
    return phone.join("");
  });
  Handlebars.registerHelper("setNull", function (item, options) {
    //手机验证状态     0未校验，1校验失败，2校验成功',
    console.log("item:" + item);
    if (item == null || item == "") {
      return "--";
    } else {
      return item;
    }
  });
  //处理身份证有效期限,如：2008/08/26-2018/08/26~2008.08.26-2018.08.26
  Handlebars.registerHelper("transform", function (item, options) {
    if (item == null || item == "") {
      return "--";
    } else {
      return item.replace(/[\/\/]/g, ".");
    }
  });
  //如果返回的数据为null或者“”，就替换成--
  Handlebars.registerHelper("h", function (item, options) {
    if (item == null || item == "") {
      return "--";
    } else {
      return item;
    }
  });
  //注册一个Handlebars Helper,用来将索引+1，因为默认是从0开始的
  Handlebars.registerHelper("addOne", function (index, options) {
    return parseInt(index) + 1;
  });
  //注册一个Handlebars 截取数字
  
  Handlebars.registerHelper("substrNum", function (index) {
    return index.substr(-3, 1);
  });
  
  //注册一个Handlebars Helper,用来将空内容用查无数据代替
  Handlebars.registerHelper("isEmpty", function (item) {
    if (item && item != ' ') {
      return item;
    } else {
      return '查无数据';
    }
  });
});
