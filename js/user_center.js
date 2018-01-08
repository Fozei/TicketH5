$(function () {

    $.post(DOMAIN + GET_USR_LIST, {
        userID: getCookie(COOKIE_NAME_USER_ID),
    }).done(function (data) {
        console.log(data);
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
    console.log(data);
    //1=普通用户 2=代理人
    var type = parseInt(data.userData.type);
    if (type === 1) {
        console.log(type);
        $('#cashRequest').remove();
        $('#list').append("<li><div class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span>申请成为代理商</span></div></li>");
    } else if (type === 2) {
        $('#list').append("<li><div class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span>我的代理商</span></div></li>");
    }


    console.log(getCookie(COOKIE_NAME_USER_ID));
    $.post(DOMAIN + USER_INDEX, {
        userID: getCookie(COOKIE_NAME_USER_ID),
    }).done(function (data) {
        console.log(data);
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            console.log(data);
            bindData(data);
        } else {
            alert(data.message);
        }
    }).fail(function (xhr, status) {
        alert("数据通信失败");
    }).always(function () {
    });
}

function bindData(data) {
    $('#phone').text(data.phone.substr(0, 4) + "****" + data.phone.substr(7, data.phone.length));
    $('#discount').text(data.discount + "折优惠");
    $('#balance').text(data.balance);
    $('#income').text(data.income);

}

function goCashRequest() {
    location.href = "cash_request.html";
}

function goFaq() {
    location.href = "faq.html";
}

function goMsg() {
    location.href = "msg.html";
}