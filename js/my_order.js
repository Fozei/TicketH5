$(function () {

    $.ajax({
        url: DOMAIN+USER_ORDER_LIST,
        data: {
            'userID':USERID,
            'page': 1,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            // layer.close(index);
            console.log('data:'+data);
            if (data.code == 'success') {
				if (data.list==0)
				{
					$('#dev_ul').append('<div class="emptyTip">暂无信息</div>');	
				}else{
					create_details_data(data.list);
				}
            } else {
                alert("获取数据失败："+data.message);
            }
        }
    });
    function create_details_data(data) {
        // console.log('data.list:'+data.list[0].matchName);
        var htmls = '';
        $.each(data, function (v) {
            console.log(v+'data.list------:'+data[v].matchName);
            var p_html = getdata(data[v].seatList);
            htmls += "<div class='page'> "+
                "<span class='sp-ft-title'>"+data[v].matchName+"<span class='sp-ft-details'>&nbsp&nbsp比赛赛事：</span><span class=''>"+data[v].team+"</span></span>"+
           " <img class='img-line' src='images/line.png'> "+
               " <div style='float: left;'>" +
                "<img class='img-pictrue' src='"+data[v].matchPic+"'> " +
               " </div> " +
                "<div class='d-details'> "+ p_html +
                // "<p style='font-size: 0.474rem; color: #808080;letter-spacing: 0.15rem;'>座位号：<span style='font-size: 0.474rem; color: #1a1a1a;letter-spacing: 0rem;'>A区2排39座</span></p>" +
            "<p style='font-size: 0.474rem; color: #808080;'>比赛时间：<span style='font-size: 0.474rem; color: #1a1a1a;'>"+data[v].year_r+"</span></p> " +
            "<p style='font-size: 0.474rem; color: #1a1a1a; margin-left: 2.3555rem'>周"+data[v].week+"&nbsp&nbsp"+data[v].match_time+"</p> "+
            "</div>"+
            "<span style='float: left;position: absolute;right: 1.259rem;top: 5rem;color: #545454;font-size: 0.474rem'>共计<span>"+data[v].buy_num+"</span>张</span>"+
            "<div class='clear'></div>"+
                "<div style='position: relative; margin-top: 0.237rem;'>"+
                "<span style='position: absolute; color: #545454; font-size: 0.474rem;left: 1.185rem'>购票时间："+data[v].create_time+"</span>"+
            "<span style='position: absolute; right: 1.259rem;color: #545454;font-size: 0.474rem;'>已支付：<span style='color: #ec1c63;'>￥"+data[v].total_price+"</span></span>"+
            "</div>"+
            "</div>";
        });
        $('#dev_ul').append(htmls);
    }
    function getdata(data) {
        var p_html = '';
        $.each(data, function (p) {
            console.log("---"+p);
            p_html +=  "<p style='font-size: 0.474rem; color: #808080;letter-spacing: 0.15rem;'>座位号：<span style='font-size: 0.474rem; color: #1a1a1a;letter-spacing: 0rem;'>"+data[p].areaName+'区'+data[p].matchseat_line+'排'+ data[p].matchseat_column+'座'+"</span></p>" ;
        });
        return p_html;
    }

})