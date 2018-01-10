var userID = getQueryString('key');
var isHead = true;
$(function () {
    if (userID == "" || userID == null) {
        alert("无效参数");
        return false;
    }
    //通过邀请人注册初始化数据
    $.ajax({
        url: DOMAIN + INVITE_REGISTER_INIT,
        data: {
            'userID': userID,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 'success') {
                register(data);
            } else {
                alert("获取失败：" + data.message);
            }
        }
    });

    function register(data) {
        $('#sp_account').html(data.userData.account);
    }


    $('#get_code').click(function () {
        if (!isHead) return;
        var tel = $("#phone").val();
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(tel)))) {
            alert("请输入正确的账号或密码");
            return false;
        }
        //获取验证码
        $.ajax({
            url: DOMAIN + GET_REG_CODE,
            data: {
                'tel': tel,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.code == 'success') {
                    setTime();
                } else {
                    alert("获取失败：" + data.message);
                }
            }
        });
    });

    $('#submit_register').click(function () {

        var phone = $("#phone").val();
        // var phone = '13146575509';
        var pwd = $("#pwd").val();
        var code = $("#input_code").val();
        // var pwd = '123456';
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone))) || pwd.length < 6) {
            alert("请输入正确的账号或密码");
            return false;
        }
        if (code < 6) {
            alert("验证码不正确");
            return false;
        }
        var pwdString = encryptPwd(pwd);
        //邀请注册
        $.ajax({
            url: DOMAIN + INVITE_REGISTER,
            data: {
                'userID': userID,
                'phone': phone,
                'code': code,
                'pwd': pwdString,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.code == 'success') {
                    setTime();
                } else {
                    alert("获取失败：" + data.message);
                }
            }
        });
    });

    function setTime() {
        isHead = false;
        var altime = 60000;
        var interval = setInterval(function () {
            var time = altime/1000;
            $('#get_code').html( time + "秒后重试");
            altime -= 1000;
            if (altime <= 0){
                $('#get_code').html( '重新获取');
                clearInterval(interval);
                isHead = true;
            }
        }, 1000);
    }

})