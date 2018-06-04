$(function(){
	var divs = $(".box div");
	var spans = $(".box span");
	var arr = [];//存放位置信息；
	divs.each(function(i,ele){ //保存每个 轮播div  的数据信息
		arr[i] = {
			"width":$(ele).width(),
			"height":$(ele).height(),
			"top":$(ele).position().top,
			"left":$(ele).position().left,
			"opacity":$(ele).css("opacity"),
			"zIndex":$(ele).css("z-index")
		}
	})
	console.log(arr)
	spans.eq(0).on("click",function(){
		arr.push(arr.shift());
		move();
	})
	spans.eq(1).on("click",function(){
		arr.unshift(arr.pop());
		move();
	})
	function move(){
		divs.each(function(i,ele){
			$(ele).stop().animate({
				width:arr[i].width,
				height:arr[i].height,
				top:arr[i].top,
				left:arr[i].left,
				opacity:arr[i].opacity
			},800)
			$(ele).css("z-index",arr[i].zIndex);
		})
	}
})