var ticketID = getQueryString('ticketID');
var timeID = getQueryString('timeID');
var load;
var area;
var seatList;
if(ticketID == '' || timeID == '') {
	location.href = 'index.html';
}
var index = layer.load(0, {
	shade: [0.3, 'black'] //0.1透明度的白色背景
});
$('.header i').on('click', function() {
	window.history.back()
})
$(function() {

	//加载默认座位
	seatView('');
	//根据区域生成座位
	$('.main').on('touchstart', '.seatingPlanCon .areaC', function() {
		$('.seatListCon').empty();
		$('.seatRow').empty();
		$('.seatRow').css('height','0')
		area = $(this).attr('name');
		$('#checkedArea').html(area);
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		seatView(area);
	});
  $('.main').on('touchstart', '.seatingPlanCon .restarea', function () {
    layer.msg('该区域为休闲区');
    layer.close(index);
  });

  $('.main').on('touchstart', '.seatingPlanCon .unauthorized', function () {
    layer.msg('该区域已售完');
    layer.close(index);
  });
	//选座
	$('.main').on('click', '.setSite', function() {

		if($(this).hasClass('notBg')) {
			//layer.msg('座位已被购买!');
			return false;
		}
		var seatId = $(this).attr('sid');
		var areaID = $(this).attr('aid');
		var seatIndex = $(".setSite").index(this);
		if($(this).hasClass('optionalBg')) {
			$(this).addClass('selected');
			$(this).removeClass('optionalBg');
			var index = layer.load(0, {
				shade: [0.3, 'black'] //0.1透明度的白色背景
			});
			$.ajax({
				url: DOMAIN + TICKET_EXAMINE,
				data: {
					"ticketID": ticketID,
					"areaID": areaID,
					"seatID": seatId,
					"timeID": timeID,
				},
				type: "POST",
				dataType: "json",
				beforeSend: function(data) {

				},
				success: function(data) {
					if(data.seatList.status == 0) {
						var timeList = data.timeList;
						var seatList = data.seatList;
						$('.checkSeat').show();
						 $('.checkSeatList').prepend(' <div class="coord seat' + seatId + '"  aid="'+areaID+'" sid="'+seatId+'">\n' +
              '                <span>'+seatList.areaName+'区'+seatList.line+'排'+seatList.column+'座'+'</span>\n' +
              '                <em>'+'￥'+seatList.price+'</em>\n' +
              '                <i class="deleteCheckSeat"></i>\n' +
              '            </div>');
						  //$('.checkSeatList').append('<div class="Seat seat' + seatId + '" aid="' + areaID + '" sid="' + seatId + '"></div>');

					} else {

					}
					layer.close(index);
				},

				error: function(error) {
					console.log(error)
				}
			});
		} else if($(this).hasClass('selected')) {
			$(this).removeClass('selected')
			$(this).addClass('optionalBg')
			$(".seat" + seatId).remove();
			if($('.checkSeatList').children('.Seat').length == 0) {
				$('.checkSeat').hide()
			}
		}
	});
	//点击删除，删除座位
  $('.main').on('click', '.deleteCheckSeat', function () {
    var sid = $(this).parent('.coord').attr('sid');
    $(this).parent('.coord').remove();
    $('.setSeat' + sid).removeClass('selected');
    $('.setSeat' + sid).addClass('optionalBg');
    $('.seat' + sid).remove();
    if($('.checkSeatList').children('.coord').length=='0'){
      $('.checkSeat').hide();
    }
  });
	//点击购买按钮
	$('#buyBtn').click(function() {
		var data = new Array();
		var i = 0;
		$(".coord").each(function() {
			var aid = $(this).attr('aid');
			var sid = $(this).attr('sid');
			data[i] = new Array(aid, sid, '', '');
			i++;
		});
		if(data.length == 0) {
			layer.msg('请选择座位');
			return false;
		}
		
		$.ajax({
			url: DOMAIN + TICKET_ADDORDER,
			data: {
				'ticketID': ticketID,
				'seatData': data,
				'timeID': timeID,
				'userID': USERID,
				'source':2
			},
			type: "POST",
			async: false,
			dataType: "json",
			success: function(data) {
				if(data.code == 'error') {
					layer.msg(data.message);
					return false;
				} else {
					location.href = data.codeUrl;
				}

			}
		});

	})
})

