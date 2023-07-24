var host_str = document.domain;
//if(top != self){top.location.href = location.href;}
Gm.is_zh = $.inArray(l_id+'',['4','5'])!==-1;
//返回定长的随机数
Gm.randInt=function(l) {
	var s = "0123456789",c = '',i, r;
	for (i = 0; l > i; i ++ ) {
		r = Math.floor(Math.random() * s.length);
		c += s.charAt(r)
	}
	return c
}

//保存浏览记录 3600*24*30=2592000
Gm.SaveReadHistory=function(k,path='/',expires=2592000){
	var c = Gm.GetCookie(k);
	var res = eval('('+c+')')||[];
	var d= new Date();
	Gm.time0 = d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
	var new_row = {'id':comic_id,'href':path+comic_id+'/'+version_id+'/'+part_id,'name':comic_name+' '+part_name,'time':Gm.time0}
	var new_res=[];
	new_res.push(new_row);
	for (let i in res){
		if(res[i].id!=comic_id){
			new_res.push(res[i]);
		}
		if(i>8) break;
	}
	//console.log(new_res);
	Gm.SetCookie(k,JSON.stringify(new_res),expires);
};


//阅读记录
Gm.GetReadHistory=function(k,dom){
    var c = Gm.GetCookie(k);
    var e = eval('('+c+')');
    if($(dom)){
        var s='<a class="dropdown-item d-block bg-light" href="#"><i class="list_style_01"></i>暂无阅读记录</a>';
        if(e.length>0){
            s='';
            for (let i in e){
                s+='<a class="dropdown-item d-block bg-light mb-2" href="'+e[i].href+'" title="'+e[i].name+'"><i class="list_style_01"></i>'+e[i].name.substr(0,16)+'</a>';
            }
            s += '<div class="dropdown-divider"></div><a class="dropdown-item d-inline d-block bg-light clearReadHistory" href="#"><i class="fa fa-trash mr-1"></i>清空阅读记录</a>';
        }
        $(dom).html(s);
    }
};
//清空阅读记录
Gm.ClearReadHistory=function(){
	Gm.SetCookie('comic_read_history','{}',-1);
}
//删除指定阅读记录
Gm.removeReadHistory=function(k,id,expires=2592000){
	var c = Gm.GetCookie(k);
	var res = eval('('+c+')')||[];
	var new_res=[];
	for (var i in res){
		if(res[i].id!=id){
			new_res.push(res[i]);
		}
		if(i>8) break;
	}
	Gm.SetCookie(k,JSON.stringify(new_res),expires);
}




