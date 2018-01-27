function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

$(function () {
    $('.detailedRules').hide()
    $('.nav li').on('touchstart', function (e) {
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
    });
    $('.hint>button').on('touchstart', function (e) {
        $('.detailedRules').show()

    });
    $('.detailedRules>.backUp').on('touchstart', function (e) {
        $(this).parent().hide()

    });


});

function goShare() {
    location.href = 'invitation_code.html?uid=' + getCookie(COOKIE_NAME_USER_ID) + "&r=" + Math.random();
}

