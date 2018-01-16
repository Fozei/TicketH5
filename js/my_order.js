var pageData;
$(function () {

    $.ajax({
        url: DOMAIN + USER_ORDER_LIST,
        data: {
            'userID': USERID,
            'page': 1,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            // layer.close(index);
            if (data.code === 'success') {
                if (data.list === 0) {
                    $('#dev_ul').append('<div class="emptyTip">暂无信息</div>');
                } else {
                    create_details_data(data.list);
                }
            } else {
                alert("获取数据失败：" + data.message);
            }
        }
    });

    function create_details_data(data) {
        var htmls = '';
        $.each(data, function (v) {
            pageData = data;
            htmls += buildUpOrderContent(v);
        });
        $('#dev_ul').append(htmls);
    }

    function getdata(data) {
        var p_html = '';
        $.each(data, function (p) {
            p_html += "<p style='font-size: 0.474rem; color: #808080;letter-spacing: 0.15rem;'>座位号：<span style='font-size: 0.474rem; color: #1a1a1a;letter-spacing: 0rem;'>" + data[p].areaName + '区' + data[p].matchseat_line + '排' + data[p].matchseat_column + '座' + "</span></p>";
        });
        return p_html;
    }

});

function buildUpContent(pageDatum) {
    var content = "<div class=\"orderDetail\"><p class=\"layer_title\">" + pageDatum.matchName + "</p><ul class=\"ticketUl\">";
	var ticketID = pageDatum.ticket_id;
	var order_num = pageDatum.num;
	var timeID = pageDatum.time_id;
    var seatList = pageDatum.seatList;
    for (var i = 0; i < seatList.length; i++) {
        var seatInfo = seatList[i];
        var seatArea = seatInfo.areaName + "区" + seatInfo.matchseat_line + "排" + seatInfo.area_id + "座";

        var payStatus;
        if (pageDatum.status === "1") {
            payStatus = "已支付";
        } else {
            payStatus = "未支付 <a href=\""+DOMAIM_API+"web/ticketconfirm.php?ticketID="+ticketID+"&orderNum="+order_num+"&timeID="+timeID+"\" class=\"pauButton\">点击支付</a>";
        }

        var matchDate = pageDatum.year_r + "\t" + pageDatum.match_time;

        var str = "<li style=\"margin-top: 0.5rem\">\n" +
            "        <div>\n" +
            "        <p class=\"left\">比赛时间：<span>" + matchDate + "</span></p>\n" +
            "    <p class=\"right\">座&#8194位&#8194号：<span>" + seatArea + "</span></p>\n" +
            "    </div>\n" +
            "    <div>\n" +
            "    <p class=\"left\">订&#8194单&#8194号：<span>" + pageDatum.num + "</span></p>\n" +
            "    <p class=\"right\">支付状态：<span>" + payStatus + "</span></p>\n" +
            "    </div>\n" +
            "    <div>\n" +
            "    <p class=\"left\">票&#12288&#12288价：<span>" + seatInfo.matchseat_price + "</span></p>\n" +
            "    <p class=\"right\">姓&#12288&#12288名：<span>" + seatInfo.name + "</span></p>\n" +
            "    </div>\n" +
            "    <div>\n" +
            "    <p class=\"left\">电话号码：<span>" + pageDatum.tel + "</span></p>\n" +
            "    <p class=\"right\">身份证号：<span>" + seatInfo.idcard + "</span></p>\n" +
            "    </div>\n" +
            "    </li>";


        content += str;
    }
    return content += "</ul></div>";
}

function buildUpOrderContent(index) {
    var dataItem = pageData[parseInt(index)];
    var str;
    if (dataItem.status === "1") {
        str = "已支付：";
    } else {
        str = "未支付：";
    }

    var week = dataItem.week + "\t";

    var content = "<div class=\"page\" onclick=\"showTicketList(" + index + ")\">\n" +
        "        <span class=\"sp-ft-title\">" + dataItem.matchName + "<span class=\"sp-ft-details\">比赛赛事：</span><span>" + dataItem.team + "</span></span>\n" +
        "        <img class=\"img-line\" src=\"images/line.png\">\n" +
        "        <div style=\"float: left;\">\n" +
        "            <img class=\"img-pictrue\" src=\"" + dataItem.matchPic + "\">\n" +
        "        </div>\n" +
        "        <div class=\"d-details\">\n" +
        "            <p>购票时间：" + dataItem.create_time + "</p>\n" +
        "            <p>比赛时间：" + dataItem.year_r + "</p>\n" +
        "            <p style=\"margin-left: 2.3555rem\">周" + week + dataItem.match_time + "</p>\n" +
        "            <p>数&#12288&#12288量：" + dataItem.seatList.length + "</p>\n" +
        "            <p>支付状态：" + str + "￥" + dataItem.total_price + " </p>\n" +
        "        </div>\n" +
        "        <div class=\"clear\"></div>\n" +
        "    </div>";


    return content;
}

function showTicketList(index) {
    if (pageData !== null && pageData !== undefined) {
        //自定义标题风格
        var content = buildUpContent(pageData[parseInt(index)]);

        layer.open({
            type: 1,
            title: false,
            skin: 'layui-layer-demo', //样式类名
            closeBtn: 0, //不显示关闭按钮
            anim: 2,
            shade: [0.9, '#a8c4f2'],
            shadeClose: true, //开启遮罩关闭
            content: content,
        });

    } else {
        layer.open({
            content: '糟糕，页面出错'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }
}