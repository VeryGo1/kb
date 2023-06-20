function checkboxselectall(){//全选
	$("[type='checkbox']").attr("checked",'true');
}

function checkboxunselect(){//反选
	$("[type='checkbox']").each(function(){
		if($(this).attr("checked")){
			$(this).removeAttr("checked");
		}else{
			$(this).attr("checked",'true');
		}
	 })
}

function checkboxunselectall(){//全不选
	$("[type='checkbox']").each(function(){
		$(this).removeAttr("checked");
	 })
}
function is_numeric(mixed_var){
	return(typeof(mixed_var)==='number'||typeof(mixed_var)==='string')&&mixed_var!==''&&!isNaN(mixed_var);
	}
//判断是否为空值
function trim(s){
	return s.replace(/(^\s*)|(\s*$)/g, "");
}
function number_check(val){
	 var code;
	 alert(val);
	 for (var i = 0; i < val.length; i++) {
		 //charAt()获取指定位置字符串,charCodeAt()返回该字符串的编码
			//0的ASCII是48,9的ASCII是57
		 var code = val.charAt(i).charCodeAt(0);
		 if (code < 48 || code > 57) {
			return false
		 }else {
			return true
		 }
	 }
}
function chack_number_input(id){
	var InputValue =  $('#'+id).val();
	InputValue=InputValue.replace(/\D/g,'');
	$('#'+id).val(InputValue);
}
//判断是否为整数
function isNumber(val){
	if( trim(val)=='' ){
		return false;
	}
	var str=val;
	var oneDecimal=false;
	var oneChar=0;
	str=str.toString( );
	//首位不能为小数点
	if(str.charAt(0).charCodeAt(0) == 46){
		return false;
	}
	var k = 0;
	for (var i=0; i<str.length; i++){
		oneChar=str.charAt(i).charCodeAt(0);
		// 数字只能在0和9之间
		if (oneChar < 46 || oneChar > 57 || oneChar == 47){
			return false;
		}
		//两个小数点
		if (oneChar == 46){
			k = k + 1;
		}
	}
	//两个或以上的小数点
	if( k > 1){
		return false;
	}
	return true;
}

//判断小数位数
function decimalDigits(val,checklen){
	var len=0;
	val=val.toString( );
	if(val.indexOf(".") != -1){
		len = val.split('.')[1].length;
		//alert(decimalDigits);
	}
	if( len > checklen){
		return false;
	}
	return true;
}

function copyNewsUrl(WebIDStr){
	var code =WebIDStr;
	if(code.length>0){
		if(window.clipboardData){
			window.clipboardData.clearData();
			window.clipboardData.setData("Text", code);
			alert('复制成功');
		}else if(navigator.userAgent.indexOf("Opera") != -1){
			window.location = code;
		}else if (window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch (e){
				alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
				return;
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip) return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans) return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			var copytext = code;
			str.data = copytext;
			trans.setTransferData("text/unicode",str,copytext.length*2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip) return false;
			clip.setData(trans,null,clipid.kGlobalClipboard);
			alert('复制成功');
		}
	}else{
		alert('字符为空');
	}
}

//复制广告注册效果反馈代码
function copyAdsCode(adsid){
	var code = '<!--请把以下代码放在注册成功后的(即提示注册成功的)页面，切不可放在广告页面(即注册页面)-->'+"\r\n"+'<script language="JavaScript1.1" src="http://count..com/count.php?mid=' + adsid + '"></script>';
	if(window.clipboardData){
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", code);
		alert('复制成功');
	}else if(navigator.userAgent.indexOf("Opera") != -1){
  	    window.location = code;
    }else if (window.netscape){
  	    try{
  		    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch (e){
    	    alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
			return;
        }
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
    	if (!clip) return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = code;
        str.data = copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans,null,clipid.kGlobalClipboard);
    }
}
//复制广告注册效果反馈代码
function copyWebID(WebIDStr){
	var code =WebIDStr;
	if(code.length>0){
		document.getElementById("copyidstr").innerHTML=WebIDStr;
		if(window.clipboardData){
			window.clipboardData.clearData();
			window.clipboardData.setData("Text", code);
			alert('复制成功');
		}else if(navigator.userAgent.indexOf("Opera") != -1){
			window.location = code;
		}else if (window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch (e){
				alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
				return;
			}
			var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
			if (!clip) return;
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
			if (!trans) return;
			trans.addDataFlavor('text/unicode');
			var str = new Object();
			var len = new Object();
			var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			var copytext = code;
			str.data = copytext;
			trans.setTransferData("text/unicode",str,copytext.length*2);
			var clipid = Components.interfaces.nsIClipboard;
			if (!clip) return false;
			clip.setData(trans,null,clipid.kGlobalClipboard);
			alert('复制成功');
		}
	}else{
		alert('字符为空');
	}
}
//排序
function orderby(field, descension){
  document.form1.orderBy.value = field;
  document.form1.orderValue.value = descension;
  document.form1.submit();
}
