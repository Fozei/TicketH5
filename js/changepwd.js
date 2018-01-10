function resetPwd() {

    var phone = $("#phone").val();
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        alert("请输入正确的账号或密码");
        return false;
    }

    var code = $.trim($('#verifyCode').val());
    if (code.length < 4) {
        alert("请输入正确的验证码");
        return;
    }

    // location.href = "resetpwd.html" + "?var=" + encryptPwd(phone);

    $('.submit').attr("onclick", null);
    $('.submit').css("background-color", "grey");

    $.post(DOMAIN + FORGET_CHECK_VCODE, {
        tel: phone,
        code: code
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            location.href = "resetpwd.html" + "?var=" + encryptPwd(phone);
        }
    }).fail(function (xhr, status) {
        alert("获取验证码失败");
    }).always(function () {
        $('.submit').attr("onclick", "resetPwd()");
        $('.submit').css("background-color", "#2d70e1");
    });

}

function getVerifyCode() {
    var phone = $("#phone").val();
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        alert("请输入正确的账号或密码");
        return false;
    }

    $('#getVerifyCode').attr("onclick", null);
    $('#getVerifyCode').css("color", "grey");

    setTimeout(function () {
        $('#getVerifyCode').attr("onclick", "getVerifyCode()");
        $('#getVerifyCode').css("color", "#2d70e1");
    }, 1000 * 60);

    $.post(DOMAIN + GET_REG_CODE, {
        tel: phone
    }).done(function (data) {
        console.log(data);
    }).fail(function (xhr, status) {
        alert("获取验证码失败");
    }).always(function () {
    });
}