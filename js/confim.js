// var ticketID = getQueryString('ticketID');
// var timeID = getQueryString('timeID');
// var numStr = getQueryString('numStr');
(function (window) {

    'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);
var ticketID = 16;
var timeID = 5;
var numStr = 1;
var countdown = 60;
/*
ticketID=6;
timeID=18;
numStr='6_2';
*/
// var index = layer.load(0, {
// 	shade: [0.3, 'black'] //0.1透明度的白色背景
// });
$(function () {
    //得到订单信息
    // $.ajax({
    // 	url: DOMAIN + TICKET_ORDER,
    // 	data: {
    // 		'ticketID': ticketID,
    // 		'numStr': numStr,
    // 		'timeID': timeID
    // 	},
    // 	type: "POST",
    // 	async: false,
    // 	dataType: "json",
    // 	success: function(data) {
    // 		layer.close(index);
    // 		if (data.code == 'success') {
    // 			var data1 = data.data;
    // 			$('#t_title').html(data1.ticketName);
    // 			$('#ctimeContent').html(data1.timeName);
    // 			$('#addressContent').html(data1.address);
    // 			$('#seatStr').val(data1.seatStr);
    // 			$('#totalPrice').html(data1.totalPrice);
    // 			$('#totalPrice2').html(data1.totalPrice);
    // 			$('#t_num').html(data1.total_num);
    //
    // 		} else {
    // 			layer.msg(data.message);
    // 		}
    //
    //
    //
    // 	}
    // });
    var telReg = /^1(3|4|5|7|8)\d{9}$/;
    //点击提交按钮
    $('#submit').on('click', function () {
        var pay = 0;
        if ($('#dl-alipay').prop('checked')) {
            alert("支付宝支付");
            pay = 2;
        } else if ($('#dl-WeChat').prop('checked')) {
            alert("微信支付");
            pay = 1;
        }
        var $tel_val = $('#tel_num').val();
        var code_val = $('#code_num').val();
        // var pay = $('#pay_type').val();
        if (pay == 2) {
            layer.msg('您选择了支付宝支付');
        } else {
            layer.msg('您选择了微信支付');
        }
        // var index = layer.load(0, {
        //     shade: [0.3, 'black'] //0.1透明度的白色背景
        // });

        setTimeout(function () {
            showSuccessTips(5);
        }, 1000);

    });
    $('.del').click(function () {

        $('#tel_num').val('');
    })

    //交换支付方式
    $('.pay li').click(function () {
        $('.pay li p').removeClass('active');
        $(this).find('p').addClass('active');
        $('#pay_type').val($(this).attr('data'));
    })
    $("#code_num").bind("input propertychange change", function (event) {
        //进行相关操作
        var l = $(this).val().length;
        //验证用户名
        if (l == 6) {
            close_key();
        }
    });
    $('#img_clear').click(function () {
        $('#tel_num').val('');
    });

    $('#dl-alipay').click(function () {
        if (!$('#dl-alipay').prop('checked')) {
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

function hide_pay(ordernum) {
    $.ajax({
        url: DOMAIN + TICKET_ORDER_STATUS,
        data: {
            'order_num': ordernum,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            var list = data.list;
            if (list['status'] == 1) {
                location.href = 'index.html';
            }
        }
    });
    setTimeout(function () {
        hide_pay(ordernum)
    }, 1000);

}

function setTimeFn(t) {
    if (countdown == 0) {
        t.attr("disabled", false);
        t.removeClass("getcoder_r");
        t.html('获取验证码');
        countdown = 60;
        return;
    } else {
        t.attr("disabled", true);
        t.addClass("getcoder_r");
        t.html("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
        setTimeFn(t)
    }, 1000)
}

function contentDown(secondsLeft) {
    if (secondsLeft <= 0) {
        window.location.href = "ticketconfirm.html";
        return;
    }
    $('#seconds').text(secondsLeft);
    secondsLeft -= 1;
    console.log($('#seconds') + secondsLeft);
    setTimeout(function () {
        contentDown(secondsLeft);
    }, 1000);

}

function showSuccessTips(secondsLeft) {
    layer.open({
        type: 1,
        title: false,
        skin: 'layui-layer-demo', //样式类名
        closeBtn: 0, //不显示关闭按钮
        anim: 2,
        shade: [0.9, '#a8c4f2'],
        shadeClose: true, //开启遮罩关闭
        area: ['12.6074rem', '12.6074rem'],
        content: "<div id=\"successTips\"><div id=\"seconds\">5</div></div>"
    });
    contentDown(secondsLeft);
}


function close_key() {
    document.activeElement.blur();
}


