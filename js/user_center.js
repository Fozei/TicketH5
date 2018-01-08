$(function () {
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
});

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