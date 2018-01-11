var ticketID = getQueryString('ticketID');
var timeID = getQueryString('timeID');
var load;
var area;
var seatList;
if (ticketID=='' || timeID=='')
{
	location.href='index.html';
}
var index = layer.load(0, {
	shade: [0.3, 'black'] //0.1透明度的白色背景
});
 $('.header i').on('click',function () {
	 window.history.back()
 })
$(function () {

	//加载默认座位
	seatView('');
	//根据区域生成座位
	$('.main').on('click', '.seatingPlanCon>div', function () {
		$('.seatListCon').empty();
		area = $(this).attr('name');
		$('.seatTit span').html(area);
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		seatView(area);

	});
	//选座
	$('.main').on('click', '.setSite', function () {
	  
		if ($(this).hasClass('notBg'))
		{
			//layer.msg('座位已被购买!');
			return false;
		}
		var seatId = $(this).attr('sid');
		var areaID = $(this).attr('aid');
		var seatIndex = $(".setSite").index(this);
		if ($(this).hasClass('optionalBg')) {
			$(this).addClass('selected');
			$(this).removeClass('optionalBg');
			var index = layer.load(0, {
				shade: [0.3, 'black'] //0.1透明度的白色背景
			});
			  $.ajax({
				url: DOMAIN + TICKET_EXAMINE,
				data: {
				  "ticketID":ticketID,
				  "areaID":areaID,
				  "seatID":seatId,
				  "timeID":timeID,
				},
				type: "POST",
				dataType: "json",
				beforeSend:function (data) {

				},
				success: function (data) {
				  if(data.seatList.status==0){
					  var timeList = data.timeList;
					  var seatList = data.seatList;
					   $('.checkSeat').show();
					  $('.checkSeatList').append('<div class="Seat seat'+seatId+'" aid="'+areaID+'" sid="'+seatId+'">\n' +
						  '\t\t\t\t\t\t<div class="seatInformation">\n' +
						  '\t\t\t\t\t\t\t<span class="colorBlue">'+timeList.year_r+'&nbsp;周'+timeList.week+'&nbsp;'+timeList.time+'</span><span class="colorBlue marLeft">'+seatList.areaName+'区'+seatList.line+'排'+seatList.column+'座'+'</span><span class="price marLeft">'+seatList.price+'元</span>\n' +
						  '\t\t\t\t\t\t</div>\n' +
						  '\t\t\t\t\t\t<div class="information clearFix">\n' +
						  '\t\t\t\t\t\t\t<div class="left name_idNum">\n' +
						  '\t\t\t\t\t\t\t\t<div>\n' +
						  '\t\t\t\t\t\t\t\t\t<label class="clearFix"><span class="left">姓</span><span class="right">名</span></label>\n' +
						  '\t\t\t\t\t\t\t\t\t<input type="text" id="name'+seatId+'" value="" />\n' +
						  '\t\t\t\t\t\t\t\t</div>\n' +
						  '\t\t\t\t\t\t\t\t<div>\n' +
						  '\t\t\t\t\t\t\t\t\t<label>身份证号</label>\n' +
						  '\t\t\t\t\t\t\t\t\t<input type="text" id="idNumber'+seatId+'" value="" />\n' +
						  '\t\t\t\t\t\t\t\t</div>\n' +
						  '\t\t\t\t\t\t\t</div>\n' +
						  '\t\t\t\t\t\t\t<div class="left save_delete_btn">\n' +
						  '\t\t\t\t\t\t\t\t<input type="button" id="delete" class="deleteCheckSeat" value="删除" />\n' +
						  '\t\t\t\t\t\t\t</div>\n' +
						  '\t\t\t\t\t\t</div>\n' +
						  '\t\t\t\t\t</div>');
					  
					
				  }else{

				  }
				  layer.close(index);
				},

				error: function (error) {
				  console.log(error)
				}
			  });
		} else if ($(this).hasClass('selected')) {
			$(this).removeClass('selected')
			$(this).addClass('optionalBg')
			$(".seat"+seatId).remove();
		} 
	});
	//点击删除，删除座位
	$('.main').on('click', '.deleteCheckSeat', function () {
		var sid=$(this).parents('.Seat').attr('sid');
		$(this).parents('.Seat').remove();
		$('.setSeat'+sid).removeClass('selected');
		$('.setSeat'+sid).addClass('optionalBg');
	});
  //点击购买按钮
	$('#buyBtn').click(function(){
		var data=new Array();
		var i=0;
		$(".Seat").each(function(){
			var aid = $(this).attr('aid');
			var sid = $(this).attr('sid');
			var name = $('#name'+sid).val();
			var idCard = $('#idNumber'+sid).val();
			data[i]= new Array(aid,sid,idCard,name);
			i++;
		});
		if (data.length==0)
		{
			layer.msg('请选择座位');
            return false;
		}
		for (var i=0;i<data.length;i++)
		{
			
			if (data[i][2]=='')
			{
				layer.msg('请填写身份证');
				return false;
			}else if (!ChinaIdChecker_r(data[i][2]))
			{
				layer.msg('请填写正确身份证');
				return false;
			}
			if (data[i][3]=='')
			{
				layer.msg('请填写姓名');
				return false;
			}
		}
		$.ajax({
            url: DOMAIN + TICKET_ADDORDER,
            data: {
                'ticketID': ticketID,
                'seatData': data,
                'timeID': timeID,
				'userID':USERID
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.code == 'error') {
                    layer.msg(data.message);
                    return false;
                } else {
                    location.href=DOMAIM_API+'web/ticketconfirm.php?ticketID='+ticketID+'&orderNum='+data.orderNum+'&timeID='+timeID;
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
		  beforeSend:function (data) {
			
		  },
		  success: function (data) {
			if (data.code == 'error') {
			   layer.msg(data.message);
			   return false;
			} else {
			  // seatList = data.seatList.reverse()
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
			  var end='';
			  $('#checkedArea').html(areaName);
			  $('.area'+areaName).addClass('checked');
			  $('.seatListCon').empty();
			  var s=1;
			  var t=1;
			  var first='';
			  var m;
			  var u=0;
			  var str='';
			  var lineData = new Array();
			  if (type==2)
			  {
				  end=end_row;
			  }else if (type==0)
			  {
				  end=(parseInt(end_seat) - parseInt(start_seat))/2+1;
			  }
			  if (type!=1)
			  {
				if (increase==1){
					var k=0;

					for (var m=parseInt(start_row);m<=parseInt(end_row);m++ )
					{
						lineData[k]=end+k;
						k++;
					}
					
					first = lineData.shift();
								
				}
				for (var i = 0; i < seatList.length; i++) {
					
					if (increase==1){
						
						if(s==1){
							var top = 0.740*u;
							str+='<div class="seatLine  clearFix" style="top:'+top+'rem">';
						}
					}else{
						if(s==1 || (s-1) % end==0){
							var top = 0.740*u;
							str+='<div class="seatLine  clearFix" style="top:'+top+'rem">';
						}
					}
					if (seatList[i]['status']==0)
					{
						var classStr='optionalBg';
					}else{
						var classStr='notBg';
					}
					str+='<div  class="'+classStr+' setSite setSeat'+seatList[i]['id']+'" line="'+seatList[i]['line']+'" aid="'+areaID+'" sid="'+seatList[i]['id']+'">'+seatList[i]['column']+'</div>';
					
					if (increase==1){
					
						if(s % first==0){
							u++;
							s=0;
							first = lineData.shift();
							str+='</div>';
						}
					}else{
						if(s % end==0){
							u++;
							str+='</div>';
						}
					}
					s++;
					t++;
				}
				$('.seatListCon').html(str);
				var m_t = top+1;
				$('.seatMark').css({'margin-top':m_t+'rem'});
			  }else if (type==1)
			  {
				  //中间是1的座位情况
				  //左边是偶数座位，右边是奇数座位
				 
				  end=(parseInt(even_end_seat) - 2)/2+1;
				  str+=showSeat(end,seatList,2,areaID);
				  end=(odd_end_seat - 1)/2+1;
				  str+=showSeat(end,oddSeatList,1,areaID);
				  $('.seatListCon').html(str);
				   
			  }
			  
			  layer.close(index);

			 
			}

		  },
		  error: function (error) {
			console.log(error)
		  }
		});
	}
	//中间为1显示座位
  function showSeat(end,s_list_2,type,areaID){
	var i=1;
	var str='';
	var widthStr='';
	var newData=new Array();
	var n=s_list_2.length;

	var u=0;
	var s=0;
	widthStr=(end*(38+13.985))/67.5;
	str+='<div class="seat_left" style="width:'+widthStr+'rem;">';
	for(var k=0;k<n;k++){
		if(i==1 || (i-1) % end==0){
			var top = 0.740*u;
			str+= '<div class="seatLine_r" style="top:'+top+'rem">';
		}
		if (type==2){
			newData[s]=new Array(s_list_2[k]);
			s++;
			if (i % end==0){
				newData.reverse();
				var m=newData.length;
				for(var b=0;b<m;b++){
					if (newData[b][0]['status']==0)
					{
						var classStr='optionalBg';
					}else{
						var classStr='notBg';
					}
					str+= '<div style="margin-right: 0.20rem"  class="'+classStr+' setSite setSeat'+newData[b][0]['id']+'" aid="'+areaID+'" line="'+newData[b][0]['line']+'" sid="'+newData[b][0]['id']+'">'+newData[b][0]['column']+'</div>';
				}
				s=0;
				
			}
			
		}else{
			if (s_list_2[k]['status']==0)
			{
				var classStr='optionalBg';
			}else{
				var classStr='notBg';
			}
			str+= '<div style="margin-right: 0.20rem"  class="'+classStr+' setSite" aid="'+areaID+'" line="'+s_list_2[k]['line']+'" sid="'+s_list_2[k]['id']+'">'+s_list_2[k]['column']+'</div>';
		}
		if(i % end==0){
			u++;
			str+= '</div><div class="clear"></div>';
		}
		i++;
		
	}
	str+='</div>';
	
	return str;
  }