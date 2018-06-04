<?php
	$code = $_GET['code'];//前端传来的code值
	
	$appid = "wxcec2b59d79dad401";
	$appsecret = "019c2695da81a8b82fbab80a4b2dac11";
	
	//获取openid
	$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
	
	$result = https_request($url);
	
	$jsoninfo = json_decode($result, true);
	$openid = $jsoninfo["openid"];//从返回json结果中读出openid
	
	$callback=$_GET['callback'];  
	// echo $callback."({result:'".$openid."'})"; 
	echo $openid; //把openid 送回前端
	
	function https_request($url,$data = null){
		$curl = curl_init();// 初始化一个 cURL 对象
		curl_setopt($curl, CURLOPT_URL, $url);// 设置你需要抓取的URL
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
		if (!empty($data)){
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		}
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);// 设置cURL 参数，要求结果保存到字符串中还是输出到屏幕上
		$output = curl_exec($curl);// 运行cURL，请求网页
		curl_close($curl);// 关闭URL请求
		return $output;
	}

?>