$(function () {

    $.ajax({
        url: "http://192.168.1.78/ticket/api/invite.php ",
        data: {
            'userID': USERID,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            // layer.close(index);
            if (data.code == 'success') {
                qr_code(data);
            } else {
                alert("获取失败：" + data.message);
            }
        }
    });

    function qr_code(data) {

        if (data.userDate.length < 1) {
            return;
        }
        $('#sp_number').html(data.userDate.account);
        var qr_code = data.userDate.inviteUrl;
        var qrcode = new QRCode(document.getElementById(
            "scanme"), {
            width: 400,
            height: 400,
        });
        qrcode.makeCode(qr_code);
    }


})