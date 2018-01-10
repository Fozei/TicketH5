var ticketID = getQueryString('ticketID');
var timeID = getQueryString('timeID');
var orderNum = getQueryString('orderNum');
//var ticketID = 16;
//var timeID = 1;
//var orderNum = '151497547247394';
var countdown = 60;

var index = layer.load(0, {
	shade: [0.3, 'black'] //0.1透明度的白色背景
});
$(function () {
    //得到订单信息
    $.ajax({
    url: DOMAIN + TICKET_ORDER,
    data: {
     		'ticketID': ticketID,
     		'orderNum': orderNum,
     		'timeID': timeID
     	},
     	type: "POST",
     	async: false,
     	dataType: "json",
     	success: function(data) {
			var list = data.list;
			var title = data.title;
			var address = data.address;
			var timeList = data.timeList;
			var n = list.length;
			var str='';
			for(var i=0;i<n;i++){
				var seatList= list[i].seatList;
				var total_price = list[i]['total_price'];
				str+='<div class="tab-order-details-all">';
				str+='<p class="order-title">'+title+'</p>';
				str+='<div class="tab-order-li">';
                str+='<p class="tab-order-competition-schedule">比赛日程</p>';
                str+='<p class="tab-order-competition-schedule-details">'+timeList.team+' '+timeList.year_r+' 周'+timeList.week+' '+timeList.time+' </p>';
                str+='<p class="clear-clear"></p>';
				str+='</div>';
				str+='<div class="tab-order-li ">';
                str+='<p class="tab-order-competition-schedule">比赛地点</p>';
                str+='<p class="tab-order-competition-schedule-details">'+address+'</p>';
                str+='<p class="clear-clear"></p>';
				str+='</div>';
				str+='<div class="tab-order-li">';
                str+='<p class="tab-order-competition-schedule">座位号</p>';
                str+='<p class="tab-order-competition-schedule-details">'+list[i]['areaName']+'区'+seatList.line+'排'+seatList.column+'座</p>';
                str+='<p class="clear-clear"></p>';
				str+='</div>';
				str+='<div class="tab-order-li">';
                str+='<p class="tab-order-competition-schedule">数 量</p>';
                str+='<p class="tab-order-competition-schedule-details">1张</p>';
                str+='<p class="clear-clear"></p>';
				str+='</div>';
				str+='<div class="tab-order-li">';
                str+='<p class="tab-order-competition-schedule">票 价</p>';
                str+='<p class="tab-order-competition-schedule-price">'+seatList.price+'元</p>';
                str+='<p class="clear-clear"></p>';
				str+='</div>';
				if (n>1 && i<(n-1))
				{
					str+='<img class="img-oder-line" src="images/order-line.jpg">';
				}
				str+='</div>';
			}
			$('#orderContent').html(str);
			$('#totalPrice2').html(total_price);
     		layer.close(index);
   
     	}
     });
    var telReg = /^1(3|4|5|7|8)\d{9}$/;
    //点击提交按钮
    $('#submit').on('click', function () {
        var pay = 1;
		if ($('#dl-alipay').prop('checked')){
            pay = 2;
		} else if($('#dl-WeChat').prop('checked')){
            pay = 1;
		}
        var index = layer.load(0, {
            shade: [0.3, 'black'] //0.1透明度的白色背景
        });

        //验证验证码
        $.ajax({
            url: DOMAIN + TICKET_VERIFY,
            data: {
                'ticketID': ticketID,
                'orderNum': orderNum,
                'timeID': timeID,
                'payType': pay
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                layer.close(index);
                if (data.code == 'error') {
                    layer.msg(data.message);
                    return false;
                } else {
                    location.href='qr-pay.html?ticketID='+ticketID+'&orderNum='+orderNum+'&timeID='+timeID+'&payType='+pay;
                }


            }
        });

    })
    //交换支付方式
    $('.pay li').click(function () {
        $('.pay li p').removeClass('active');
        $(this).find('p').addClass('active');
        $('#pay_type').val($(this).attr('data'));
    })

    $('#img_clear').click(function () {
        $('#tel_num').val('');
    });

    $('#dl-alipay').click(function () {
        if (!$('#dl-alipay').prop('checked')){
            $('#dd-alipay').removeClass('dd-font-size-false');
            $('#dd-alipay').addClass('dd-font-size-true');
            $('#dd-WeChat').removeClass('dd-font-size-true');
            $('#dd-WeChat').addClass('dd-font-size-false');
            $('#dl-alipay').prop('checked', true);
            $('#dl-WeChat').prop('checked', false);
        }
    })
    $('#dl-WeChat').click(function () {
        if (!$('#dl-WeChat').prop("checked")) {
            $('#dd-alipay').removeClass('dd-font-size-true');
            $('#dd-alipay').addClass('dd-font-size-false');
            $('#dd-WeChat').removeClass('dd-font-size-false');
            $('#dd-WeChat').addClass('dd-font-size-true');
            $('#dl-WeChat').prop('checked', true);
            $('#dl-alipay').prop('checked', false);
        }
    })
});







function close_key() {
    document.activeElement.blur();
}
