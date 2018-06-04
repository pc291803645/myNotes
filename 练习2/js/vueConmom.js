window.onload = function(){
	Vue.component("navbar", {
		template: '<ul class="navbar-nav">' +
			'<li><a href="#">首页</a></li>' +
			'<li><a href="#">产品体验</a></li>' +
			'<li><a href="#">服务介绍</a></li>' +
			'<li><a href="#">关于我们</a></li>' +
			'</ul>'
	})
	new Vue({
		el: "#nav"
	})
}