Gm.gotoTop2=function(){
	var s='<div id="go-btn" class="go-btn"><div id="to-menu"  style="display:none;">';

	//alert( [pre_part.indexOf('java')==-1, pre_part])
	if(typeof pre_part!='undefined'  && pre_part)s+='<a href="'+(pre_part?pre_part:'javascript:ShowNotic(4)')+'" title="'+(Gm.is_zh?'上一章':'pre chapter')+'" class="bs-go-tip"><span class="go-prev"><i class="fa fa-arrow-left"></i></span></a>';
	if(typeof next_part!='undefined' && next_part)s+='<a href="'+(next_part?next_part:'javascript:ShowNotic(3)')+'" title="'+(Gm.is_zh?'下一章':'next chapter')+'" class="bs-go-tip"><span class="go-next"><i class="fa fa-arrow-right"></i></span></a>';

	if($('.paginationSetting').length>0){
		s+='<a href="/'+l_path+'comic/'+comic_id+'" title="'+(Gm.is_zh?'返回目录':'return to directory')+'" class="bs-go-tip"><span class="go-article-homepage"><i class="fa fa-navicon"></i></span></a>';
		if(typeof (author_link)!='undefined'){s+='<a href="'+author_link+'" title="'+(Gm.is_zh?'作者主页':'author page')+'" class="bs-go-tip" target="_blank"><span class="go-author-homepage"><i class="fa fa-vcard"></i></span></a>';}
	}


	s+='<div class="go-search-box position-relative"><input type="text" name="keyword_btn" value="" class="keyword_btn position-absolute" placeholder="search..."><span class="go-search submit_btn bs-go-tip sidebar-animate-circles"  title="'+(Gm.is_zh?'搜索':'search')+'"><i class="fa fa-search"></i><div class="animated-circles"> <div class="circle c-1"></div> <div class="circle c-2"></div> <div class="circle c-3"></div></div></span></div>';


	if(Gm.is_pc())s+='<a href="javascript:;" class="go-qrcode "><span><i class="fa fa-qrcode"></i></span></a>';

	if($('.feedback').length>0)s+='<a href="javascript:;" onclick="$(\'.to-show\').click()" title="'+(Gm.is_zh?'报错':'report error')+'" data-toggle="modal" data-target="#myModal" class="bs-go-tip"><span class="go-info"><i class="fa fa-info-circle"></i></span></a>';

	s+='<span class="go-top bs-go-tip" style="line-height:35px;" title="'+(Gm.is_zh?'到顶部':'goto top')+'"><i class="fa fa-chevron-up"></i></span>';
	s+='<span class="go-bottom bs-go-tip" title="'+(Gm.is_zh?'到底部':'goto bottom')+'"><i class="fa fa-chevron-down"></i></span>';
	s+='</div>';
	s+='<div id="to-btn">';
	s+='<span class="to-show" style="transform: rotate(0deg); background: rgba(0,0,0,0.3); transition: all 0.3s ease 0s;"><i class="fa fa-plus"></i></span>';
	s+='</div></div>';
	Gm.append(s,"at-go");
	if(Gm.is_pc())$('.bs-go-tip').tooltip({offset:"0,5",trigger:'hover',placement:'left',animation:true});

	var go_search_key=$('.go-search-box .go-search');
	var go_search_input=$('.go-search-box .keyword_btn');
	var go_search_animated_circles=$('.go-search-box .sidebar-animate-circles');
	var hideSearch=function(){
		go_search_input.animate({width:'0'},100,function(){go_search_input.hide();});
		go_search_key.css({'background':''});
		go_search_key.data('t',0);
		if(Gm.gotoTop_search_si){
			if(Gm.gotoTop_search_si){
				clearInterval(Gm.gotoTop_search_si);
				Gm.gotoTop_search_si=null;
			}
			go_search_animated_circles.removeClass('animated').removeClass('active');
		}
	}
	//显示
	var showSearch=function(){
		go_search_input.show().animate({width:'200px'},100,function(){go_search_input.focus()});
		go_search_key.css({'background':'rgba(240,0,0,0.8)'});
		go_search_animated_circles.addClass('active');
		Gm.gotoTop_search_si=Gm.gotoTop_search_si||null;
		if(!Gm.gotoTop_search_si)Gm.gotoTop_search_si = setInterval(function(){go_search_animated_circles.toggleClass('animated');},2800);
	}
	//是否正在处理失焦事件
	var is_blur=0;
	//搜索按钮被点击
	go_search_key.on('click',function(){
		var is_show = go_search_key.data('t')||0;
		if(is_show==1 && go_search_input.val()==''){hideSearch();if(is_blur==1)is_blur=0;return;}
		if(is_show==0){go_search_key.data('t',1);}
		showSearch();
	});
	//失焦 失焦优先于点击事件
	go_search_input.blur(function(){
		var is_show = go_search_key.data('t')||0;
		is_blur=1;
		if(is_show==1 && go_search_input.val()==''){
			setTimeout(function(){if(is_blur==1){hideSearch();}},250)
		}
	});


	var qrcode='<div class="pt-4 px-2 position-relative">';
	qrcode+='<p class="pl-2 text-left"><div class="go-qrcode-content qrcode-content bg-light d-inline-block px-2 pt-2 pb-1"></div></p>';
	qrcode+='<div class="w-100 mt-0 mb-3 hr0" style="border-bottom: 1px dashed #666"></div>';
	qrcode+='<p class="">&nbsp;'+(Gm.is_zh?'用手机扫描二维码':'Scan the QR code with your phone')+'</p>';
	qrcode+='<p class="">&nbsp;'+(Gm.is_zh?'把本页扫到手机上继续阅读':'Scan this page to your phone to continue reading')+'</p>';
	qrcode+='<div class="w-100 mt-0 mb-3 hr0" style="border-bottom: 1px dashed #666"></div>';
	qrcode+='<a href="javascript:;" class="text-white position-absolute text-decoration-none d-inline-block p-0 m-0" style="top:6px; right:3px; font-size:18px; line-height:16px; width:18px; height:18px;" onClick="$(\'.go-qrcode\').tooltip(\'hide\')"><i class="fa fa-times-circle tip-close"></i></a>';
	qrcode+='</div>';


	$('.go-qrcode').tooltip({

		offset:"0,5", //偏移量
		html:true,
		placement:'left',
		title:qrcode,
		trigger:'hover click'
	});

	//模式0:43~62,模式1:53~78,模式2:25~34,模式3:33~46
	$('.go-qrcode').on('shown.bs.tooltip', function () {
		var url0 = window.location.href, mode=3,url1='';
		console.log(url0,url0.length);
		var len= url0.length;
		if(len<25){
			mode=2;
			var diff = 23 - len;
			url1 = url0.indexOf('?')===-1?url0+'?f=qrcode'+Gm.randInt(diff):url0+'&f=qrcode'+Gm.randInt(diff);
		}
		if(url1==='' && len<34){mode=2;url1=url0}
		if(url1==='' && len<46){mode=3;url1=url0}
		if(url1==='' && len<62){mode=0;url1=url0}
		if(url1==='' && len<78){mode=1;url1=url0}
		if(url1===''){url1=url0;}

		//生成二维码
		$('.go-qrcode-content').qrcode({width: 99,height: 99,text: url1,
			background:'rgba(255,255,255,0.15)',
			foreground :'rgba(0,0,0,1)' ,
			correctLevel:mode});
	});





	$(".go-top").click(function () {
		$('html, body').animate({scrollTop: 0},100);
		return false;
	});
	$(".go-bottom").click(function () {
		$('html, body').animate({scrollTop: $(document).height()},100);
		//Gm.gotoTopHide();
		return false;
	});

	Gm.gotoTopShow=function(){
		$('#to-btn span').css({
			'-webkit-transform': 'rotate(45deg)',
			'-moz-transform': 'rotate(45deg)',
			'transform': 'rotate(45deg)',
			'background': 'rgba(193,9,9,0.5)',
			'transition' : '.3s'
		});
		$("#to-menu" ).show();
	};
	Gm.gotoTopHide=function(){
		$('#to-menu').hide();
		$('#to-btn span').css({
			'-webkit-transform': 'rotate(0deg)',
			'-moz-transform': 'rotate(0deg)',
			'transform': 'rotate(0deg)',
			'background': 'rgba(0,0,0,0.3)',
			'transition' : '.3s'
		});
		$('#to-btn span i').addClass('fa-plus').removeClass('fa-times');
	};


	$('.to-show').on('click', function () {
		//alert();
		var is_visible = jQuery('#to-menu').is(":visible");
		if(!is_visible){
			Gm.gotoTopShow();
		} else {
			Gm.gotoTopHide();
		}
	});
}

