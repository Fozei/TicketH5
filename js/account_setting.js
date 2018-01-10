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
                $('#name').css('display','inline');
                $('#img-name').css('display','none');
                $('#name').html(userData.name);
                $('#idt').css('display','inline');
                $('#img-idt').css('display','none');
                $('#idt').html(userData.idcard);
                $('#num').html('17666666666');
            } else {
                alert("获取失败："+data.message);
            }
        }
    });
    $('#amend_name').click(function () {
        var data = $('#name').text();
        var name = "inputname.html?name="+encodeURI(data);
        window.location.href = name;
    });

    $('#amend_idt').click(function () {
       var data = $('#idt') .text();
       var idt = "inputid.html?idt="+encodeURI(data);
       window.location.href = idt;
    });
});