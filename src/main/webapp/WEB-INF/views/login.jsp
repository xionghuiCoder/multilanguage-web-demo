<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="resources/css/reset.css" />
<link rel="stylesheet" type="text/css" href="resources/css/login.css" />
<link rel="shortcut icon" type="image/x-icon"
	href="resources/img/favicon.ico" />
<title data-langcode="title">登陆</title>
<script type="text/javascript" src="resources/js/jquery.js"></script>
<!--需要立即的多语处理-->
<script type="text/javascript" src="resources/js/loginlanguage.js"></script>
</head>
<body>
	<div id="hiddenctl" class="wrapper">
		<div class="header">
			<h1 data-langcode="0001">通行证登陆</h1>
			<a id="chooselg" data-langcode="0002" tabindex="10">语言</a> <a
				href="javascript:void(0);" data-langcode="0009" tabindex="9">注册</a> <span
				data-langcode="0013">还没帐号，马上</span> <br class="clear" /> <br
				class="clear" />
		</div>
		<div class="content">
			<div id="primary">
				<!-- 登陆界面 -->
				<div id="lgdiv">
					<!-- 设置form的autocomplete为"on"或者"off"来开启或者关闭自动完成功能 -->
					<form id="login" action="login.action" method="post"
						autocomplete="off">
						<h3 id="logintitle" data-langcode="0003">登陆帐号</h3>
						<!--placeholder 属性提供可描述输入字段预期值的提示信息（hint），该提示会在输入字段为空时显示，并会在字段获得焦点时消失 -->
						<input id="name" type="text" name="name" maxlength="14"
							data-langcode="0004" placeholder="账号" tabindex="4" /> <br
							class="clear" />
						<!-- 这里密码不设置 maxlength是因为密码不可见，若设置 maxlength，用户输入字符超过了 maxlength时就很难弄清楚自己输入了哪些字符 -->
						<input id="pwd" type="password" name="password"
							data-langcode="0005" placeholder="密码" tabindex="5" /> <br
							class="clear" />
						<div>
							<input type="checkbox" id="rmb" name="remember" value="1"
								tabindex="6" /> <label id="rmblb" for="rmb"><a
								id="cbname" tabindex="7"><span data-langcode="0006">十天内自动登陆</span><span
									id="cbtip" data-langcode="0007">为了您的帐号安全，请不要在公共电脑上勾选此项</span></a></label>
						</div>
						<br class="clear" />
						<div id="btns">
							<!-- button是用于代替submit的，submit用于ajax请求会有bug -->
							<input id="button" type="button"
								data-langcode="0008" value="立即登陆" tabindex="8" disabled="disabled" />
						</div>
						<br class="clear" />
						<div id="lgtip" class="hiddentip">
							<span id="shape"></span><span id="lginfo"></span>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- 页脚 -->
		<div class="footer"></div>
	</div>
	<!-- 遮挡屏幕 -->
	<div id="cover" class="invisible">
		<!-- 居中 -->
		<div id="center">
			<!-- 多语选择界面 -->
			<ul id="language">
				<li><a id="closelanguage" data-langcode="0014"
					class="close">关闭</a></li>
				<li><a data-langtype="simpchn" class="invalid">简体中文</a></li>
				<li><a data-langtype="tradchn">繁體中文</a></li>
				<li><a data-langtype="english">English</a></li>
			</ul>
			<!-- 提示是否踢人界面 -->
			<div id="logintip">
				<p data-langcode="0010">该用户已登录，继续登陆将挤出已登录用户，是否继续？</p>
				<a id="logintok" data-langcode="0011">继续</a> <a
					id="logincancel" data-langcode="0012">取消</a>
			</div>
		</div>
	</div>
	<!-- 自动登录时遮挡屏幕 -->
	<div id="whitecloth" class="invisible"></div>
	<script type="text/javascript">
		// 挡住屏幕
		$("#whitecloth").attr("class", "");
	</script>
</body>
</html>