//登录
Gm.ShowLogin=function(){
	var str = '<style>.msg{ position:absolute;right:10px; bottom:4px;}</style><div class="modal fade loginModal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" ><div class="modal-dialog modal-dialog-centered" style="max-width:400px"><div class="modal-content"><div class="modal-header"><h4 class="modal-title" id="myModalLabel">'+(Gm.is_zh?'用户登录':'User login')+'</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div><div class="modal-body"><form id="gm-login"><div class="position-relative"><p>'+(Gm.is_zh?'您的邮箱':'your mailbox')+'：</p><input type="email" class="form-control" id="username" name="username" placeholder="@email.com" maxlength="35"><span class="username_msg msg"></span></div><div class="mt-2"><p>'+(Gm.is_zh?'您的密码':'your password')+'：</p><input type="password" class="form-control password1" id="password1" name="password1" placeholder="" maxlength="20"></div><div class="mt-4 position-relative float-left"><input type="text" class="form-control passcode1 m-0" id="passcode1" name="passcode1" placeholder="'+(Gm.is_zh?'验证码':'verification code')+'" maxlength="4"  style="width:120px !important;"><span class="passcode1_msg msg"></span><a href="javascript:;" onclick="$(this).find(\'img\').attr(\'src\',\'/user/security_img?v=\'+Math.random());" class="position-absolute border p-0" style="left:130px;bottom:0px;"><img src="/user/security_img?v="'+Math.random()+' height="34"></a></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default border" data-dismiss="modal">'+(Gm.is_zh?'关闭':'close')+'</button><button type="submit" class="btn btn-primary btn-login">'+(Gm.is_zh?'确认登录':'Confirm login')+'</button></div></div></div></div><script type="text/javascript" src="/static/verify/js/login.js"></script>';
	if($(".loginModal").length==0)$('body').append(str);
	$('#loginModal').modal('show');
}






