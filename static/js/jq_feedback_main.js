function checkFeedBack(){
	var form_data = $("#comic_feedback").serialize();
	var question_type = $("input[name='question_type[]']:checked").val();
	var message_text = $("#message_text").val();
	var message_email = $("#message_email").val();
	if($.trim(question_type)==''){alert('請選擇問題的類型');return false;}
	else if($.trim(message_text)==''){alert('請輸入問題的詳細描述');return false;}
	else if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(message_email)){alert('您的聯繫方式格式不正确');return false;}
    var GetCookie=function(k){var C=document.cookie.match(new RegExp("(^| )"+k+"=([^;]*)(;|$)"));if(C!=null)return unescape(C[2]);return !1;};

	if(form_data.indexOf('_token')===-1){
		var csrf = GetCookie('u-csrf');
		if(!csrf){Gm.toast('网络异常,请重新刷新本页!',1,1,0,1);return;}
		form_data+='&_token='+csrf;
	}

	confirm('确定提交？') &&
	$.post('/user/feedback',
        form_data,
		function(data){
			if(data.status ==1){
				alert('提交成功, 感谢您的反馈！');
				$('#myModal').modal('hide');
			}else{
				alert(data+'提交失败 , 参数错误！');
				$('#myModal').modal('hide');
			}
		},"json"
	);
}

