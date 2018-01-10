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

    console.log(phone + ":::" + phone1);

    if (phone1 !== phone) {
        return;
    }

    var realpwd = encryptPwd(pwd);

    $('#finish').attr("onclick", null);
    $('#finish').css("background-color", "grey");

    $.post(DOMAIN + FORGET_PWD, {
        tel: phone,
        pwd: realpwd
    }).done(function (data) {
        var data = eval("(" + data + ")");
        console.log(data);
        if (data.code === "success") {
            location.href = "login.html";
        }
    }).fail(function (xhr, status) {
        console.log(xhr + "::" + status);
        alert("获取验证码失败");
    }).always(function () {
        $('#finish').attr("onclick", "finish()");
        $('#finish').css("background-color", "#2d70e1");
    });

}