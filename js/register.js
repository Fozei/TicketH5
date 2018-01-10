function getVerifyCode() {
    var phone = $("#phone").val();
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        alert("请输入正确的账号或密码");
        return false;
    }

    $.post(DOMAIN + GET_REG_CODE, {
        tel: phone
    }).done(function (data) {
    }).fail(function (xhr, status) {
        alert("获取验证码失败");
    }).always(function () {
    });

}

function register() {
    var phone = $("#phone").val();
    var code = $.trim($("#verifyCode").val());
    var pwd = $.trim($("#pwd").val());
    var pwd2 = $.trim($("#pwd2").val());
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        alert("请输入正确的账号或密码");
        return false;
    }

    if (code.length < 4) {
        alert("请输入验证码");
        return false;
    }

    if (pwd.length < 6 || pwd2.length < 6) {
        alert("输入的密码长度不合规");
        return false;
    }

    if (pwd !== pwd2) {
        alert("两次输入的密码不一致");
        return false;
    }

    var encryedPwd = encryptPwd(pwd);

    $.post(DOMAIN + REG, {
        phone: phone,
        code: code,
        pwd1: encryedPwd,
        pwd2: encryedPwd
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            location.href = "index.html";
        } else {
            alert(data.message);
        }
    }).fail(function (xhr, status) {
        alert("数据通信失败");
    }).always(function () {
    });
}