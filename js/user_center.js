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
			if (data.message=='用户不存在')
			{
				location.href='login.html';
			}else{
				layer.open({
					content: data.message
					, skin: 'msg'
					, time: 2 //2秒后自动关闭
				});
			}
        }
    }).fail(function (xhr, status) {

        layer.open({
            content: '数据通信失败'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
    });
});

function initView(data) {
    //1=普通用户 2=代理人
    userType = parseInt(data.userData.type);
    if (userType === 1) {//普通人
        $('#cashRequest').remove();
        $('#cashHistory').remove();
        var agentStatus = parseInt(data.userData.agent_status);
        if (agentStatus === 1) {//普通用户--尚未申请
            $('#list').append("<li><div onclick='goAgent()' class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span>申请成为代理商</span></div></li>");
        } else if (agentStatus === 2) {
            $('#list').append("<li><div onclick='goMyAgent()' class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span>我的代理商</span></div></li>");
        } else if (agentStatus === 3) {//普通用户，申请审核中
            $('#list').append('<li><div style="background-image: none" class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span style="float: right;margin-right: 1rem">申请审核中</span></div></li>');
        } else if (agentStatus === 4) {
            $('#list').append('<li><div style="background-image: none" class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span style="float: right;margin-right: 1rem">您的申请被驳回</span></div></li>');
        }
    } else if (userType === 2) {//代理商
        $('#list').append("<li><div onclick='goMyAgent()' class=\"dataBox\"><img class=\"catLogo\" src=\"images/myagent.png\"><span>我的代理商</span></div></li>");
    }


    $.post(DOMAIN + USER_INDEX, {
        userID: getCookie(COOKIE_NAME_USER_ID),
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            bindData(data);
        } else {
            layer.open({
                content: data.message
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });
        }
    }).fail(function (xhr, status) {
        layer.open({
            content: '数据通信失败'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
    });
}

function bindData(data) {
    $('#phone').text(data.phone.substr(0, 3) + "****" + data.phone.substr(7, data.phone.length));
    $('#discount').text(data.discount + "折优惠");
    $('#balance').text(data.balance);
    $('#income').text(data.income);

}

function goHomePage() {
    location.href = "index.html";
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