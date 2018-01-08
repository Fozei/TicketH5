function login() {
    // var phone = $("#phone").val();
    var phone = '13146575509';
    // var pwd = $("#pwd").val();
    var pwd = '123456';
    // if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone))) || pwd.length < 6) {
    //     alert("请输入正确的账号或密码");
    //     return false;
    // }
    var pwdString = encryptPwd(pwd);
    $.post(DOMAIN + LOGIN, {
        phone: phone,
        pwd: pwdString
    }).done(function (data) {
        var data = eval("(" + data + ")");
        console.log(data);
        if (data.code === "success") {
            setCookie(COOKIE_NAME_USER_ID, data.userID, 30);
            location.href = "index.html";
        } else {
            alert(data.message);
        }
    }).fail(function (xhr, status) {
        alert("通信失败");
    }).always(function () {
    });
}

function goRegister() {
    location.href = "register.html";
}

function forgetPwd() {
    location.href = "changepwd.html";
}

