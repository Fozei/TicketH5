$(function () {
    // 得到订单信息
    $.ajax({
        url: DOMAIN + GET_USR_LIST,
        data: {
            'userID': USERID,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            // layer.close(index);
            if (data.code == 'success') {
                var userData = data.userData;
                if (!(userData.name === null || userData.name === undefined || userData.name === "")) {
                    $('#img-name').css('display', 'none');
                    $('#name').css('display', 'inline');
                    $('#name').html(userData.name);
                }

                if (!(userData.idcard === null || userData.idcard === undefined || userData.idcard === "")) {
                    $('#img-idt').css('display', 'none');
                    $('#idt').css('display', 'inline');
                    $('#idt').html(userData.idcard);
                }

                $('#num').html(userData.phone);

            } else {
                alert("获取失败：" + data.message);
            }
        }
    });
    $('#amend_name').click(function () {
        var data = $('#name').text();
        if (data === "" || data === undefined) {
            location.href = "inputname.html";
        }
    });

    $('#amend_idt').click(function () {
        var data = $('#idt').text();
        if (data === "" || data === undefined) {
            location.href = "inputid.html";
        }
    });

    $('#msg').click(function () {
        location.href = "msg.html";
    });

    $('#submit').click(function () {
        setCookie(COOKIE_NAME_USER_ID, "", 30);
        location.href = "index.html";
    });
});

function changePwd() {
    location.href = "changepwd.html";
}

function aboutUs() {
    location.href = "about_us.html";
}