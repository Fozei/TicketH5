var userID = getQueryString('key');
$(function () {

    console.log('得到的数据：' + userID);
    if (userID == "" || userID == null) {
        alert("无效参数");
        return false;
    }
    //通过邀请人注册初始化数据
    $.ajax({
        url: "http://192.168.1.78/ticket/api/invitereg1.php",
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

    function login() {
        var phone = $("#phone").val();
        // var phone = '13146575509';
        var pwd = $("#pwd").val();
        // var pwd = '123456';
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone))) || pwd.length < 6) {
            alert("请输入正确的账号或密码");
            return false;
        }
        var pwdString = encryptPwd(pwd);


    }

    $('#get_code').click(function () {
        var tel = $("#phone").val();
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(tel)))) {
            alert("请输入正确的账号或密码");
            return false;
        }
        $.ajax({
            url: "http://192.168.1.78/ticket/api/regsendcode.php",
            data: {
                'tel': tel,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.code == 'success') {
                    console.log(data)
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
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone))) || pwd.length < 6 ) {
            alert("请输入正确的账号或密码");
            return false;
        }
        if (code < 6){
            alert("验证码不正确");
            return false;
        }
        var pwdString = encryptPwd(pwd);
        $.ajax({
            url: "http://192.168.1.78/ticket/api/invitereg2.php",
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
                    console.log(data)
                } else {
                    alert("获取失败：" + data.message);
                }
            }
        });
    });

})