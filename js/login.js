function login() {
    var phone = $("#phone").val();
    var pwd = $("#pwd").val();
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone))) || pwd.length < 6) {
        layer.open({
            content: '请输入正确的账号或密码'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }
    var pwdString = encryptPwd(pwd);

    $('.submit').attr("onclick", null);
    $('.submit').css("background-color", "grey");

    $.post(DOMAIN + LOGIN, {
        phone: phone,
        pwd: pwdString
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            setCookie(COOKIE_NAME_USER_ID, data.userID, 30);
            // location.href = "index.html";
            location.href = "user_center.html";
        } else {
            layer.open({
                content: data.message
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });
        }
    }).fail(function (xhr, status) {
        layer.open({
            content: '通信失败'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
        $('.submit').attr("onclick", "login()");
        $('.submit').css("background-color", "#2d70e1");
    });
}

function goRegister() {
    location.href = "register.html";
}

function forgetPwd() {
    location.href = "changepwd.html";
}

