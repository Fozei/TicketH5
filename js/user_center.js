var userType;
$(function () {
    //检查用户类型
    $.post(DOMAIN + GET_USR_LIST, {
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
    //1=普通用户 2=代理人
    userType = parseInt(data.userData.type);
    if (userType === 1) {
        $('#cashRequest').remove();
        $('#cashHistory').remove();
        $('#list').append("<li><div onclick='goAgent()' class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span>申请成为代理商</span></div></li>");
    } else if (userType === 2) {
        $('#list').append("<li><div onclick='goMyAgent()' class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span>我的代理商</span></div></li>");
    }


    $.post(DOMAIN + USER_INDEX, {
        userID: getCookie(COOKIE_NAME_USER_ID),
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
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

function goUserSetting() {
    location.href = "account_setting.html";
}

function goProfitDetail() {
    if (userType === 2) {
        location.href = "profit_detail.html";
    }
}

function goMyOrder() {
    location.href = "my_order.html";
}

function goMyAgent() {
    if (userType === 2) {
        location.href = "my_agent.html";
    }
}

function goAgent() {
    if (userType === 1) {
        location.href = "application_agent.html";
    }
}

function goCashHistory() {
    if (userType === 2) {
        location.href = "cash_history.html";
    }
}