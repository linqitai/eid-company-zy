define("xg/eid-company-zy/1.0.4/p/adminAccount/rechargeManage/picter.handlebars",["alinw/handlebars/1.3.0/runtime"],function(require,exports,module){var Handlebars=require("alinw/handlebars/1.3.0/runtime"),template=Handlebars.template;module.exports=template(function(Handlebars,depth0,helpers,partials,data){return this.compilerInfo=[4,">= 1.0.0"],helpers=this.merge(helpers,Handlebars.helpers),data=data||{},'<div class="queryBox mt-10 text" id="queryTime" style="height:35px;">\r\n\r\n    <label class="labelText w70 pull-left text-r" style="float:left;margin-left:15px;margin-top:5px;">查询时间：</label>\r\n    <select id=\'dayOrMonth\' class="input-text pull-left w120" style="height: 30px;line-height: 30px;margin:2px 10px 25px 0;width:120px;float:left;">\r\n        <option value ="0">按日</option>\r\n        <option value ="1">按月</option>\r\n    </select>\r\n    <div id="daypicker" class="" style="float:left;">\r\n        <input size="16" id="startTime" class="startTime input-text pull-left w120" style="width:120px;" type="text" placeholder="开始时间"\r\n            readonly>\r\n        <div class="pull-left" style="height: 32px;line-height: 32px;padding: 0px 10px;display:inline-block;">--</div>\r\n        <input size="16" id="endTime" class="endTime input-text pull-left w120" style="width:120px;" type="text" placeholder="结束时间"\r\n            readonly>\r\n    </div>\r\n    <div id="monthpicker" class="active" style="float:left;">\r\n        <input size="16" id="starmonth_time" style="width:120px;" class="starmonth_time input-text pull-left w120" type="text" placeholder="开始时间"\r\n            readonly>\r\n        <div class="pull-left" style="height: 32px;line-height: 32px;padding: 0px 10px;display:inline-block;">--</div>\r\n        <input size="16" style=" width:120px;background:#ffffff;border-radius:0;height:30px;border:1px solid #ddd;display:inline-block" type="text" class="form-control input-text form_datetime_2 w120 endmonth_time pull-left"\r\n            readonly id="endmonth_time" value="" placeholder="结束时间" />\r\n    </div>\r\n</div>\r\n<br>\r\n<button class="btn radius btn-primary" id="addCustomer" style="margin-left:15px;">充值</button>'})});