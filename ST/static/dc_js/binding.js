//===================================================================
// 文件名:	binding.js
// 版权:		无
// 创建人:	cheng.pang
// 创建日期:	2019-5-9
// 描述:		binding.js
// 备注:		无
//===================================================================

$(document).ready(function() {
	function sendcodefn() {
		var phoneCode = $("#phonenumber").val();  //手机号码
		sendCode(phoneCode).then(function(data){
			console.log(data);
			if(data==="发送验证码成功"){
				var s = 60;
				var timer;
				$(".code").html(s+"s");
				$(".code").attr("disabled","disabled");
				timer=setInterval(function(){
					s--;
					$(".code").html(s+"s");
					if(s<=0){
						clearInterval(timer);
						$(".code").html("发送验证码");
						$(".code").removeAttr("disabled");
					}
				},1000)
			}else if(data==="发送验证码失败"){
				mui.toast(data);
			}else{
				mui.toast(data);
			}
			
		})
	}
	function bindingfn() {
		var phoneCode = $("#phonenumber").val();  //手机号码
		var verifyCode = $("#verificode").val();  //验证码
		binDing(phoneCode,verifyCode).then(function(data){
			console.log(data);
			if(data==="验证成功"){
				mui.alert("您已绑定成功！","恭喜",function(){
					location.href = "order.html";
				})
			}else{
				mui.toast(data);
			}
		});
	}
	
    function registerfn() {
		console.log("ajax注册交互");
	}
    
	
	(function($, win, sendcodefn, registerfn, bindingfn) {
		var phonereg = /^1[34578]\d{9}$/; //手机号码正则表达式；
		var username = $("#username");
		var phonenumber = $("#phonenumber");
		var verificode = $("#verificode");
		var recomcode = $("#recomcode");
		var mechanism = $("#mechanism");
		var inputs = $("input[data-input-clear]");
		var clear_ipt = $(".icon-clear");
		$(".code")[0].addEventListener("tap", function() {
			if(!phonenumber[0].value) {
				mui.toast("请输入手机号码");
				return false;
			} else if(!phonereg.test(phonenumber[0].value)) {
				mui.toast("手机号码格式错误");
				return false;
			} else {
				sendcodefn(); //发送验证码；
			}
		})
		$(".sbt-btn")[0].addEventListener("tap", function() {
			if(Boolean(username.length) && !username[0].value) {
				mui.toast("请输入姓名");
				return false;
			} else if(Boolean(phonenumber.length) && !phonenumber[0].value) {
				mui.toast("请输入手机号码");
				return false;
			} else if(Boolean(phonenumber.length) && !phonereg.test(phonenumber[0].value)) {
				mui.toast("手机号码格式错误");
				return false;
			} else if(Boolean(verificode.length) && !verificode[0].value) {
				mui.toast("请输入验证码");
				return false;
			} else if(Boolean(recomcode.length) && !recomcode[0].value) {
				mui.toast("请输入邀请码");
				return false;
			} else if(Boolean(mechanism.length) && !mechanism[0].value) {
				mui.toast("请选择所属机构");
				return false;
			} else {
				if(this.getAttribute("data-inter") == "register") {
					registerfn(); //注册
				} else if(this.getAttribute("data-inter") == "binding") {
					bindingfn(); //绑定
				}
			}
		})
		inputs.each(function(index, ele) {
			ele.addEventListener("input", function() {
				if(this.value) {
					this.nextElementSibling.classList.remove("hide");
				} else {
					this.nextElementSibling.classList.add("hide");
				}
			})
			clear_ipt[index].addEventListener("tap", function() {
				this.previousElementSibling.value = "";
				this.classList.add("hide");
			})

		})
	})(mui, window, sendcodefn, registerfn, bindingfn)

})