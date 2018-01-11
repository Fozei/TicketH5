function resetPwd() {

    var phone = $("#phone").val();
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        layer.open({
            content: '请输入正确的账号或密码'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    var code = $.trim($('#verifyCode').val());
    if (code.length < 4) {
        layer.open({
            content: '请输入正确的验证码'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return;
    }

    // location.href = "resetpwd.html" + "?var=" + encryptPwd(phone);

    $('.submit').attr("onclick", null);
    $('.submit').css("background-color", "grey");

    $.post(DOMAIN + FORGET_CHECK_VCODE, {
        code: code,
        phone: phone
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            location.href = "resetpwd.html" + "?var=" + encryptPwd(phone);
        }
    }).fail(function (xhr, status) {
        layer.open({
            content: '获取验证码失败'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
        $('.submit').attr("onclick", "resetPwd()");
        $('.submit').css("background-color", "#2d70e1");
    });

}

function getVerifyCode() {
    var phone = $("#phone").val();
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        layer.open({
            content: '请输入正确的账号或密码'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    $('#getVerifyCode').attr("onclick", null);
    $('#getVerifyCode').css("color", "grey");

    var count = 0, TIME_COUNT = 60, time;
    if (!time) {
        count = TIME_COUNT;
        time = setInterval(function () {
            if (count > 1 && count <= TIME_COUNT) {
                count--;
                $('.getVerifyCode').text('重新获取（' + count + '）')
                console.log(count)
            } else {
                clearInterval(time);
                time = null;
                $('#getVerifyCode').text('重新获取')
                $('#getVerifyCode').attr("onclick", "getVerifyCode()");
                $('#getVerifyCode').css("color", "#2d70e1");
            }
        }, 1000)

    }

    $.post(DOMAIN + GET_REG_CODE, {
        tel: phone
    }).done(function (data) {
    }).fail(function (xhr, status) {
        layer.open({
            content: '获取验证码失败'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
    });
}