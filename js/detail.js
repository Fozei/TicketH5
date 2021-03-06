var targetId;
targetId = getQueryString('id');
if (targetId === '' || targetId === null) {
    location.href = 'index.html';
}

function parseDetailData(data) {
    if (data.code === "success") {
        var address = data.data.address;
        var pic = data.data.pic;
        var title = data.data.title;
        var price = data.data.price1 + "元";
      // var price = data.data.price1 + " - " + data.data.price2 + "元";
      var date = data.data.starttime + " 至 " + data.data.endtime;
        var desc = data.data.notice;
        var content = data.data.content;
        var timeList = data.timeList;
		var catName = data.data.catName;
        $('#is_buy').val(data.data.is_buy);
        //设置海报
        $("#poster").attr("src", pic);
        $("#title").text(title);
        $("#area").text(address);
        $("#price").text(price);
        $(".date").append(date);
        $(".matchArea").append(address);
        $("#introduction").html(content);

        //表格标题
        $("#matchListTitle").html(title + "<br/>" + "竞赛日程表");
        var table = $(".matchTable");
        //表头
		var tableStr='<tr  matchId="title"><th>序号</th><th>日期</th><th>周</th>';
		if (catName!='体操')
		{
			tableStr+='<th>比赛队</th>';
		}
		
		tableStr+='<th>比赛时间</th><th>类别</th><th>选座购票</th></tr>';
        table.append(tableStr);
		var c_str='';
        //表格数据
        for (var i = 0; i < timeList.length; i++) {
            var date = timeList[i].year_r;
            var week = timeList[i].week;
            var turn = timeList[i].turn;
            var team = timeList[i].team;
            var time = timeList[i].time;
			c_str='<tr  matchId=' + targetId + ' timeID=' + timeList[i]['id'] + '><td>' + (i + 1) + '</td><td  matchId=' + targetId + ' timeID=' + timeList[i]['id'] + '>' + date + '</td><td>' + week + '</td>';
			if (catName!='体操')
			{
				c_str+='<td>' + team + '</td>';
			}
			c_str+='<td>' + time + '</td><td>' + turn + '</td><td class="btnSelectSeat"><a style="color: white" href="javascript:;" targetid="' + targetId + '" timeid="' + timeList[i].id + '">选座购票</a></td></tr>';
            table.append(c_str);
        }

        $("#notice").html(desc);
        $('.matchTable tbody tr td a').on('click', function () {
            var targetId = $(this).attr('targetid')
            var timeId = $(this).attr('timeid')
            var USERID = getCookie(COOKIE_NAME_USER_ID);
            if (USERID === undefined || USERID === null || USERID === '') {
                var count = 0, TIME_COUNT = 3, time;
                $('.mask').addClass('fadeSlier-enter-active')
                $('.notLogin').addClass('addCar-enter-active')
                if (!time) {
                    count = TIME_COUNT;
                    time = setInterval(function () {
                        if (count > 1 && count <= TIME_COUNT) {
                            count--;
                            $('#count').text(count)
                            console.log(count)
                        } else {
                            clearInterval(time);
                            time = null;
                            $('.mask').removeClass('fadeSlier-enter-active')
                            $('.notLogin').removeClass('addCar-enter-active')
                            window.location.href = 'login.html'
                        }
                    }, 1000)

                }
            } else {
                window.location.href = 'seat.html?ticketID=' + targetId + '&timeID=' + timeId
            }
        })
    } else {
        alert("数据出错")
    }
}

$(function () {
    layer.open({type: 2});
    var url = window.location.search;
    if (url.replace(/(^s*)|(s*$)/g, "").length === 0) {
        layer.closeAll('loading');
        alert("数据出错");
    } else {

        if (targetId !== null) {

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

});
