


$(function () {
    function submitName() {
        console.log("submit name")
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
                'name':name,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                // layer.close(index);
                if (data.code == 'success') {
                    // window.location.href = 'account_setting.html';
                    alert("修改姓名成功");
                    window.history.back(-1);
                } else {
                    alert("修改失败："+data.message);
                }
            }
        });
    });


});

