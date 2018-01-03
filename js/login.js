function login() {
    var phone = $("#phone").val();
    var pwd = $("#pwd").val();
    console.log(pwd.length)
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone))) || pwd.length < 6) {
        alert("请输入正确的账号或密码");
        return false;
    }
}

function goRegister() {
    location.href = "register.html"
}

function forgetPwd() {

}