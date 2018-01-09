$(function () {

    $.ajax({
        url: "http://192.168.1.78/ticket/api/catlist.php",
        data: {},
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 'success') {
                console.log(data.logData);
                adapter_classify(data);
            } else {
                alert("获取数据失败：" + data.message);
            }
        }
    });
    clssify_data(USERID, 1, null, null, null);

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

    function adapter_classify(data) {
        var ap_html = '';
        $.each(data.catData, function (v) {
            if (v == 0) {
                ap_html += "<p class='p_none' data=" + data.catData[v].id + ">" + data.catData[v].name + "</p>";
            } else {
                ap_html += "<p class='p_vis' data=" + data.catData[v].id + ">" + data.catData[v].name + "</p>";
            }
        })
        $('#classify').append(ap_html);
    }

    $('#classify p').on('click', function (e) {
        console.log($(this).attr('data'))
        var opst = $(this).attr('data');
        $("#catList").animate({top: "28rem", height: "0rem"});
        clssify_data(USERID, 1, null, opst, null);
    });

    function clssify_data(userID, page, startTime, catID, endTime) {
        console.log('进行网络请求catID:' + catID);
        $.ajax({
            url: "http://192.168.1.78/ticket/api/income.php",
            data: {
                'userID': userID,
                'page': page,
                'startTime': startTime,
                'catID': catID,
                'endTime': endTime,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.code == 'success') {
                    console.log(data.logData);
                    adapter_profit(data);
                    // adapter_classify(data);
                } else {
                    alert("获取数据失败：" + data.message);
                }
            }
        });
    }

    $('#cat_deta').click(function () {
        var start_time = $('#startDate').val();
        var end_time = $('#endDate').val();
        var today = new Date().getTime();
        var st_time = new Date(start_time).getTime();
        var ed_time = new Date(end_time).getTime();
        if (isNaN(st_time) && isNaN(ed_time)) {
            return;
        }
        if (isNaN(st_time)) {
            alert('起始时间为空');
            return;
        }
        if (isNaN(ed_time)) {
            alert('结束时间为空');
            return;
        }
        if (st_time >= today) {
            alert('起始时间大于或等于当前时间');
            return;
        }
        if (ed_time > today) {
            alert('结束时间大于当前时间');
            return;
        }
        if (st_time >= ed_time) {
            alert('起始时间不可大于或等于结束时间');
            return;
        }
        console.log(getLocalTime(st_time));
        clssify_data(USERID, 1, getLocalTime(st_time), null, getLocalTime(ed_time));
    });
    // 时间戳转换成       年-月-日
    function getLocalTime(nS) {
        var ad = new Date(parseInt(nS));
        var Y = ad.getFullYear() + '-';
        var M = (ad.getMonth()+1)+ '-';
        var D = ad.getDate() + ' ';
        ad = Y+M+D;
        return ad;
    }
});