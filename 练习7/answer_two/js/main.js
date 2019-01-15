$(function(){
	var sp_val;  //储存答案
	var num = 0; //变量
	var iW = $('.subject').innerWidth();  //每个答题卡的宽
	var iw_length = iW*$('.subject').length;  //总长度
	
	$('.subject-width').css("width",iw_length);  //设置宽
	
	var arr = [1234,1234,1234,123,1,1,12,1,123,13];
	
	//点击答案：
	$('.bright').find("span").click(function(){
		$(this).toggleClass("active");
	})
	
	//点击下一题：
	$('.btn').click(function(){
		sp_val = '';
		var spans = $('.bright').eq(num).find("span");  //答案
		//判断找到选中的答案
		for(var i=0;i<spans.length;i++){
			if(spans.eq(i).attr("class")){
				sp_val += spans.eq(i).attr("value");
			} 
		}
		console.log(num);
		//判断答案没选中时
		if($('.bright').eq(num).find(".active").length == 0){
			tips_alert("答案为空~");
			return false;
		}
		
		
		//判断答案是否匹配
		if(sp_val == arr[num]){
			num++;
//			console.log(num);
			if(num >= 10){
				alert("恭喜答对了~");
			}else{
				$('.subject-width').css("left",-(num*iW)+'px');
			}
		}else{
			var str = String(arr[num]);     //数字转字符串
			var arr_answer = str.split('');    //字符串拆分为数组    答案
			
			
			for(var i=0;i<arr_answer.length;i++){
				$('.bright').eq(num).find("span[value="+arr_answer[i]+"]").addClass("flash");
				setTimeout(function(){
					spans.removeClass("flash");
				},1000)
			}
			
//			for(var i=0;i<spans.length;i++){
//				if(arr_answer[i] == spans.eq(i).attr("value")){
//					spans.eq(i).addClass("flash");
//					
//					setTimeout(function(){
//						spans.removeClass("flash");
//					},1000)
//				}
//				
//				
//			}

		
		}
		
		
	})
	
})
//方法：
function fct(inp,hide){
	for(var i=0;i<inp.length;i++){
		if(inp[i].checked){
			hide.val(hide.val()+inp[i].value);
		}
	}
}

// 获取url中的参数
function getUrlParam(key) {
	// 获取参数
	var url = window.location.search;
	// 正则筛选地址栏
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	// 匹配目标参数
	var result = url.substr(1).match(reg);
	// 返回参数值
	return result ? decodeURIComponent(result[2]) : null;
}

//提示弹窗：
function tips_alert(data,fn){
	$('.show-window').show();
	$('.show-content').html('');
	$('.show-content').html(data);
	$('.show-btn').off("click").on("click",function(){
		$('.show-window').hide();
		if(fn){
			location.href = fn;
		}
	})
}
