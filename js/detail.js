var targetId;

function parseDetailData(data) {
    // code: "success"
    // data: {…}
    // address: "北京体育管"
    // bookingtime: "2017-12-07"
    // detail: "发给对方"
    // endtime: "2017-12-20"
    // id: "5"
    // pic: "http://192.168.10.27/mall/uploadfile/product/1/2017/12/06/1512534434.jpg"
    // price1: "565.00"
    // price2: "987.00"
    // starttime: "2017-12-21"
    // title: "演唱会55"
    console.log(data)
    if (data.code === "success") {
        var address = data.data.address;
        var pic = data.data.pic;
        var title = data.data.title;
        var price = data.data.price1 + " - " + data.data.price2 + "元";
        var date = data.data.starttime + " 至 " + data.data.endtime;
        var desc = data.data.notice;
        var content = data.data.content;
        var timeList = data.timeList;
        $('#is_buy').val(data.data.is_buy);
        //设置海报
        $("#poster").attr("src", pic);
        $("#title").text(title);
        $("#area").text(address);
        $("#price").text(price);


        $("#date").append(date);
        $("#matchArea").append(address);
        $("#introduction").html(content);

        //表格标题
        $("#matchListTitle").html(title + "<br/>" + "竞赛日程表");
        var table = $(".matchTable");
        //表头
        table.append('<tr  matchId="title"><td>序号</td><td>日期</td><td>周</td><td>轮次</td><td>比赛队</td><td>比赛时间</td><td>选座购票</td></tr>');
        //表格数据
        for (var i = 0; i < timeList.length; i++) {
            var date = timeList[i].year_r;
            var week = timeList[i].week;
            var turn = timeList[i].turn;
            var team = timeList[i].team;
            var time = timeList[i].time;
            table.append('<tr  matchId=' + i + '><td>' + (i + 1) + '</td><td>' + date + '</td><td>' + week + '</td><td>' + turn + '</td><td>' + team + '</td><td>' + time + '</td><td>选座购票</td></tr>');
        }

        $("#notice").html(desc);
    } else {
        alert("数据出错")
    }
}


function goBooking(matchId) {
    var is_buy = $('#is_buy').val();
    if (is_buy === 'Y') {
        window.location.href = "select.html?id=" + matchId;
    } else {
        layer.msg('比赛已结束，无法购买');
    }
}

function show() {
    console.log("show")
}

$(function () {
    layer.open({type: 2});
    var url = window.location.search;
    console.log(url);
    if (url.replace(/(^s*)|(s*$)/g, "").length === 0) {
        layer.closeAll('loading');
        alert("数据出错");
    } else {
        targetId = getQueryString();
        console.log(targetId);
        //fixme todo change "targetId !==null"
        if (targetId === null) {
            targetId = 16;
            console.log(targetId + "::" + DOMAIN + TICKET_DETAIL);
            $.post(DOMAIN + TICKET_DETAIL, {
                id: targetId
            }).done(function (data) {
                var data = eval("(" + data + ")");
                parseDetailData(data);
            }).fail(function (xhr, status) {
                alert("获取数据失败失败");
            }).always(function () {
                layer.closeAll('loading');
            });
        } else {
            layer.closeAll('loading');
            alert("数据出错");
        }
    }
    //赛事日程点击事件
    $('.matchTable').delegate('tr', 'click', function (ev) {
        $(this).addClass("active");
        $(this).find("td:last").addClass("buttonSel");
        console.log($(this).attr("matchId") + ":::" + $(this))
        goBooking($(this).attr("matchId"));
    });
});
