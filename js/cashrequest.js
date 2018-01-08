var userPhone;

$(function () {

    $.post(DOMAIN + GET_USR_LIST, {
        userID: getCookie(COOKIE_NAME_USER_ID),
    }).done(function (data) {
        console.log(data);
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            console.log(data);
            userPhone = data.userData.phone;
            $.trim($('#phone').val(userPhone));
        } else {
            alert(data.message);
        }
    }).fail(function (xhr, status) {
        alert("数据通信失败");
    }).always(function () {
    });
});


function withDrawSendCode() {
    //验证金额
    var amount = parseFloat($('#amount').val());

    console.log(parseFloat($('#balanceAvailable').text()) + ":::" + amount)
    if (amount < 200 || parseFloat($('#balanceAvailable').text()) < amount) {
        console.log("单次提现金额必须大于200")
        alert("单次提现金额必须大于200");
        return;
    }
    //验证手机号码
    var phone = $.trim($('#phone').val());
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        alert("请输入正确的手机号");
        return false;
    }

    console.log(getCookie(COOKIE_NAME_USER_ID));

    //获取验证码 GET_CASH_REQUEST_CODE
    $.post(DOMAIN + GET_CASH_REQUEST_CODE, {
        userID: getCookie(COOKIE_NAME_USER_ID)
    }).done(function (data) {
        console.log(data);
    }).fail(function (xhr, status) {
        alert("获取验证码失败");
    }).always(function () {
    });
}

function submitRequest() {
    //验证金额
    var amount = parseFloat($('#amount').val());

    console.log(parseFloat($('#balanceAvailable').text()) + ":::" + amount)
    if (amount < 200 || parseFloat($('#balanceAvailable').text()) < amount) {
        console.log("单次提现金额必须大于200")
        alert("单次提现金额必须大于200");
        return;
    }
    //验证手机号码
    var phone = $.trim($('#phone').val());
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($.trim(phone)))) {
        alert("请输入正确的手机号");
        return false;
    }

    //验证银行卡号 账户名 验证码
    var bankAccount = $.trim($('#bankAccount').val());
    var verifyCode = $.trim($('#verifyCode').val());
    var countName = $.trim($('#countName').val());

    console.log(bankAccount + "::" + verifyCode + "::" + countName)

    if (bankAccount.length <= 0 || verifyCode.length <= 0 || countName.length <= 0) {
        console.log("请输将信息录入完整")
        alert("请输将信息录入完整");
        return false;
    }

    // userID 	int 	Y 		用户ID
    // code 	string 	Y 		验证码
    // price 	string 	Y 		提现金额
    // backName 	string 	Y 		银行开户名
    // backCard


    $.post(DOMAIN + CASH_REQUEST, {
        userID: getCookie(COOKIE_NAME_USER_ID),
        code: verifyCode,
        price: amount,
        backName: countName,
        backCard: bankAccount
    }).done(function (data) {
        console.log(data);
    }).fail(function (xhr, status) {
        console.log("fail")
        alert("获取验证码失败");
    }).always(function () {
    });
}