//全局
$(function() {

	Gm.gotoTop2();


	//去掉UC的TIP提示和底部的广告
	var checkCount = 20;
	Gm.rmUCTip=function(){
		//console.log(checkCount);
		//if($("iframe").length>0){$("iframe").parent().remove();$("iframe").remove();}
		//if(checkCount>0){checkCount--;setTimeout(function(){Gm.rmUCTip();}, 1000);}
        //$(document).scroll(function(){if($("iframe").length>0){$("iframe").parent("div").remove();$("iframe").remove();}});
		//return ;
	};

	//Gm.rmUCTip(); //

	//feedback
	var u_email = Gm.GetCookie('u_email')||'';
	var str = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h4 class="modal-title" id="myModalLabel">'+(Gm.is_zh?'遇到了問題，沒關係，請報錯給我們':'Encountered a problem, it\'s okay, please report an error to us')+'</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div><div class="modal-body"><form id="comic_feedback"><div class=""><p>'+(Gm.is_zh?'請選擇問題的類型':'Please select the type of question')+'：</p><ul class="tags m-0 p-0 w-100 float-left"><li><label><input type="checkbox" value="漫畫要更新啦" name="question_type[]"> '+(Gm.is_zh?'漫畫要更新啦':'Comics to be updated')+'</label></li><li><label><input type="checkbox" value="圖片不顯示" name="question_type[]"> '+(Gm.is_zh?'圖片不顯示':'picture not showing')+'</label></li><li><label><input type="checkbox" value="簡介有誤" name="question_type[]"> '+(Gm.is_zh?'簡介有誤':'Introduction is wrong')+'</label></li><li><label><input type="checkbox" value="章節錯誤" name="question_type[]"> '+(Gm.is_zh?'章節錯誤':'Chapter error')+'</label></li><li><label><input type="checkbox" value="章節內圖片順序錯誤" name="question_type[]"> '+(Gm.is_zh?'章節內圖片順序錯誤':'The pictures in the chapter are in the wrong order')+'</label></li></ul></div><div class=""><p>'+(Gm.is_zh?'請輸入問題的描述':'Please enter a description of the problem')+'：<span class="my-time">'+(Gm.is_zh?'請輸入問題的詳細描述，以方便我們解決問題。您最多可輸入200字。':'Please enter a detailed description of the problem so that we can solve it. You can enter up to 200 characters.')+'</span></p><textarea class="form-control" id="message_text" maxlength="200" name="message_text" placeholder="..." ></textarea></div><div class="mt-2"><p>'+(Gm.is_zh?'您的聯繫方式':'your contact details')+'：<span class="my-time">'+(Gm.is_zh?'留下您的郵箱，方便客服與您解決問題。':'Leave your email address so that the customer service can solve the problem with you.')+'</span></p><input type="email" class="form-control" value="'+u_email+'" id="message_email" name="message_email" placeholder="@email.com" maxlength="35"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default border" data-dismiss="modal">'+(Gm.is_zh?'关闭':'close')+'</button><button type="submit" class="btn btn-primary" onclick="checkFeedBack()">'+(Gm.is_zh?'确认提交':'confirm submission')+'</button></div></div></div></div><script type="text/javascript" src="/static/js/jq_feedback_main.js"></script>';
	if($(".feedback").length>0)$(".feedback").append(str);






	//获取浏览记录
	$('.getReadHistory').click(function(){
	    //alert(0);
        Gm.GetReadHistory('comic_read_history','.ReadHistoryContent');
    });

	//清空浏览历史
    if($('body').on)$('body').on('click','.clearReadHistory',function(e){
		Gm.ClearReadHistory();
    });

    //日志
    console.log(Gm.GetCookie('t-wait'));
});