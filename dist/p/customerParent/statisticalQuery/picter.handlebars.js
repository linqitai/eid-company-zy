define("xg/eid-company-zy/1.0.4/p/customerParent/statisticalQuery/picter.handlebars",["alinw/handlebars/1.3.0/runtime"],function(require,exports,module){var Handlebars=require("alinw/handlebars/1.3.0/runtime"),template=Handlebars.template;module.exports=template(function(Handlebars,depth0,helpers,partials,data){this.compilerInfo=[4,">= 1.0.0"],helpers=this.merge(helpers,Handlebars.helpers),data=data||{};var buffer="";return buffer+='<div class="queryBox mt-10 text" id="queryTime">\r\n\r\n    <label class="labelText w70 pull-left text-r">查询时间：</label>\r\n    <select id=\'dayOrMonth\' class="input-text pull-left w120" style="height: 30px;line-height: 30px;margin-right: 10px;">\r\n        <option value ="0">按日</option>\r\n        <option value ="1">按月</option>\r\n    </select>\r\n    <!--<div class="input-append date form_starttime pull-left">\r\n        &lt;!&ndash;<input type="text" class="form-control">&ndash;&gt;\r\n        <input size="16" class="startTime input-text w120" type="text" placeholder="开始时间" readonly disabled="true">\r\n        <span class="add-on"><i class="Hui-iconfont Hui-iconfont-feedback2 icon-th"></i></span>\r\n    </div>\r\n    <div class="pull-left" style="height: 32px;line-height: 32px;padding: 0px 10px;">--</div>\r\n    <div class="input-append date form_endttime pull-left">\r\n        <input size="16" class="endTime input-text w120" type="text" placeholder="结束时间" readonly disabled="true">\r\n        <span class="add-on"><i class="Hui-iconfont Hui-iconfont-feedback2 icon-th"></i></span>\r\n    </div>-->\r\n    \r\n    <div id="daypicker" class="">\r\n        <input size="16" id="startTime" class="startTime input-text pull-left w120" type="text" placeholder="开始时间" readonly>\r\n        <div class="pull-left" style="height: 32px;line-height: 32px;padding: 0px 10px;">--</div>\r\n        <input size="16" id="endTime" class="endTime input-text pull-left w120" type="text" placeholder="结束时间" readonly>\r\n    </div>\r\n    <div id="monthpicker" class="active">\r\n        <input size="16" id="starmonth_time" class="starmonth_time input-text pull-left w120" type="text" placeholder="开始时间" readonly>\r\n        <div class="pull-left" style="height: 32px;line-height: 32px;padding: 0px 10px;">--</div>\r\n        <input size="16" style=" width:120px;background:#ffffff;border-radius:0;height:30px;border:1px solid #ddd;" type="text" class="form-control form_datetime_2 w120 endmonth_time pull-left"\r\n            readonly id="endmonth_time" value="" placeholder="结束时间"  />\r\n    </div>\r\n</div>\r\n <div class="queryBox mt-10">\r\n    <label class="labelText pull-left">地区选择：</label>\r\n    <div class="pull-left" id="address"></div>\r\n\r\n    <label class="labelText pull-left ml-40">门店名称：</label>\r\n    <select class="input-text pull-left w140" id="storeNameSelect">\r\n        <option value="">全部</option>\r\n    </select>\r\n    \r\n</div>'})});