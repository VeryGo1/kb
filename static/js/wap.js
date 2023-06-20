define(function(){
	var Gm=window.Gm||{},doc = document;
	Gm.SetCookie=function(k,v,t){var T=new Date();T.setTime(T.getTime()+1000*t);try{doc.cookie=k+"="+escape(v)+";expires="+T.toGMTString()+";path=/";return !0;}catch(e){return !1;}};
	Gm.GetCookie=function(k){var C=doc.cookie.match(new RegExp("(^| )"+k+"=([^;]*)(;|$)"));if(C!=null)return unescape(C[2]);return !1;};
	Gm.SetFont=function(s){var b=$('.book-font-ctrl').find('button'),c=$('.book-content'),o={1:'22px',2:'18px',3:'14px'};b.removeClass('on');b.eq(s-1).addClass('on');c.css("font-size",o[s]);Gm.SetCookie("fs",s,300*86400);};
	Gm.SetLight=function(z){var s=Gm.GetCookie("ls")?Gm.GetCookie("ls"):1,l=$('.light'),b=$('body'),c=$('.book-content'),d=$('.content'),e={1:{"color":"#ddd","background":"#333"},2:{"color":"#333","background":"#ebebeb"}},f={1:{"background":"#333"},2:{"background":"#ebebeb"}},g={1:"开灯",2:"关灯"},h=$('.page-ctrl2 a'),i={1:{"background":"#666"," color":"#ddd"},2:{"background":"#aaa","color":"#fff"}};z==1?(s=s==1?2:1):'';c.css(e[s]),b.css(f[s]),d.css(f[s]),l.html(g[s]),h.css(i[s]);if(!z)Gm.SetCookie("ls",s==1?2:1,300*86400);};
	Gm.ShowSetting=function(z){$('.book-font-ctrl').toggle();};
	Gm.Guid=function(z){var s=Gm.GetCookie("gd")?Gm.GetCookie("gd"):1,h=$('.header'),se=$('.search'),m=$('.header-menu'),g=$('.guid');z==1?(s=s==1?2:1):'';s==1?(h.show(),se.show(),m.show(),g.addClass('on')):(h.hide(),se.hide(),m.hide(),g.removeClass('on'));if(!z)Gm.SetCookie("gd",s==1?2:1,300*86400);};
	Gm.SetCache=function(z){var s=Gm.GetCookie("sc")?Gm.GetCookie("sc"):1;z==1?(s=s==1?2:1):'';g=$('.loadcache'); s==1?(g.removeClass('on')):(g.addClass('on'));if(!z)Gm.SetCookie("sc",s==1?2:1,300*86400);};
	Gm.SetLocalStorage=function(k,v){if(typeof(window.localStorage)== 'undefined') return !1;var z=1;try{localStorage.setItem(k,v);}catch(e){if(e.name == 'QuotaExceededError'){localStorage.clear();try{localStorage.setItem(k,v);}catch(e){z=0;}}else{z=0;};};return !!z;};
	Gm.GetLocalStorage=function(k){if(typeof (window.localStorage)== 'undefined') return !1;try{var s=localStorage.getItem(k);if(s !=null && typeof(s)!='undefined')return s;else return !1;}catch(e){return !1;};};

	//触屏事件
	Gm.touch =function(){
		Gm.tSF=function(e){var touch=e.touches[0];var x=Number(touch.pageX);var y=Number(touch.pageY);startX=x;startY=y;EndX=x;EndY=y;};
		Gm.tMF=function(e){try{var touch=e.touches[0];var x=Number(touch.pageX);var y=Number(touch.pageY);EndX=x;EndY=y;}catch(e){console.log('touchMoveFunc：'+e.message);}};
		Gm.tEF=function(e){try{var touch=e.touches[0];var x=EndX;var y=EndY;if(EndX - startX >80){window.location.href = pre;}else if(startX - EndX >80){window.location.href = next;}}catch(e){console.log('touchEndFunc'+e.message);}};
		Gm.btE=function(){doc.addEventListener('touchstart',Gm.tSF,false);doc.addEventListener('touchmove',Gm.tMF,false);doc.addEventListener('touchend',Gm.tEF,false);};
		Gm.P=function(){try{doc.createEvent("TouchEvent");Gm.btE();}catch(e){console.log("No TouchEvent" + e.message);}};
		Gm.P();
	};

	//全局执行
	$(function(){
		//防iframe劫持
		//if (self != top){top.location = self.location;}
	});

	//书籍页加载
	Gm.book = function(){
		window['AddFav']=Gm.AddFav;
		$(function(){
			Gm.ShowBaiduShare();
			Gm.readhistory('DATA-77BOOK');
		});
	};

	//下载页加载
	Gm.download = function(){
		window['getDownload']=Gm.getDownload;
		$(function(){
			//Gm.ShowBaiduShare();
			Gm.readhistory('DATA-77BOOK');
		});
	};

	//章节页事件
	Gm.view = function(){
		window['SetLight'] =Gm.SetLight;
		window['SetFont'] =Gm.SetFont;
		window['Guid'] =Gm.Guid;
		window['AddFav']=Gm.AddFav;
		window['ShowSetting']=Gm.ShowSetting;
		window['SetCache']=Gm.SetCache;
		window['ShowNotic']=Gm.ShowNotic;
		//window['SetMarker'] =function(){};
		$(function(){
			Gm.touch();
			var s=Gm.GetCookie("fs")?Gm.GetCookie("fs"):2;
			Gm.SetFont(s);
			Gm.SetLight(1);
			Gm.Guid(1);
			Gm.SetCache(1);
			Gm.ShowBaiduShare();
			Gm.viewSelectPage();
			Gm.draploading();
		});
	};

	//添加收藏
	Gm.AddFav=function(x,s,h){
		if(s>0){
			$.getJSON("//ajax."+h+"/getAjax/",{Uid:s,action:'addFav',ID:x},function(data){
				if(data==1){
					alert('收藏成功!');
				}else if(data==2){
					alert('已收藏!');
				}else{
					alert('操作失败!');
				}
			});
		}else{
			alert('请先登录!');window.location.href='/login/';
		}
	};

	//下载
	Gm.getDownload=function(x){
		if(x>0){
			var m = (/Mac|X11|Linux|ipod|iphone|ipad/i.test(navigator.platform)) ?1:0;
			window.open("//down."+host+'/getdownload/'+Cid64+'?a='+(new Date()).getTime()+'&b='+m+'&c='+x);
		}else{
			//alert('请先登录!');
			//window.location.href='/login/';
		}
	};

	Gm.likeMore =function(x,s,h,t1,t2,t3,t4,ob){
		$.getJSON("//ajax."+h+"/ajax/LikeMore/",{Cid:x,category:t1,subtype:t2,action:'LikeMore',Num:8},function(data){
			if(data!=0){
				var s='';
				$.each(data, function(i,o){
					s+= '<li class="am-g"><a class="am-text-danger" href="/'+t3+'/" title="'+t4+'小说">['+t4+']</a>';
					s+= '<a href="/'+o.Cid+'" title="'+o.BookName+'-'+o.BookAuthor+'">'+o.BookName+'</a><a class="dark" href="/author/'+o.Uid+'" title="'+o.BookAuthor+'相关作品">('+o.BookAuthor+')</a>';
					s+= '<b class="am-icon-angle-right"></b></li>';
				});
				$(ob).append(s);
			}
		});
	};

	Gm.SetNextPage=function(){
		Pid=Pid+1;
		if(Num>Pid+1){
			next='/'+Cid64+'/'+(Pid+1)+'';$('.fa-arrow-right').attr('href',next);
			$('.viewpage option').removeAttr('selected');
			$('.viewpage').each(function(i){$(this).find('option').eq(Pid).attr('selected','selected');});
		}else{
			$('.fa-arrow-right').attr('href','javascript:ShowNotic(2);');
		}
	}

	Gm.viewContent = function(){
		var IsCache = Gm.GetCookie('sc')==false?1:Gm.GetCookie('sc');
		var nextPid = Number(Pid)+1;
		var data = Gm.GetLocalStorage('contCache-'+Cid+'-'+Pid);

		if(data.length>20){
			$('.loading').fadeOut(10,function(){
				Gm.CheckContentLength(data);
			});
		}else{
			$.get("//ajax."+host+"/ajax/ChapterContent/",{Cid:Cid,action:'ChapterContent',Pid:Pid},function(data){
				if(data!=0){
					$('.loading').fadeOut("fast",function(){
						Gm.CheckContentLength(data);
						if(IsCache==1){
							Gm.SetLocalStorage('contCache-'+Cid+'-'+Pid,data);
						}
					});
				}
			},'text');
		}
		//预加载下页内容
		if(IsCache==1 && !Gm.GetLocalStorage('contCache-'+Cid+'-'+nextPid) && Num>nextPid){
			$.get("//ajax."+host+"/ajax/ChapterContent/",{Cid:Cid,action:'ChapterContent',Pid:nextPid},function(data){
				if(data!=0){
					Gm.SetLocalStorage('contCache-'+Cid+'-'+nextPid,data);
				}
			},'text');
		}
	};

	//检查内容长度
	Gm.CheckContentLength=function(data){
		$('.book-content pre').append(Gm.autop(data));
		if(data.length < 350 && Num>Pid+1){
			Gm.SetNextPage();
			Gm.viewContent();
		}
	}

	//<select>页
	Gm.viewSelectPage=function(){
		let s='';
		let l="/"+Cid64+"/{$pages}";
		for(let i=1;i<Number(Num)+1;i++){
			s+="<option value="+l.replace('{$pages}',i-1);
			if(i-1==Pid){s+=" selected";}
			s+=">≡  第"+i+"页</option>";
		}
		$('.viewpage').html(s);
	}

	//段落转换
	Gm.autop=function(x){
		var c = '<p>' + $.trim(x) + '</p>';
		c = c.replace(/([\r\n]+)(\s)*/g,'</p><p>');
		return c;
	}

	Gm.booklistPage=function(x,p,n,e){
		p=p/e;n=n/e;
		let s='<select class="booklistpage" onchange="javascript:window.location.href=this.options[this.selectedIndex].value" name="select">';
		let l="/"+x+"/{$pages}";
		for(let i=1;i<Number(n)+1;i++){
			s+="<option value="+l.replace('{$pages}',(i-1)*Number(e));
			if(i-1==p){s+=" selected";}
			s+=">第"+i+"页</option>";
		}
		s +='</select>';
		$('.pageList').append(s);
	}

	//下拉加载
	Gm.draploading=function(){
		require(['draploading'],function(){
			new DragLoading($('.drapdown'),'down',{
				onReload: function (){
					var self = this;
					setTimeout(function (){self.origin();},300);
					window.location.href=pre;
				}
			});

			new DragLoading($('.drapup'),'up',{
				onReload: function (){
					var self = this;
					if(Num>Pid+1){
						$('.loading').show();
						Gm.SetNextPage();
						setTimeout(function(){
							//Gm.viewContent();
							self.origin();
						},500);
						window.location.href=next;
					}else{
						Gm.ShowNotic(2);
						self.origin();
					}
				}
			});
		})
	}

	Gm.ShowNotic=function(v){
		var p0 ='';
		switch(v){
			case 1 : p0='(｢･ω･)｢嘿  ~~已到达书本第一页~'; break;
			case 2 : p0='(｢･ω･)｢嘿  ~~已到达书末页~'; break;
			default: p0='正在加载,请稍候~';
		}
		var SysNotic = $('.SysNotic');
		if(SysNotic.length>0){
			SysNotic.html(p0).show().stop(true).delay(3500).fadeOut(300);
		}else{
			$('body').append('<div class="SysNotic">'+p0+'</div>');
			$('.SysNotic').show().stop(true).delay(3500).fadeOut(300);
		}
	}

	//阅读记录
	Gm.readhistory=function(k){
		var c = Gm.GetCookie(k);
		var e = eval('('+c+')');
		if(e.BookName){
			var s = '<div class="FL W100 H30"></div><div class="info">您上次正在阅读：'+e.BookName+' <a href="'+e.href+'" class="FR">继续阅读</a></div>';
			var x = doc.createElement('div'); x.innerHTML=s;
			doc.body.appendChild(x);
		}
	};

	//百度分享
	Gm.ShowBaiduShare=function(){
		window._bd_share_config={
			"common":{
				"bdSnsKey":{},
				"bdText":"",
				"bdMini":"2",
				"bdPic":"",
				"bdStyle":"0",
				"bdSize":"16"
			},"share":{}
		};
		//with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='/public/baidushare/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
	};

	return {a:a};
});
