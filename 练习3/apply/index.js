$(function() {

	var httpd = config().RequestUrl; //请求地址；
	var tokenid = "928c2fae62138fddcae2521f0b8b878c";

	var jsons = {};

	jsons.token = tokenid; //token；
	jsons.keys = ""; //邀请码
	jsons.username = ""; //名字
	jsons.phone = ""; //手机号码
	jsons.phoneCode = ""; //验证码
	jsons.idcard = ""; //身份证号码；
	jsons.bank_card_no = ""; //银行卡号；
	jsons.bank_name = ""; //银行名字；
	jsons.bank_account = ""; //支行；

	jsons.sex = ""; //性别
	jsons.anchorImg = "" //封面；
	jsons.idcardFront = "" //证件正面
	jsons.idcardBack = "" //证件背面

	$(".submit-btn").on("click", function() {
		if(!jsons.keys || !jsons.username || !jsons.phone || !jsons.phoneCode ||
			!jsons.idcard || !jsons.bank_card_no || !jsons.bank_name ||
			!jsons.bank_account || !jsons.anchorImg || !jsons.idcardFront ||
			!jsons.idcardBack) {

			alert("请填写完整资料");
		} else {
			console.log(jsons);
		}
	})

	$(".info-in-radio").on("change", function() { //性别单选框
		jsons.sex = $(this).val();
	})
	$(".keys").on("input", function() { //邀请码
		jsons.keys = $(this).val();
	})
	$(".username").on("input", function() { //名字
		jsons.username = $(this).val();
	})
	$(".bank_card_no").on("input", function() { //银行卡号；
		jsons.bank_card_no = $(this).val();
	})
	$(".bank_name").on("input", function() { //银行名字；
		jsons.bank_name = $(this).val();
	})
	$(".json.bank_account").on("input", function() { //银行支行；
		jsons.bank_account = $(this).val();
	})

	$(".idcard").on("input", function() { //身份证号
		var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		var val = $(this).val();
		if(!reg.test(val)) {
			console.log("错误");
			$(".err").show();
			jsons.idcard = "";
		} else {
			console.log("正确");
			$(".err").hide();
			jsons.idcard = val;
		}
		if(!val) {
			$(".err").hide();
			jsons.idcard = "";
		}
	})
	$(".phone").on("input", function() { //号码
		var reg = /^1[23456789]\d{9}$/;
		var val = $(this).val();
		if(!reg.test(val)) {
			console.log("错误");
			jsons.phone = "";
		} else {
			console.log("正确");
			jsons.phone = val;
		}
		if(!val) {
			jsons.phone = "";
		}
	})
	$(".phoneCode").on("input", function() { //输入验证码
		jsons.phoneCode = $(this).val();
	})

	$(".code").on("click", function() { //获取验证码
		var phone = jsons.phone;
		if(phone) {
			getPhoneCode(phone).then(function() {
				console.log("已发送");
				var timer = ""
				var num = 30;
				$(".code").attr("disabled", "disabled").addClass("disabled");
				timer = setInterval(function() {
					num--;
					$(".code").val(num + "s");
					if(num <= 0) {
						clearInterval(timer);
						num = 30;
						$(".code").removeAttr("disabled").removeClass("disabled");
						$(".code").val("验证");
					}
				}, 1000)
			})
		} else {
			alert("号码错误");
		}
	})

	$(".upCover").on("change", function(e) { //封面
		var input = e.target;
		
//		var reader = new FileReader();
//		reader.onload = function(){
//			var dataURL = reader.result;  //img 64base
//		}
//		reader.readAsDataURL(input.files[0])
		
		var fd = new FormData();
		
		fd.append("upload_file", input.files[0]);
		fd.append("token", tokenid);
		$.ajax({
			url: httpd + "api.php/ApplyApi/uploadPic",
			type: "POST",
			data: fd,
			processData: false, //必须， 告诉jQuery不要去处理发送的数据
			contentType: false, //必须， 告诉jQuery不要去设置Content-Type请求头
			success: function(data) {
				
			}
		});
	})
	$(".upidcardF").on("change", function() { //省份证正面
		var files = this.files[0];

	})
	$(".upidcardB").on("change", function() { //省份证背面
		var files = this.files[0];

	})

	function uploadPic(files, token) { //上传图片；
		var deferred = $.Deferred();
		var fd = new FormData();
		fd.append("upload_file", files);
		fd.append("token", token);
		$.ajax({
			url: httpd + "api.php/ApplyApi/uploadPic",
			type: "POST",
			data: fd,
			success: function(data) {
				deferred.resolve(data);
			}
		});
		return deferred.promise();
	}

	function getPhoneCode(phone) { //获取手机验证码
		var deferred = $.Deferred();
		$.ajax({
			url: httpd + "api.php/Login/getCode",
			type: "POST",
			data: {
				"phone": phone
			},
			success: function(data) {
				deferred.resolve(data);
			}
		});
		return deferred.promise();
	}

	function addAnchorApply(json) { //主播申请信息添加
		$.ajax({
			type: "post",
			url: httpd + "api.php/ApplyApi/addAnchorApply",
			data: {
				"familyKey": json.keys,
				"phoneNo": json.phone,
				"verifyCode": json.phoneCode,
				"anchorName": json.username,
				"paperNo": json.idcard,
				"bankName": json.bank_name,
				"bankCardNo": json.bank_card_no,
				"bankAccount": json.bank_account,
				"anchorImg": json.anchorImg,
				"idcardFront": json.idcardFront,
				"idcardBack": json.idcardBack,
				"token": json.token,
			},
			success: function(data) {
				if(data.ret != 1) {
					alert(data.msg)
				} else {
					window.location.href = "auditing.html";
				}
			}
		});
	}

	function editAnchorApply(json) { //修改主播申请信息
		$.ajax({
			type: "post",
			url: httpd + "api.php/ApplyApi/addAnchorApply",
			data: {
				"familyKey": json.keys,
				"phoneNo": json.phone,
				"verifyCode": json.phoneCode,
				"anchorName": json.username,
				"paperNo": json.idcard,
				"bankName": json.bank_name,
				"bankCardNo": json.bank_card_no,
				"bankAccount": json.bank_account,
				"anchorImg": json.anchorImg,
				"idcardFront": json.idcardFront,
				"idcardBack": json.idcardBack,
				"token": json.token,
			},
			success: function(data) {
				if(data.ret != 1) {
					alert(data.msg)
				} else {
					window.location.href = "auditing.html";
				}
			}
		});
	}

})