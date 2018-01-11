function finish() {
    // var phone = $("#pwd1").val();
    // if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
    //     layer.open({
    //         content: "请输入正确的账号或密码"
    //         , skin: 'msg'
    //         , time: 2 //2秒后自动关闭
    //     });
    //     return false;
    // }

    var pwd1 = $.trim($('#pwd1').val());
    if (pwd1.length < 6) {
        layer.open({
            content: "请输入6-18位密码"
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return;
    }

    var pwd2 = $.trim($('#pwd2').val());
    if (pwd2.length < 6) {
        layer.open({
            content: "请输入6-18位密码"
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return;
    }

    if (pwd1 !== pwd2) {
        layer.open({
            content: "两次输入的密码不一致"
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return;
    }

    var verify = getQueryString("var");
    var phone = decodePwd(verify);


    var realpwd = encryptPwd(pwd1);

    $('#finish').attr("onclick", null);
    $('#finish').css("background-color", "grey");

    $.post(DOMAIN + FORGET_PWD, {
        tel: phone,
        pwd: realpwd
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            location.href = "login.html";
        }
    }).fail(function (xhr, status) {
        layer.open({
            content: "获取验证码失败"
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
        $('#finish').attr("onclick", "finish()");
        $('#finish').css("background-color", "#2d70e1");
    });

}