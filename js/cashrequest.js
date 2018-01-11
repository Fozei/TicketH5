var userPhone;

$(function () {

    $.post(DOMAIN + GET_USR_LIST, {
        userID: getCookie(COOKIE_NAME_USER_ID),
    }).done(function (data) {
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            userPhone = data.userData.phone;
            $.trim($('#phone').val(userPhone));
            $('#balanceAvailable').text(data.userData.balance);
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
});


function withDrawSendCode() {
    //验证金额
    var amount = $.trim($('#amount').val());
    if (amount < 200 || parseFloat($('#balanceAvailable').text()) < amount) {
        layer.open({
            content: '单次提现金额必须大于200'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return;
    }
    //验证手机号码
    var phone = $.trim($('#phone').val());
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        layer.open({
            content: '请输入正确的手机号'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    //不可点击
    $("#getVerifyCode").attr("onclick", null);
    $("#getVerifyCode").css("color", "grey");

    setTimeout(function () {
        $("#getVerifyCode").attr("onclick", "withDrawSendCode()");
        $("#getVerifyCode").css("color", "#2d70e1");
    }, 1000 * 60);

    //获取验证码 GET_CASH_REQUEST_CODE
    $.post(DOMAIN + GET_CASH_REQUEST_CODE, {
        userID: getCookie(COOKIE_NAME_USER_ID)
    }).done(function (data) {
    }).fail(function (xhr, status) {
        layer.open({
            content: '获取验证码失败'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
    });
}

function submitRequest() {
    //验证金额
    var amount = parseFloat($('#amount').val());
    if (amount < 200 || parseFloat($('#balanceAvailable').text()) < amount) {
        layer.open({
            content: '单次提现金额必须大于200'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return;
    }
    //验证手机号码
    var phone = $.trim($('#phone').val());
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        layer.open({
            content: '请输入正确的手机号'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    //验证银行卡号 账户名 验证码
    var bankAccount = $.trim($('#bankAccount').val());
    var verifyCode = $.trim($('#verifyCode').val());
    var countName = $.trim($('#countName').val());

    if (bankAccount.length <= 0 || verifyCode.length <= 0 || countName.length <= 0) {
        layer.open({
            content: '请输将信息录入完整'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
        return false;
    }

    $("#submit").attr("onclick", null);
    $("#submit").css("background-color", "grey");

    $.post(DOMAIN + CASH_REQUEST, {
        userID: getCookie(COOKIE_NAME_USER_ID),
        code: verifyCode,
        price: amount,
        backName: countName,
        backCard: bankAccount
    }).done(function (data) {
        $("#submit").attr("onclick", "submitRequest()");
        $("#submit").css("background-color", "#2d70e1");
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            location.href = "cash_history.html";
        } else {
            layer.open({
                content: data.message
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });
        }
    }).fail(function (xhr, status) {
        layer.open({
            content: 获取验证码失败
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
        $("#submit").attr("onclick", "submitRequest()");
        $("#submit").css("background-color", "#2d70e1");
    });
}