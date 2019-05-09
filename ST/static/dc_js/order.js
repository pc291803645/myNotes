//===================================================================
// 文件名:	binding.js
// 版权:		无
// 创建人:	cheng.pang
// 创建日期:	2019-5-9
// 描述:		binding.js
// 备注:		无
//===================================================================

$(document).ready(function() {
	var canteenID = $(".opt-list li").eq(0).find("a").data("id");  //默认第一个食堂id；
	getCuisine(canteenID);
	
	
	//食堂切换
	$(".opt-list li").on("click", function() {
		$(this).addClass("active").siblings("li").removeClass("active");
		$(".ctn-name").text($(this).text());
		canteenID = $(this).find("a").data("id");
		getCuisine(canteenID);
		
		setTimeout(function() {
			mui('.mui-popover').popover("hide"); //弹框隐藏
		}, 100)
		
		
	})
	//菜式预定选择
	$(".menu-items").on("click", function() {
		if(!$(this).hasClass("menu-select-not")) {
			$(this).toggleClass("menu-select");
		} else {
			console.log("不可重复预定");
			mui.toast("不可重复预定")
		}
	})
	
	function getCuisine(id){
		loading(true);
		$(".meal-container").children().remove();
		getcuisine(id).then(function(data){
			loading(false);
			console.log(data);
		})
	}
	

	mui.init();
	mui('.mui-scroll-wrapper').scroll(); //弹框设置超出可滚动
	//img懒加载
	Echo.init({
		offset: 0, // 指定距离视窗上下左右位置图片预加载 Number|String Default: 0
		throttle: 0 // 延迟加载  Number|String	Default: 250
	});

})