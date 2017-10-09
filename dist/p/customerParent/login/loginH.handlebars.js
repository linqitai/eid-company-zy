define("xg/eid-company-zy/1.0.4/p/customerParent/login/loginH.handlebars",["alinw/handlebars/1.3.0/runtime"],function(require,exports,module){var Handlebars=require("alinw/handlebars/1.3.0/runtime"),template=Handlebars.template;module.exports=template(function(Handlebars,depth0,helpers,partials,data){return this.compilerInfo=[4,">= 1.0.0"],helpers=this.merge(helpers,Handlebars.helpers),data=data||{},'<form class="form form-horizontal" id="loginForm">\r\n  <input type="hidden" id="loginType" name="loginType" value="customer">\r\n  <div class="row cl">\r\n    <div class="formControls col-sm-12">\r\n      <img class="logoIcon" src="http://static.hpbanking.com/xg/uploads/files/040c322110142f68750ea2c701dd588f-123-39.png">\r\n      <span class="logoTitle">卓壹身份标识系统</span>\r\n    </div>\r\n  </div>\r\n  <!--<div class="row cl">\r\n        <div class="formControls col-sm-12 text-c">\r\n            <span class="titleName">用户登录</span>\r\n        </div>\r\n    </div>-->\r\n  <div class="row cl">\r\n    <div class="formControls col-sm-12">\r\n      <input type="text" class="input-text radius size-XL" autocomplete="off" placeholder="请输入用户名" maxlength="11" name="username"\r\n        id="username" tabindex="1">\r\n    </div>\r\n  </div>\r\n  <div class="row cl">\r\n    <div class="formControls col-sm-12">\r\n      <input type="password" class="input-text radius size-XL" autocomplete="off" placeholder="请输入密码" name="password" id="password"\r\n        tabindex="2">\r\n    </div>\r\n  </div>\r\n  <div class="row cl">\r\n    <div class="formControls col-sm-12">\r\n      <input type="text" class="input-text radius size-XL" autocomplete="off" placeholder="请输入验证码" name="checkCode" id="checkCode"\r\n        tabindex="3">\r\n      <img class="checkCode" src="/checkCode.jpg">\r\n    </div>\r\n  </div>\r\n  <div class="row cl">\r\n    <div class="formControls col-sm-12">\r\n      <!--<a href="javascript:void(0)" class="forgetPsd pull-right">忘记密码请联系客服！</a>-->\r\n      <!--<div class="text-c shallowGray" style="font-size: 12px;">注:为了获得更好的体验，建议把浏览器升级到最新版本</div>-->\r\n      <input class="btn btn-secondary radius size-L" id="loginBtn" type="submit" value="登&nbsp;&nbsp;录">\r\n    </div>\r\n  </div>\r\n  <!--<div class="mt-20 cl">\r\n        <div class="text-c shallowGray">© 杭州卓壹金融信息服务股份有限公司</div>\r\n    </div>-->\r\n</form>'})});