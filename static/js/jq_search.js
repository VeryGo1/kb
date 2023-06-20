$(function(){
    var is_search=0;
	var placeholder={"1":"2 文字以上入力してください","3":"2자 이상 입력","4":"輸入兩個以上的字符","5":"输入两个以上的字符","6":"Enter more than two characters","7":"ป้อนอักขระมากกว่าสองตัว","14":"Entrez plus de deux caractères","15":"Geben Sie mehr als zwei Zeichen ein","17":"Introduzca más de dos caracteres","74":"Masukkan lebih dari dua karakter"};
	$('.keyword_btn').attr('placeholder',placeholder[l_id]).attr('aria-label',placeholder[l_id]);
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

		if(keyword){location.href="/"+(typeof(l_path)!='undefined'?l_path:"")+"search/"+keyword+'?token='+$token;}
		return false;
	});
});
