$('.head .backUp').on('touchstart',function(e) {
  window.history.back();
});
$(function () {
    $('#apply_submit').click(function () {
        $.ajax({
            url: "http://192.168.1.78/ticket/api/applyagent.php",
            data: {
                'userID': USERID,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.code == 'success') {
                    alert("申请代理人成功");
                } else {
                    alert("申请失败："+data.message);
                }
            }
        });
    })
})
