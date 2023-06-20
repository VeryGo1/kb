var CanvasLib = {
	createNew: function(){
		var canvaslib = {};
		/*  
			文字自动换行
		*/
		canvaslib.autoBreakByCharNums = function( ctx, text, x, y, maxwords, lineheight ){
			if( !text && typeof text!='string' && text.constructor!=String ){
				return;
			}
			for(var i = 0; _getTrueLength(text) > 0; i++){
				var tl = _cutString(text, maxwords);
				ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), x, y + i * lineheight );
				text = text.substr(tl);
			}
			//获取字符串的真实长度（字节长度）
			function _getTrueLength(str){
				var len = str.length, truelen = 0;
				for(var x = 0; x < len; x++){
					if(str.charCodeAt(x) > 128){
						truelen += 2;
					}else{
						truelen += 1;
					}
				}
				return truelen;
			}
			//按字节长度截取字符串，返回substr截取位置
			function _cutString(str, leng){
				var len = str.length, tlen = len, nlen = 0;
				for(var x = 0; x < len; x++){
					if(str.charCodeAt(x) > 128){
						if(nlen + 2 < leng){
							nlen += 2;
						}else{
							tlen = x;
							break;
						}
					}else{
						if(nlen + 1 < leng){
							nlen += 1;
						}else{
							tlen = x;
							break;
						}
					}
				}
				return tlen;
			}
		}
		
		
		canvaslib.breakByWidth = function( ctx, text, x, y, width, lineHeight, writeMode ){
		 	if( !text && typeof text!='string' && text.constructor!=String ){
				return;
			}
		 	if( !width ){
		 		ctx.fillText( text, x, y );
		 		return;
		 	}
		 	var t = ctx.measureText("鞭"); 	

		 	// 默认行高为字体高度+6
		 	var margin = 6;
		 	var lineHeight = lineHeight != undefined ? lineHeight : t.width + margin;
		 	// 若writeMode为false，则并不真的绘制文字，仅仅返回测算后的文字高度
		 	var write = writeMode !== undefined && writeMode === false ? false : true;

		 	// 换行分解文字，压入数组
		 	var arr = [];
		 	// 过滤html标签
		 	text = _parseHTMLtags( text );
		 	if( text.indexOf( "[break]" ) ){
		 		// 处理强制换行
			 	var text_broke = text.split( "[break]");

			 	for (var l = 0; l < text_broke.length; l++) {
			 		var this_line = text_broke[l];

			 		for( var i = 0; ctx.measureText( this_line ).width > 0; i++ ){
			 			// 截字
				 		var str = _cutStr( ctx, this_line, width );
				 		// 压入
				 		arr.push( str );
				 		// 去掉已处理的文字
				 		this_line = this_line.replace( str, "" );
				 	}	 	
			 	};
			}else{
			 	arr.push( text );
			}

			// 总高度
			var total_height = arr.length * lineHeight - margin;
			// 计算合适的摆放位置; 绘制的时候一律使用顶部对齐
			if( ctx.textBaseline.toLowerCase() == 'top'){
			 	// 若顶部对齐，则y坐标不变
			 	var y_pos = y;
			}else if( ctx.textBaseline.toLowerCase() == 'middle' ){
			 	// 中部对齐，则实际上应该对齐多行文字块的中部
			 	var y_pos = y - total_height / 2;
			}else if( ctx.textBaseline.toLowerCase() == 'bottom' ){
			 	// 底部对齐，则实际上应该对齐多行文字块的底部
			 	var y_pos = y - total_height;
			}else{
				var y_pos = y;
			}
			
			// 若是写入模式，则绘制
			if( write ){
				ctx.save();
				ctx.textBaseline = 'top';

			 	for (var i = 0; i < arr.length; i++) {

			 		ctx.fillText( arr[i], x, y_pos + i*lineHeight)
			 	}
			 	ctx.restore();
			}

		 	return total_height;

			function _parseHTMLtags( str ){

				// str = str.toLowerCase();

				// 替换定义的标签
				str = str.replace( /<p>/ig, "" );
				str = str.replace( /<\/p>/ig, "[break]" );
				str = str.replace( /<br>/ig, "[break]" );
				str = str.replace( /<br \/>/ig, "[break]" );
				str = str.replace( /<br\/>/ig, "[break]" );
				
				//去除HTML tag
				str = str.replace(/<\/?[^>]*>/g,''); 

				return str;
			}
			//按字符宽度截取字符串，返回截取的字符串
			function _cutStr(  ctx, str, width ){
				// var len = str.length, tlen = len, nlen = 0;
				// var width = ctx.measureText( str );

				if( str.length > 1 ){

					// 逐字符遍历
					for(var x = 1; x <= str.length; x++){
						
						// 判断当前字符位置是否超宽
						var thisWidth = ctx.measureText( str.substr( 0, x) ).width;
						if( thisWidth > width ){
							/* 
								按预设规则截字
							*/
							return _cutStrMax( str.substr( 0, x) );
						}

					}
				}	
				return str;
			}
			 
			// 选择最右侧的位置截断文本
			function _cutStrMax( str ){

				// 从倒数一个字符开始遍历
				for( var x = str.length-1; x > 0; x-- ){

					// 测试最末两个字符，看是否允许截断
					if( _isCutPoint( str.substr( x-1, 1 ),  str.substr( x, 1 ) ) ){
						return str.substr( 0, x );
					}
				}
				// 若没有截断点则完整返回
				return str;
			}
			// 判断两个字符是否允许截断，true为允许
			function _isCutPoint( char1, char2 ){

				// 字符2是特定中文半角标点
				if( /^，|。|、|：|“|？|！|‘|…+$/.test( char2 ) ){
					return false;
				}
				// 字符2是特定英文标点
				if( /^\,|\:|\.|\?|\!+$/.test( char2 ) ){
					return false;
				}
				//都是英文和数字
				if( /^[A-Za-z0-9]+$/.test( char1 ) && /^[A-Za-z0-9]+$/.test( char2 ) ){
					return false;
				}

				return true;

			}
		}
		canvaslib.resLoad = function( resList, func, to, remoteImgs ){
			// 延时等待基础资源加载
			var check = setInterval( _checkRes, 100 );
			var timer = setInterval( _alarm, 100 );
			var timeout = typeof(arguments[2]) !== 'undefined' ? parseInt(to) : 5000;
			var timepast = 0;
			var state = 0;

			// 加载资源	
			for ( var res in resList ){
				_load( resList[res], function (){
					state++;
				});
			}

			function _load( url, func ){
				var img = new Image(); //创建一个Image对象，实现图片的预下载

				// 判断图片是否跨域
				// if( canvaslib.isCrossDomain(url) ){
				if( 1 == 2 ){
					var ajax = new AjaxDO();
					ajax.abort();
					// ajax.setOnReadyStateChange(__base64); 
					if( window.location.host != "localhost" && window.location.host != '127.0.0.1' && window.location.host.indexOf("192.168") != 0 ){	
						ajax.Open("GET", "http://tool.pentaq.com/survey/CorsImg?src="+url, false); //同步模式
					}else{
						ajax.Open("GET", "img2base64.php?src="+url, false); //同步模式
					}
					ajax.Send("");
					var base64 = ajax.getResponseText("TEXT");
					img.src = base64;
					// 把替换的base64图片编码放到一个全局对象中，以便查询
					if( remoteImgs != undefined ){
						remoteImgs[url] = base64;
					}
					func.call(img);//将回调函数的this替换为Image对象  
					return;
					
				}else{
					if( canvaslib.isCrossDomain(url) && canvaslib.isLocal(url) == false ){
						img.crossOrigin = "anonymous";
					}
					img.src = url;

					if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数  

					func.call(img);  
						return; // 直接返回，不用再处理onload事件  
					}  
					img.onload = function () { //图片下载完毕时异步调用callback函数。  

						func.call(img);//将回调函数的this替换为Image对象  
						return;
					};
				}
				  
			}

			function _checkRes(){
				var length = 0;
				for ( var res in resList ){
					length++;
				}
				if( state >= length ){
					clearInterval(check);
					clearInterval(timer);
					func.call(); 
				}
			}
			//超时警报
			function _alarm(){		
				timepast += 100; 
				// alert(timepast + " , " + timeout );
				if( timepast >= timeout ){
					clearInterval(check);
					clearInterval(timer);

					var not_load_list = [];
					for( var res in resList ){
						var img = new Image();
						img.src = resList[res];

						if( img.complete ){
							continue;
						}else{					
							not_load_list.push( resList[res] );
						}
					}
					alert( "以下资源未能加载：\n\r" + not_load_list.join( "\n\r" ) );
					func.call(); 			
				}		
			}
		}
		// 加载图片
		canvaslib.loadImg = function( src ){
			var img = new Image();
			if( canvaslib.isCrossDomain(src) && canvaslib.isLocal() == false ){
				img.crossOrigin = "anonymous";
			}
			img.src = src;

			return img;
		}
		// 将跨域图片替换成base64编码
		canvaslib.parseRemoteImg = function( src, remoteImgs ){
			if( canvaslib.isCrossDomain(src) && canvaslib.isLocal() == false ){
				if( remoteImgs[src] != undefined && remoteImgs[src] != null && remoteImgs[src] != "" ){
					return remoteImgs[src];
				}else{
					return false;
				}
			}else{
				return src;
			}
		}
		// 判断是否跨域
		canvaslib.isCrossDomain = function(url){
			if( url == "" || url == null || url.indexOf("/") == 0 ){
				return false;
			}
			var pattern = /^(?:(\w+):\/\/)?(?:(\w+):?(\w+)?@)?([^:\/\?#]+)(?::(\d+))?(\/[^\?#]+)?(?:\?([^#]+))?(?:#(\w+))?/;
			var host = pattern.exec(url)[4];
			if( host.indexOf(".") != -1 && window.location.host != host ){
				return true;
			}else{
				return false;
			}
		}
		// 是否本地
		canvaslib.isLocal = function(){
			if( window.location.host != "localhost" && window.location.host != '127.0.0.1' && window.location.host.indexOf("192.168") != 0 ){
				return false;
			}else{
				return true;
			}
		}
		canvaslib.saveImg = function( id, type, filename ){
			var canvas = document.getElementById( id );
			var type = arguments[1] ? arguments[1] : 'png';
			switch( type.toLowerCase() ){
				case 'png' :
					Canvas2Image.saveAsPNG(canvas, filename + '.png');
					break;
				case 'jpg' :
					Canvas2Image.saveAsJPEG(canvas, filename+ '.jpg');
					break;
				case 'bmp' :
					Canvas2Image.saveAsBMP(canvas, filename+ '.bmp');
					break;
				default:
					Canvas2Image.saveAsPNG(canvas, filename+ '.png');
					break;
			}	
		}
		//灰度
		canvaslib.grayFilter = function( img ){
			var canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			// alert( img.width + " , " + img.height );
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);

			var canvasData = ctx.getImageData(0, 0, img.width, img.height);  
			// gray filter    
			for ( var x = 0; x < canvasData.width; x++) {    
				for ( var y = 0; y < canvasData.height; y++) {    

					// Index of the pixel in the array    
					var idx = (x + y * canvasData.width) * 4;    
					var r = canvasData.data[idx + 0];    
					var g = canvasData.data[idx + 1];    
					var b = canvasData.data[idx + 2];
					var a = canvasData.data[idx + 3];

					// calculate gray scale value    
					var gray = .299 * r + .587 * g + .114 * b;

					// assign gray scale value    
					canvasData.data[idx + 0] = gray; // Red channel    
					canvasData.data[idx + 1] = gray; // Green channel    
					canvasData.data[idx + 2] = gray; // Blue channel    
					canvasData.data[idx + 3] = a==0 ? 0 : 255; // Alpha channel    				
				}
			}    
			ctx.putImageData(canvasData, 0, 0); // at coords 0,0
			var image = new Image();
			image.src = canvas.toDataURL("image/png");
			return image;
		}
		canvaslib.getBase64Image = function(src) {
		    var canvas = document.createElement("canvas");
		    var img = new Image();
		    img.crossOrigin = '';
		    img.src = src;
		    canvas.width = img.width;
		    canvas.height = img.height;
		    var ctx = canvas.getContext("2d");
		    ctx.drawImage(img, 0, 0, img.width, img.height);
		    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
		    var dataURL = canvas.toDataURL("image/"+ext);

		    return dataURL;
		}
		/*--------------------------------
				画圆弧
				ctx: 画布对象
				x, y: 中心坐标
				r: 外圈半径
				w: 圆弧宽度，若w=r则相当于画饼图
				starPoint: 起始百分比,小数
				endPoint: 终止百分比,小数
				color: 颜色

		--------------------------------*/
		canvaslib.arc = function ( ctx, x, y, r, w, starPoint, endPoint, color ){
			ctx.save();
			var endAngle = endPoint*360;
			var startAngle = starPoint*360;
			
			ctx.globalAlpha = 1;
			
			ctx.beginPath();
			//顺时针画内圈线条
			ctx.arc( x, y, r-w, (270 + startAngle) * Math.PI / 180,  ( 270 + endAngle ) * Math.PI / 180, false);
			// 内圈终点对应的外圈坐标
			var outer = canvaslib.getVertex( x, y, r, endAngle, 1);
			// 画线到外圈
			ctx.lineTo( outer.x, outer.y );
			// 逆时针画外圈
			ctx.arc( x, y, r, (270 + endAngle) * Math.PI / 180, (270 + startAngle) * Math.PI / 180, true);
			// 内圈起点坐标
			var inner = canvaslib.getVertex( x, y, r-w, startAngle, 1);
			// 反向画线回内圈
			ctx.lineTo( inner.x, inner.y );
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.restore();				
		}
		/*--------------------------------
				圆角矩形
				ctx: 画布对象
				x, y: 中心坐标
				width, height: 宽/高
				radius: 圆弧角度
				fillColor: 填充颜色
				strokeColor: 线条颜色

		--------------------------------*/
		canvaslib.roundedRect = function(ctx, x, y, width, height, radius, fillColor, strokeColor) {
			function roundedRect(ctx, x, y, width, height, radius) {
				if (width> 0){
					ctx.moveTo(x + radius, y);
				}else{
					ctx.moveTo(x - radius, y);
				}
				ctx.arcTo(x+width, y, x + width, y+height, radius);
				ctx.arcTo(x+width, y + height, x, y+height, radius);
				ctx.arcTo(x,y+height, x, y, radius);
				if(width> 0) {
					ctx.arcTo(x, y, x+radius, y, radius);
				}else{
					ctx.arcTo(x, y, x-radius, y, radius);
				}
			}
			ctx.beginPath();
			roundedRect(ctx, x, y, width, height, radius);
			ctx.strokeStyle = strokeColor;
			ctx.fillStyle = fillColor;
			ctx.stroke();
			ctx.fill();
		}
		/*--------------------------------
				计算特定角度下相对于原点的坐标
				x, y: 中心坐标
				r: 半径
				angel: 角度, 0度在12点位置
				percet: 所需坐标点在半径上的百分比

		--------------------------------*/
		// 
		canvaslib.getVertex = function( x, y, r, angle, percet ){
			var vertex = { x: x + r * percet * Math.cos( (90-angle)* Math.PI / 180), y: y - r *  percet * Math.sin( (90-angle)* Math.PI / 180) };
			return vertex;
		}
		return canvaslib;
	}

};
// requestAnimationFrame封装
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();