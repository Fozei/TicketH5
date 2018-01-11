$(function () {
    function submitName() {
    }

    var surl_s = decodeURI(location.href);
    var name_data = surl_s.split("=")[1];
    $('#ipt_name').val(name_data);

    $('#name_submit').click(function () {
        var name = $('#ipt_name').val();
        //修改用户姓名、身份证
        $.ajax({
            url: DOMAIN + AMEND_EDITUSER,
            data: {
                'userID': USERID,
                'name': name,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                // layer.close(index);
                if (data.code == 'success') {
                    // window.location.href = 'account_setting.html';
                    layer.open({
                        content: '修改姓名成功'
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                    window.history.back(-1);
                } else {
                    layer.open({
                        content: "修改失败：" + data.message
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                }
            }
        });
    });


});

