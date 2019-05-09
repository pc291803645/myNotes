function GetQueryStr(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function getCurrentUrl() {
	var urls = encodeURIComponent(location.href.split("?")[0]);
	return urls;
}

function setStorage(name, value) {
	localStorage.setItem(name, value);
}

function getStorage(name) {
	return localStorage.getItem(name);
}

function delStorage(name) {
	return localStorage.removeItem(name);
}

function loading(bool){
	var html = '<div class="loading"></div>';
	if(bool){
		$("body").append(html);
	}else{
		if(Boolean($(".loading").length)){
			$(".loading").remove();
		}
	}
}
