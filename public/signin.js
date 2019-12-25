$('.btn').click(function(){
    var btnId = '#'+$(this).attr('rel')
    if($(btnId).is('.slash')){
        $(btnId).removeClass('slash')
    }
    else{
        $(btnId).addClass('slash')
    }
    var iId = '#'+$(btnId).attr('rel')
    if($(iId).attr('type')=='password'){
        $(iId).attr('type','text')
    }
    else{
        $(iId).attr('type','password')
    }
})