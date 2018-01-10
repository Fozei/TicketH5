var catNum;
var currentCat;
var targetCat;
$(function () {
    //获取分类
    $.post(DOMAIN + CAT_LIST, {}).done(function (data) {
        console.log(data);
        var data = eval("(" + data + ")");
        if (data.code === "success") {
            adapter_classify(data);
        } else {
            alert(data.message);
        }
    }).fail(function (xhr, status) {
        alert("数据通信失败");
    }).always(function () {
    });
    //获取数据
    clssify_data(USERID, 1, null, null, null);

    //设置分类点击事件
    $('#classify').find('p').on('click', function (e) {
        console.log($(this).attr('data'))
        targetCat = $(this).attr('data');
        $(this).addClass("active");
        $(this).siblings().removeClass('active')
    });

    // 时间戳转换成       年-月-日
    function getLocalTime(nS) {
        var ad = new Date(parseInt(nS));
        var Y = ad.getFullYear() + '-';
        var M = (ad.getMonth() + 1) + '-';
        var D = ad.getDate() + ' ';
        ad = Y + M + D;
        return ad;
    }
});

function clssify_data(userID, page, startTime, catID, endTime) {
    console.log('进行网络请求catID:' + catID);
    //累计收益
    $.ajax({
        url: DOMAIN + ADD_EARNING,
        data: {
            'userID': userID,
            'page': page,
            'startTime': startTime,
            'catID': catID,
            'endTime': endTime
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code === 'success') {
                console.log(data.logData);
                adapter_profit(data);
                currentCat = targetCat;
            } else {
                alert("获取数据失败：" + data.message);
            }
        }
    });
}

function adapter_classify(data) {
    catNum = data.catData.length;
    var ap_html = '';
    $.each(data.catData, function (v) {
        if (v === 0) {
            ap_html += "<p class='p_none' data=" + data.catData[v].id + ">" + data.catData[v].name + "</p>";
        } else {
            ap_html += "<p class='p_vis' data=" + data.catData[v].id + ">" + data.catData[v].name + "</p>";
        }
    })
    $('#classify').append(ap_html);
}

function adapter_profit(data) {
    $('#li_item').remove();
    var ap_html = '';
    console.log("数据长度" + data.logData.length);
    if (data.logData.length < 1) {
        ap_html = "<li id='li_item' style='text-align: center'> " +
            "<p class='dataItem'>" + '暂无数据' + "</p>" +
            "</li>";
    } else {
        $.each(data.logData, function (v) {
            ap_html += "<li id='li_item'> " +
                "<p class='dataItem'>" +
                "<span class='date'>" + data.logData[v].addtime + "</span>" +
                "<span class='cat'>" + data.logData[v].catName + "</span>" +
                "<span class='account'>" + data.logData[v].sourceName + "</span>" +
                "<span class='value'>" + data.logData[v].money + "</span>" +
                "</p>" +
                "</li>";
        });
    }
    $('#list').append(ap_html);
}

function showDateSelect() {
    resetCatPosition();
    $("#datePicker").animate({top: "17.18rem", height: "8.5rem"});
}

function resetDatePosition() {
    var start_time = $('#startDate').val();
    var end_time = $('#endDate').val();
    var today = new Date().getTime();
    var st_time = new Date(start_time).getTime();
    var ed_time = new Date(end_time).getTime();
    var requestData = isNaN(st_time) || isNaN(ed_time) || st_time >= today || ed_time > today || st_time >= ed_time;
    if (requestData) {
        console.log("时间不合法")
        alert("输入的时间范围不合法");
    } else {
        clssify_data(USERID, 1, getLocalTime(st_time), null, getLocalTime(ed_time));
    }
    $("#datePicker").animate({top: "28rem", height: "0rem"});
}

function showCatSelect() {
    resetDatePosition();
    var targetHeight = (catNum + 1) * 1.7;
    var targetTop = 28.44 - targetHeight - 3;
    $("#catList").animate({top: targetTop + "rem", height: targetHeight + "rem"});
    console.log(currentCat);
    if (currentCat !== undefined) {
        var find = $('#classify').find('p');
        console.log(find.length);
        console.log(find);
    }

}

function resetCatPosition() {
    $("#catList").animate({top: "28rem", height: "0rem"});
    console.log("currentCat--->" + currentCat);
    if (targetCat !== undefined && targetCat !== currentCat) {
        setTimeout(function () {
            clssify_data(USERID, 1, null, currentCat, null);
        }, 500);
    }
}