function seatView(area) {
	$.ajax({
		url: DOMAIN + TICKET_SEAT,
		data: {
			"ticketID": ticketID,
			"areaName": area,
			"timeID": timeID
		},
		type: "POST",
		dataType: "json",
		beforeSend: function(data) {

		},
		success: function(data) {
			console.log(data)
			if(data.code == 'error') {
				layer.msg(data.message);
				layer.close(index);
				return false;
			} else {
				// seatList = data.seatList.reverse()
        var tit =data.timeList
        // console.log(tit)
        var gameTit = tit.year_r+" 周"+tit.week+' '+tit.time
        $('.seatingPlanTit span').text(gameTit)
				seatList = data.seatList;
				var oddSeatList = data.oddSeatList;
				var areaList = data.areaList;
				var areaID = areaList.id;
				var areaName = areaList.name;
				var type = areaList.type;
				var start_row = areaList.start_row;
				var end_row = areaList.end_row;
				var start_seat = areaList.start_seat;
				var end_seat = areaList.end_seat;
				var increase = areaList.increase;
				var odd_end_seat = areaList.odd_end_seat;
				var even_end_seat = areaList.even_end_seat;
				var two_equally = areaList.two_equally;
				var end = '';
				$('#checkedArea').html(areaName);
				$('.area' + areaName).addClass('checked');
				$('.seatListCon').empty();
				var s = 1;
				var t = 1;
				var first = '';
				var m;
				var u = 0;
				var str = '';
				var lineStr = '';

				var lineData = new Array();
				if(type == 2) {
					end = end_row;
				} else if(type == 0) {
					end = (parseInt(end_seat) - parseInt(start_seat)) / 2 + 1;
				}
				//118 = 座位的宽度+右边的间距
				var seatLineWidth = (118 ) * end/67.5;
				if(type != 1) {
					if(increase == 1) {
						var k = 0;
						var l = 1;
						var b=0

						for(var m = parseInt(start_row); m <= parseInt(end_row); m++) {
							lineData[b] = end + k;
							seatLineWidth = (118 ) * (end + k)/67.5;
							 if (((l+1)%2==0 ) && two_equally==1){
								 k++;
							  }else if (two_equally==0)
							  {
								   k++;
							  }
							  b++;
							  l++;
						}

						first = lineData.shift();

					}
					var lin = 0;
					 $('.seatListCon').css('width', seatLineWidth + 'rem');
					for(var i = 0; i < seatList.length; i++) {

						if(increase == 1) {

							if(s == 1) {
								var top = 1.318518518518519 * u;
								str += '<div class="seatLine  clearFix" style="top:' + top + 'rem;width:'+seatLineWidth+'rem">';
								lineStr += '<span>' + seatList[i].line + '</span>';
								lin++
							}
						} else {
							if(s == 1 || (s - 1) % end == 0) {
								var top = 1.318518518518519 * u;
								str += '<div class="seatLine  clearFix" style="top:' + top + 'rem;width:'+seatLineWidth+'rem">';
								lineStr += '<span>' + seatList[i].line + '</span>';
								lin++
							}
						}
						if(seatList[i]['status'] == 0) {
							var classStr = 'optionalBg';
						} else {
							var classStr = 'notBg';
						}
						str += '<div  class="' + classStr + ' setSite setSeat' + seatList[i]['id'] + '" line="' + seatList[i]['line'] + '" aid="' + areaID + '" sid="' + seatList[i]['id'] + '">' + seatList[i]['column'] + '</div>';

						if(increase == 1) {

							if(s % first == 0) {
								u++;
								s = 0;
								first = lineData.shift();
								str += '</div>';
							}
						} else {
							if(s % end == 0) {
								u++;
								str += '</div>';
							}
						}
						s++;
						t++;
						$('.seatRow').css('height', (lin * 89) / 67.5 + 'rem')
					}
					$('.seatRow').html(lineStr)
					$('.seatListCon').html(str);
					var m_t = top + 3;
					$('#empty_div').css({
						'margin-top': m_t + 'rem'
					});
				} else if(type == 1) {
					//中间是1的座位情况
					//左边是偶数座位，右边是奇数座位

					end = (parseInt(even_end_seat) - 2) / 2 + 1;
					//119 = 座位的宽度+右边的间距+1
					var seatLineWidth1 = (119 ) * end/67.5;
					str += showSeat(end, seatList, 2, areaID);
					end = (odd_end_seat - 1) / 2 + 1;
					seatLineWidth1+=(119 ) * end/67.5;
					str += showSeat(end, oddSeatList, 1, areaID);
					$('.seatListCon').html(str);
					$('.seatListCon').css('width', seatLineWidth1 + 'rem');

				}

			}
			layer.close(index);
      $('.coord').each(function () {
        var parentSid = $(this).attr('sid')
        $('.setSite').each(function () {
          if(parentSid == $(this).attr('sid')){
            $(this).removeClass('optionalBg')
            $(this).addClass('selected')
					}

        })
      })

		},
		error: function(error) {
			console.log(error)
		}
	});
}
//中间为1显示座位
function showSeat(end, s_list_2, type, areaID) {
	var i = 1;
	var str = '';
	var lineStr = '';
	var widthStr = '';
	var newData = new Array();
	var n = s_list_2.length;

	var u = 0;
	var s = 0;
	widthStr = (end * (88 + 20)) / 67.5;
	var lin =0
	str += '<div class="seat_left" style="width:' + widthStr + 'rem;">';
	for(var k = 0; k < n; k++) {
		if(i == 1 || (i - 1) % end == 0) {
			var top = 1.318518518518519 * u;
			str += '<div class="seatLine_r" style="top:' + top + 'rem;width:' + widthStr + 'rem;">';
			if(type == 2) {
				lineStr += '<span>' + s_list_2[k]['line'] + '</span>';
				lin++
			}
		}
		if(type == 2) {
			newData[s] = new Array(s_list_2[k]);
			s++;
			if(i % end == 0) {
				newData.reverse();
				var m = newData.length;
				for(var b = 0; b < m; b++) {
					if(newData[b][0]['status'] == 0) {
						var classStr = 'optionalBg';
					} else {
						var classStr = 'notBg';
					}
					str += '<div style="margin-right: 0.2962962962962963rem"  class="' + classStr + ' setSite setSeat' + newData[b][0]['id'] + '" aid="' + areaID + '" line="' + newData[b][0]['line'] + '" sid="' + newData[b][0]['id'] + '">' + newData[b][0]['column'] + '</div>';
				}
				s = 0;

			}

		} else {
			if(s_list_2[k]['status'] == 0) {
				var classStr = 'optionalBg';
			} else {
				var classStr = 'notBg';
			}
			str += '<div style="margin-right: 0.2962962962962963rem"  class="' + classStr + ' setSite" aid="' + areaID + '" line="' + s_list_2[k]['line'] + '" sid="' + s_list_2[k]['id'] + '">' + s_list_2[k]['column'] + '</div>';
		}
		if(i % end == 0) {
			u++;
			str += '</div><div class="clear"></div>';
		}
		i++;

	}
	str += '</div>';
	if(type == 2) {
		$('.seatRow').html(lineStr);
		$('.seatRow').css('height', (lin * 89) / 67.5 + 'rem')
	}

	return str;
}


