(function() {
	var global = {
		language : {
			// 默认多语编码为简体中文
			defaultlangtype : "simpchn"
		},
		util : {},
		model : {},
		view : {},
		ctrl : {}
	};
	var p = global.language, u = global.util, m = global.model, v = global.view, c = global.ctrl;
	/* 获取cookie：通过decodeURIComponent解码 */
	u.get = function(name) {
		var cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie
				.indexOf(cookieName), cookieValue = null;
		if (cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(
					cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	}
	/* 获取cookie，通过encodeURIComponent编码是为了方便传送到服务器时可以用unicode代替空格等字符 */
	u.set = function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "="
				+ encodeURIComponent(value);
		if (expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
		}
		if (path) {
			cookieText += "; path=" + path;
		}
		if (domain) {
			cookieText += "; domain=" + domain;
		}
		if (secure) {
			cookieText += "; secure";
		}
		document.cookie = cookieText;
	}
	c.init = function() {
		// 设置多语信息
		c.setLanguageByCookie();
		// 释放屏幕
		$("#whitecloth").attr("class", "invisible");
		// 显示多语界面
		$("#chooselg").click(c.showLanguageChoose).keyup(function(event) {
			// jQuery的event对象上有一个which的属性可以获得键盘按键的键值;13:回车
			if (event.which == 13) {
				c.showLanguageChoose();
			}
		});
		// 关闭多语界面
		$("#closelanguage").click(c.hideLanguageCover).keyup(function(event) {
			// jQuery的event对象上有一个which的属性可以获得键盘按键的键值;13:回车
			if (event.which == 13) {
				c.hideLanguageCover();
			}
		});
		// 切换多语：此处过滤掉关闭按钮
		$("#language a").not($("#language a.close")).click(c.changeLanguage)
				.keyup(function(event) {
					// jQuery的event对象上有一个which的属性可以获得键盘按键的键值;13:回车
					if (event.which == 13) {
						c.changeLanguage(event);
					}
				});
	}
	/**
	 * 从cookie里面找多语类型，若没有或者多语类型无效，则使用默认的多语类型
	 */
	c.setLanguageByCookie = function() {
		var langtype = u.get("langtype");
		if (langtype == null) {
			langtype = p.defaultlangtype;
		}
		if (langtype == p.defaultlangtype) {
			// 默认语言就是当前语言，不需要翻译了
			return;
		}
		var url = "load_labellanguage.json";
		var params = {
			lang_type : langtype,
			folder_name : "01",
			file_name : "login"
		};
		// 设置不可用的多语链接
		$("#language a").each(function() {
			if ($(this).attr("data-langtype") == langtype) {
				// 设置当前链接不可用
				$(this).attr("class", "invalid");
			} else if ($(this).attr("class") == "invalid") {
				// 恢复以前不可用的链接
				$("#language a.invalid").removeClass("invalid");
			}
		});
		// 翻译label多语
		c.adjax(decodeURIComponent(url), c.setLabelLangcode, "get", params,
				false);
	}
	/*
	 * 设置label多语
	 */
	c.setLabelLangcode = function(datas) {
		var elems = document.getElementsByTagName('*');
		for (var i = elems.length - 1; i >= 0; i--) {
			var elem = $(elems[i]);
			var langcode = elem.attr("data-langcode");
			if (langcode != null) {
				var labelValue = datas[langcode];
				if (labelValue != null) {
					if ($.nodeName(elem[0], "input")) {
						if (elem.attr("type").toLowerCase() == "button") {
							elem.val(labelValue);
						} else if (elem.attr("type").toLowerCase() == "text") {
							if (elem.attr("placeholder") != null) {
								elem.attr("placeholder", labelValue);
							}
						} else if (elem.attr("type").toLowerCase() == "password") {
							if (elem.attr("placeholder") != null) {
								elem.attr("placeholder", labelValue);
							}
						}
					} else if ($.nodeName(elem[0], "img")) {
						elem.attr("alt", labelValue);
					} else {
						elem.text(labelValue);
					}
				}
			}
		}
	}
	/* 显示多语界面 */
	c.showLanguageChoose = function() {
		$("#cover").attr("class", "");
		$("#language").attr("class", "");
		$("#logintip").attr("class", "invisible");
	}
	/* 切换多语 */
	c.changeLanguage = function(event) {
		var element = $(event.target);
		if (element.attr("class") == "invalid") {
			// 点击的是当前语言时不处理
			return;
		}
		// 设置所有多语链接可用
		element.parent().parent().find(".invalid").removeClass("invalid");
		// 设置当前语言链接不可用
		element.attr("class", "invalid");
		// 获得链接的多语类型
		var langtype = element.attr("data-langtype");
		var url = "load_labellanguage.json";
		var params = {
			lang_type : langtype,
			folder_name : "01",
			file_name : "login"
		};
		// 存储多语类型
		c.setLanguageToCookie(langtype);
		// 这里用了decodeURIComponent编码
		c.adjax(decodeURIComponent(url), c.setLabelLangcode, "get", params,
				false);
		// 隐藏多语界面
		c.hideLanguageCover();
	}
	/* 隐藏蒙版界面 */
	c.hideLanguageCover = function() {
		$("#cover").attr("class", "invisible");
	}
	/* 保存多语类型至cookie */
	c.setLanguageToCookie = function(langtype) {
		// 设置失效时间为1年
		var expires = new Date();
		// expires过期时间 = 当前时间 +过期时间(秒)
		expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
		// 需要设置path使得全站点都能访问这个cookie，否则只能在当前页面或当前文件夹下的子文件才能访问该cookie
		u.set("langtype", langtype, expires);
	}

	/* 封装调用ajax过程：url为后台url，回调函数callback为响应成功将要调用的函数，method为get或post方法,datas为post的请求参数，isAsyn为同步还是异步，设置为false为同步 */
	c.adjax = function(url, callback, method, params, isAsyn) {
		// 这里meth支持两种：get和post；如果参数meth无效则默认为get
		if (!(typeof method == "string") || !method.toLowerCase() == "post") {
			method = "get";
		}
		var asyn = true;
		if ((typeof isAsyn == "boolean") && isAsyn == false) {
			asyn = false;
		}
		$.ajax({
			type : method,
			url : url,
			async : asyn,
			data : params,
			success : function(datas) {
				callback(datas);
			}
		});
	}
	$(function() {
		c.init();
	});
})();