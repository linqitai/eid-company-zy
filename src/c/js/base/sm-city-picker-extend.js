define(function(require, exports, module) {
    /*!
     * =====================================================
     * SUI Mobile - http://m.sui.taobao.org/
     *
     * =====================================================
     */
// jshint ignore: start
    + function($) {
        "use strict";
        var area = require("../../js/area.js");
        var china = [],
            p = area.getProvince(),
            c = [];
        for(var i=0;i<p.length;i++){
            china[i] = {
                name: p[i],
                sub: []
            }
            for(var j=0;j<area.getCity(p[i]).length;j++){
                china[i].sub[j] = {
                    name: area.getCity(p[i])[j],
                    sub: []
                }
                for(var k=0;k<area.getArea(p[i], area.getCity(p[i])[j]).length;k++){
                    china[i].sub[j].sub[k] = {
                        name: area.getArea(p[i], area.getCity(p[i])[j])[k]
                    }
                }
            }
        }

        $.smConfig.rawCitiesData = china;
        var format = function(data) {
            var result = [];
            for(var i=0;i<data.length;i++) {
                var d = data[i];
                if(d.name === "请选择") continue;
                result.push(d.name);
            }
            if(result.length) return result;
            return [""];
        };

        var sub = function(data) {
            if(!data.sub) return [""];
            return format(data.sub);
        };

        var getCities = function(d) {
            for(var i=0;i< raw.length;i++) {
                if(raw[i].name === d) return sub(raw[i]);
            }
            return [""];
        };

        var getDistricts = function(p, c) {
            for(var i=0;i< raw.length;i++) {
                if(raw[i].name === p) {
                    for(var j=0;j< raw[i].sub.length;j++) {
                        if(raw[i].sub[j].name === c) {
                            return sub(raw[i].sub[j]);
                        }
                    }
                }
            }
            return [""];
        };

        var getCityIndex = function(cities, c){
            for(var i=0;i<cities.length;i++){
                if(cities[i]==c){
                    return i
                    break;
                }
            }
        }

        var getDistrictIndex = function(districts, d){
            for(var i=0;i<districts.length;i++){
                if(districts[i]==d){
                    return i
                    break;
                }
            }
        }

        var scrollBar = function(bar, i){
            var value = 90-i*36;
            $(".picker-items-col-wrapper").eq(bar).css({
                transform: "translate3d(0px, "+value+"px, 0px)"
            })
            var item = $(".picker-items-col-wrapper").eq(bar).find(".picker-item");
            item.removeClass("picker-selected");
            item.eq(i).addClass("picker-selected");
            item.eq(i).trigger("click");
        }

        var raw = $.smConfig.rawCitiesData;
        var provinces = raw.map(function(d) {
            return d.name;
        });

        var initCities = sub(raw[0]);
        var initDistricts = [""];

        var currentProvince = provinces[0];
        var currentCity = initCities[0];
        var currentDistrict = initDistricts[0];
        var count = 0,
            valuesInit;

        var cols = [
                {
                    textAlign: 'center',
                    values: provinces,
                    cssClass: "col-province"
                },
                {
                    textAlign: 'center',
                    values: initCities,
                    cssClass: "col-city"
                }
            ],
            district = {
                textAlign: 'center',
                values: initDistricts,
                cssClass: "col-district"
            };

        var defaults = {

            cssClass: "city-picker",
            rotateEffect: false,  //为了性能
            district: true, //默认显示区域

            onChange: function (picker, values, displayValues) {
                count++
                if(count==1){
                    valuesInit = values;
                }
                var newProvince = picker.cols[0].value;
                var newCity;
                if(newProvince !== currentProvince) {
                    var newCities = getCities(newProvince);
                    newCity = newCities[0];
                    if(this.district){
                        var newDistricts = getDistricts(newProvince, newCity);
                    }
                    picker.cols[1].replaceValues(newCities);
                    if(this.district){
                        picker.cols[2].replaceValues(newDistricts);
                    }
                    currentProvince = newProvince;
                    currentCity = newCity;
                    picker.updateValue();
                    if(valuesInit){
                        var cityIndex = getCityIndex(newCities, valuesInit[1]);
                        //scrollBar(1, cityIndex, picker.params.input);
                        if(this.district){
                            var newDistricts = getDistricts(newProvince, valuesInit[1]);
                            var districtIndex = getDistrictIndex(newDistricts, valuesInit[2]);
                        }
                        scrollBar(2, cityIndex, picker.params.input);
                    }
                    return;
                }
                newCity = picker.cols[1].value;
                if(newCity !== currentCity) {
                    if(this.district){
                        picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                    }
                    currentCity = newCity;
                    picker.updateValue();
                }
            },
            cols: cols
        };


        $.fn.cityPicker = function(params) {
            return this.each(function() {
                if(!this) return;
                var p = $.extend(defaults, params);
                if(p.district){
                    p.cols.push(district);
                }
                p = $.extend(p, params);

                //计算value
                var val = $(this).val() || "北京市 北京市 东城区";
                if(val) {
                    p.value = val.split(" ");
                    if(p.value[0]) {
                        p.cols[1].values = getCities(p.value[0]);
                    }
                    if(p.value[1] && defaults.district) {
                        p.cols[2].values = getDistricts(p.value[0], p.value[1]);
                    } else {
                        //p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]);
                    }
                }
                $(this).picker(p);
            });
        };


    }(Zepto);
    return Zepto;
});