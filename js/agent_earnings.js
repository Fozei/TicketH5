$(function () {
    //代理商收益
    $.ajax({
        url: DOMAIN + AGENT_EARNING,
        data: {
            'userID': USERID,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            // layer.close(index);
            if (data.code == 'success') {
                controlEarningsData(data.agentData);
            } else {
                alert("获取失败：" + data.message);
            }
        }
    });

    function controlEarningsData(data) {
        if (data.length > 0) {
            var m_money = 0;
            var eag_html = '';
            $.each(data, function (v) {
                m_money += data[v].money;
                eag_html += "<li>"+
                    "<span>"+data[v].addtime+"</span>"+
                    "<span>"+data[v].account+"</span>"+
                    "<span>"+data[v].discount+"</span>"+
                    "<span>"+data[v].money+"</span>"+
                "</li>";
            });
            $('#sp_money').html(m_money);
            $('#ul_eag_item').append(eag_html);
        } else {
            $('#sp_money').html('0');
        }


    }


})