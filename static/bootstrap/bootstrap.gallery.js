var Gm=window.Gm ||{},doc=document,db=document.body;
//只能对a标签作用,className必须有show_b_img的
Gm.setSrc=function(){
	var src=Gm.galleryObj.attr('href');
	var title="词条相册 "+(Gm.galleryObj.attr('title')?" - "+Gm.galleryObj.attr('title'):'')+" <span class='my-time'>("+(Gm.currentNum(src)+1)+"/"+$('.show_b_img').length+")</span>";
	$('.PicGallery').attr('aria-labelledby',title);
	$('.modal-title').html(title);
	$('.PicGallerySrc').attr('src',src);
	$('.PicGalleryHref').attr('href',src);
}
Gm.createGalleryBox=function(){
	var loading='https://fastly.jsdelivr.net/gh/VeryGo1/kb@main/static/images/loading2.gif';
	var leftpic="https://fastly.jsdelivr.net/gh/VeryGo1/kb@main/static/images/arrows.png";
	var leftpic_css='width:49px;height:49px;position:absolute;top:50%;margin-top:-25px;z-index:999;display:none;border-radius:50%;';
	var c='<div class="modal fade PicGallery" id="PicGallery" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">' +
		'<div class="modal-dialog modal-dialog-centered modal-xl" role="document">' +
		'<div class="modal-content"><div class="modal-header">' +
		'<h5 class="modal-title" id=""></h5>' +
		'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' +
		'<div class="modal-body p-0 m-0 text-center position-relative" style="background:#efefef url('+loading+') center center no-repeat; min-height:80px;">' +
		'<a href="javascript:;" class="PicGalleryLeft" style="'+leftpic_css+'left:5px;background:url('+leftpic+') no-repeat 0 0"></a>'+
		'<a href="javascript:;" class="PicGalleryRight" style="'+leftpic_css+'right:5px;background:url('+leftpic+') no-repeat 100% 0"></a>'+
		'<img class="PicGallerySrc" src="'+loading+'" style="max-width:100%"></div>' +
		'<div class="modal-footer">' +
		'<a class="btn-primary btn PicGalleryHref" type="button" href="'+loading+'" target="_blank">查看源图</a>' +
		'<button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>' +
		'</div></div></div></div>';
	$('body').append(c);
	var list_num = $('.show_b_img').length;
	if(list_num>1){$('.PicGalleryLeft').show();$('.PicGalleryRight').show();}
	$('.PicGalleryLeft').click(function(){
		var j=Gm.currentNum(Gm.galleryObj.attr('href'))-1;
		var i=j<0?list_num-1:j;
		Gm.galleryObj=$('.show_b_img').eq(i);
		Gm.setSrc();
	});
	$('.PicGalleryRight').click(function(){
		var j=Gm.currentNum(Gm.galleryObj.attr('href'))+1;
		var i=j>=list_num?0:j;
		Gm.galleryObj=$('.show_b_img').eq(i);
		Gm.setSrc();
	});
}
Gm.currentNum=function(src){
	for (var i=0;i<$('.show_b_img').length;i++){
		if($('.show_b_img').eq(i).attr('href')==src)return i;
	}
}
$('.show_b_img').click(function(){
	if($('.PicGallery').length==0){Gm.createGalleryBox();}
	Gm.galleryObj=$(this);
	$('#PicGallery').modal('show');
	Gm.setSrc();
	return false;
});