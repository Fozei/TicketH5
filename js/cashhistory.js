$(function () {
    //检查用户类型
    $.post(DOMAIN + CASH_HISTORY, {
        userID: getCookie(COOKIE_NAME_USER_ID),
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            initView(data);
        } else {
            alert(data.message);
        }
    }).fail(function (xhr, status) {
        alert("数据通信失败");
    }).always(function () {
    });
});

function initView(data) {
    // data.list.map(function (t, number, ts) {
    //     console.log(t + "::" + number + "::" + ts)
    // });
    $(data.list).each(function (index, dataItem) {
        var status = parseInt(dataItem.status);
        var remark, className;
        switch (status) {
            case 0:
                remark = "待审核";
                className = "verifying";
                break;
            case 1:
                remark = "转账中";
                className = "cashing";
                break
            case 2:
                remark = "交易成功";
                className = "finish";
                break
            case 3:
                remark = "交易失败";
                className = "rejected";
                break
        }

        $('#list').append("<li>" +
            "<div style=\"border-top: none\">" +
            "<p class=\"left normalP money\">" + dataItem.money + "</p>" +
            "<p class=\"right status " + className + "\">" + remark + "</p></div>" +
            "<div>" +
            "<img class=\"left\" src=\"images/clock.png\">" +
            "<p class=\"left cashTime\">提现申请时间</p>" +
            "<p class=\"right normalP\">" + dataItem.addtime + "</p></div>" +
            "</li>");
    });


    // $('#list').append();
}