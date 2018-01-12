$('.head .backUp').on('touchstart',function(e) {
  window.history.back();
});
$(function () {
    $('#apply_submit').click(function () {
        //申请代理人
        $.ajax({
            url: DOMAIN + APPLY_AGENT,
            data: {
                'userID': USERID,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.code == 'success') {
                    layer.msg('您的申请已提交，请等待！')
                } else {
                    layer.msg(data.message)

                }
            }
        });
    })
})
