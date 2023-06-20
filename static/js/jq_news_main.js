
$(document).keydown(function(event){
	if(event.which == 37) location=pre_page;
	if(event.which == 39) location=next_page;
});
var isTouch = false;
var isDoubleTouch = false; //是否为多触点
var start = []; //存放触点坐标
var timer = null ;
var now, delta; //当前时间，两次触发事件时间差
var startPosition, movePosition, endPosition; //滑动起点，移动，结束点坐标
//事件声明
var gesturestart = new CustomEvent('gesturestart');
var gesturechange = new CustomEvent('gesturechange');
var gestureend = new CustomEvent('gestureend');
var swipeMove = new CustomEvent('swipeMove');
var doubleTouch = new CustomEvent("doubleTouch");
//监听touchstart事件
document.addEventListener('touchstart', function(e) {
	if (e.touches.length >= 2) { //判断是否有两个点在屏幕上
		isDoubleTouch = true;
		start = e.touches; //得到第一组两个点
		var screenMinPoint = getMidpoint(start[0], start[1]); //获取两个触点中心坐标
		gesturestart.midPoint = [screenMinPoint[0] - e.target.offsetLeft, screenMinPoint[1] - e.target.offsetTop]; //获取中心点坐标相对目标元素坐标
		e.target.dispatchEvent(gesturestart);
	} else {
		delta = Date.now() - now; //计算两次点击时间差
		now = Date.now();
		startPosition = [e.touches[0].pageX, e.touches[0].pageY];
		if (delta > 0 && delta <= 120) { //双击事件
			clearTimeout(timer);
			doubleTouch.position = [e.touches[0].pageX - e.target.offsetLeft, e.touches[0].pageY - e.target.offsetTop];
			//e.target.dispatchEvent(doubleTouch);
			if($(window).width()<769){
				location=next_page;
			}
		} else { //滑动事件
			timer = setTimeout(function(){ //单击事件
				//e.target.dispatchEvent(oneTouch);
			})
		}
		isTouch = true;
	}
}, false);

/*初始化YYTB*/
var initYTB=function(){
	var t='utu',u='be';
	var yts= $('.kan_book_yo'+t+u);
	if(yts.length>0){
		yts.each(function(){
			var ytb=$(this).find('div').eq(0);
			var ytb_id=ytb.attr('id').split('-')[1];
			if(ytb_id && ytb.html()==''){
				var cc1 ='yo';
				var cc3 ='be.com';
				var ifr='<iframe id="kanbookifr" frameBorder="0" allowFullScreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" width="100%" src="https://www.'+cc1+'utu'+cc3+'/embed/'+ytb_id+'?enablejsapi=1&amp;origin=https%3A%2F%2Fkanbook.net&amp;widgetid=1"></iframe>';
				ytb.html(ifr);
			}
		});
	}
}

$(function() {
	var img_load = function(o){if($(o).width()<40) {$(o).css({'margin':0,'display':'inline-block','vertical-align':'baseline'});}}

	$("#content-wrapper img").each(function (i,o){
		/* emoji 表情图片不换行 图片加载完成时执行(兼容图片缓存不触发load的问题) */
		if(o.complete&& o.src!=''){img_load(o);}
		else{$(o).on('load',function(){img_load(o);});}
	});
	$("img").lazyload({effect : "fadeIn"});

	$("iframe.lazyload").attr('src',function(){
		$(this).css({'min-width':$(this).parent().width()});
		return $(this).attr('data-src');
	});
	initYTB();
});