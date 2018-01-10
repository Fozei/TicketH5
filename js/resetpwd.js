function finish() {
    var phone = $("#phone").val();
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        alert("请输入正确的账号或密码");
        return false;
    }

    var pwd = $.trim($('#pwd').val());
    if (pwd.length < 6) {
        alert("请输入6-18位密码");
        return;
    }

    var verify = getQueryString("var");
    var phone1 = decodePwd(verify);

    if (phone1 !== phone) {
        return;
    }

    var realpwd = encryptPwd(pwd);

    $('#finish').attr("onclick", null);
    $('#finish').css("background-color", "grey");

    $.post(DOMAIN + FORGET_CHECK_VCODE, {
        tel: phone,
        pwd: realpwd
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            location.href = "index.html";
        }
    }).fail(function (xhr, status) {
        alert("获取验证码失败");
    }).always(function () {
        $('#finish').attr("onclick", "finish()");
        $('#finish').css("background-color", "#2d70e1");
    });

}