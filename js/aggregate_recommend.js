$('.nav li').on('touchstart', function (e) {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
});
$('.head .backUp').on('touchstart', function (e) {
    window.history.back();
});
$(function () {
    //累计推荐
    $.ajax({
        url: "http://192.168.1.78/ticket/api/agentlist.php",
        data: {
            'userID': USERID,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            // layer.close(index);
            if (data.code == 'success') {
                controlRecommendData(data.agentData);
            } else {
                alert("获取失败：" + data.message);
            }
        }
    });

    function controlRecommendData(data) {
        var rel_html = '';
        if (data.length > 0) {
            $('#sp_money').html(data.length);
            $.each(data, function (v) {
                rel_html += "<li>" +
                    "<span>" + (v + 1) + "</span>" +
                    "<span>" + data[v].addtime + "</span>" +
                    "<span>" + data[v].account + "</span>" +
                    "<span>" + data[v].discount + "</span>" +
                    "</li>";
            });
            $('#ul_red_item').append(rel_html);
        } else {
            $('#sp_money').html('0');
        }

    }

})
