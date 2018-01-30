var userID = getQueryString('key');
var isHead = true;
$(function () {
    if (userID === "" || userID === null) {
        layer.open({
            content: '无效参数'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
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
                layer.open({
                    content: "获取失败：" + data.message
                    , skin: 'msg'
                    , time: 2 //2秒后自动关闭
                });
            }
        }
    });

    function register(data) {
        $('#sp_account').html(data.userData.account);
    }
	$("#phone").blur(function(){
	  //获取验证码
        $.ajax({
            url: DOMAIN + CHECK_PHONE,
            data: {
                'tel': $(this).val()
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
					if (data.code=='error')
					{
						$('#code').val('yes');
						layer.open({
							content: data.message
							, skin: 'msg'
							, time: 2 //2秒后自动关闭
						});
					}else{
						$('#code').val('');
					}
            }
        });
	});


    $('#get_code').click(function () {
		if ($('#code').val()=='')
		{
			if (!isHead) return;
			var tel = $("#phone").val();
			if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(tel)))) {
				layer.open({
					content: '请输入正确的手机号'
					, skin: 'msg'
					, time: 2 //2秒后自动关闭
				});
				return false;
			}
			//获取验证码
			$.ajax({
				url: DOMAIN + GET_REG_CODE,
				data: {
					'tel': tel
				},
				type: "POST",
				async: false,
				dataType: "json",
				success: function (data) {
						
				}
			});
			setTime();
		}else{
			layer.open({
					content: '手机号已注册'
					, skin: 'msg'
					, time: 2 //2秒后自动关闭
			});
		}
       
       
    });

    $('#submit_register').click(function () {

        var phone = $("#phone").val();
        var pwd = $("#pwd").val();
        var code = $("#input_code").val();
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone))) || pwd.length < 6) {
            layer.open({
                content: '请输入正确的账号或密码'
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });
            return false;
        }
        if (code < 6) {
            layer.open({
                content: '验证码不正确'
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });
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
					setCookie(COOKIE_NAME_USER_ID, data.userID, 30);
                    skip();
                } else {
                    layer.open({
                        content: "获取失败：" + data.message
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                }
            }
        });
    });

    function setTime() {
        isHead = false;
        var altime = 60000;
        var interval = setInterval(function () {
            var time = altime / 1000;
            $('#get_code').html(time + "秒后重试");
            altime -= 1000;
            if (altime < 0) {
                $('#get_code').html('重新获取');
                clearInterval(interval);
                isHead = true;
            }
        }, 1000);
    }

    var wo;

    function winopen() {
        wo = window.open('invited.html', 'ssss', 'width=250,height=200');
        wo.document.write('<h1 id="abc"></h1>');
        wo.document.close();
        winclose(10);
    }


    function skip() {
        $('.mark-box').removeClass('hide')

        var altime = 5000;
        var $text = document.getElementById('time_box');

        var interval = setInterval(function () {
            if ((altime / 1000) <= 0) {
                $text.innerText = "注册成功" + '\n' + '1秒后自动跳转';
            } else {
                $text.innerText = "注册成功" + '\n' + (altime / 1000) + '秒后自动跳转';
            }
            altime -= 1000;
            if (altime < 0) {
                clearInterval(interval);
                window.location.href = "index.html";
            }
        }, 1000);
    }

})