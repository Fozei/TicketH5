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

    $(".getVerifyCode").attr("onclick", null);
    $(".getVerifyCode").css("color", "grey");

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
                $('.getVerifyCode').text('重新获取')
                $(".getVerifyCode").attr("onclick", "getVerifyCode()");
                $(".getVerifyCode").css("color", "#2d70e1");
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

function register() {
    var phone = $("#phone").val();
    var code = $.trim($("#verifyCode").val());
    var pwd = $.trim($("#pwd").val());
    var pwd2 = $.trim($("#pwd2").val());
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        layer.open({
            content: '请输入正确的账号或密码'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    if (code.length < 4) {
        layer.open({
            content: '请输入验证码'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    if (pwd.length < 6 || pwd2.length < 6) {
        layer.open({
            content: '输入的密码长度不合规'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    if (pwd !== pwd2) {
        layer.open({
            content: '两次输入的密码不一致'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    var encryedPwd = encryptPwd(pwd);

    $(".submit").attr("onclick", null);
    $(".submit").css("background-color", "grey");

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
            layer.open({
                content: data.message
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });
        }
    }).fail(function (xhr, status) {
        layer.open({
            content: '数据通信失败'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
        $(".submit").attr("onclick", "register()");
        $(".submit").css("background-color", "#2d70e1");
    });
}