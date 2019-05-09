var isJsonBird = false;
var jsonBird = isJsonBird ? "https://bird.ioliu.cn/v1/?url=" : ""; //代理请求（跨域问题

function sendCode(phone){  //发送验证码；参数：手机号码
	var deferred = $.Deferred();
	$.ajax({
		type: "post",
		url: jsonBird + "http://dc.xjfw.top/index/Eatery/send",
		data: {
			phone: phone,
		},
		success: function(data) {
			deferred.resolve(data);
		},
		error: function(res) {
			console.log(res);
		}
	});
	return deferred.promise();
}
function binDing(phone,code){  //绑定手机；参数1：手机号码，参数2：验证码
	var deferred = $.Deferred();
	$.ajax({
		type: "post",
		url: jsonBird + "http://dc.xjfw.top/index/Eatery/verify",
		data: {
			phone: phone,
			code: code,
		},
		success: function(data) {
			deferred.resolve(data);
		},
		error: function(res) {
			console.log(res);
		}
	});
	return deferred.promise();
}

function getcuisine(id){   //获取食堂菜式；参数：该食堂id    **当前暂时写死有三个食堂：第一食堂（id：1）、第二食堂（id：2）、第三食堂（id：3）**
	var deferred = $.Deferred();
	$.ajax({
		type: "post",
		url: jsonBird + "http://dc.xjfw.top/index/Eatery/getcuisine",
		data: {
			id: id,
		},
		success: function(data) {
			deferred.resolve(data);
		},
		error: function(res) {
			console.log(res);
		}
	});
	return deferred.promise();
}
