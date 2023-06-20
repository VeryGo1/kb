$(function(){
    var is_search=0;
    $('.keyword_btn').attr('placeholder','\u8f93\u5165\u4e24\u4e2a\u4ee5\u4e0a\u7684\u5b57\u7b26').attr('aria-label','\u8f93\u5165\u4e24\u4e2a\u4ee5\u4e0a\u7684\u5b57\u7b26');
    //添加回车事件
    if(!is_search){
        $('.keyword_btn').keydown(function(event){
            if(event.which == 13 && !is_search){
                is_search=1;
                $(this).parents('div').find('.submit_btn').click();
                is_search=0;
            }
        });
    }
    $(".submit_btn").click(function(e){
        var keyword = $.trim($(this).parents('div').find('.keyword_btn').val().replace(/[~'!<>@#$%^&*()-+_=:]/g, ""));
		var $token = my_sha1(keyword);
        if(keyword){location.href="/news/search/"+keyword+'?token='+$token;}
        return false;
    });
});

