	layer.load(0, {
		 shade: [0.3, 'black'] //0.1透明度的白色背景
	  });
		var catID=getQueryString('catID');
		var keyword=getQueryString('keyword');
		if (keyword!=null)
		{
			var searchUrl = window.location.href;//截取 url中的“=”,获得“=”后面的参数  
			var searchData = searchUrl.split("="); //decodeURI解码  
			var searchText = decodeURI(searchData[1]); //将搜索的数据显示在搜索页面的搜索框中 
		}
		
		$(function(){

			//加载数据
			$.ajax({
				url:DOMAIN + TICKET_LIST,
				data:{
					'catID':catID,
					'keyword':searchText,
					'page'   :1
				},
				type:"POST",
				dataType:"json",
				success:function(data){
				
					console.log(data)
					var data_r=data.list;
					var l=data_r.length;
					var str='';
					$('#class_title').html(data.ctitle);
					str=getContent(data_r,l);
					if (str==''){
						$('#emptyData').show();
					}else{
						$('#emptyData').hide();
					}
					$('#contentValue').html(str);
					$('#page').val(2);
					layer.closeAll('loading');

				}
			});
			$(window).scroll(function() {  
			  //当内容滚动到底部时加载新的内容  
			  if ($(this).scrollTop() + $(window).height() + 20 >= $(document).height() && $(this).scrollTop() > 20) {  
				  //当前要加载的页码 
				  var page = $('#page').val();
				  $.ajax({
					url:DOMAIN + TICKET_LIST,
					data:{
						'catID':catID,
						'keyword':keyword,
						'page'   :page
					},
					type:"POST",
					dataType:"json",
					success:function(data){
						var data_r=data.list;
						var l=data_r.length;
						var str='';
						str=getContent(data_r,l);
						if (str==''){
							$('#emptyData').show();
						}else{
							$('#emptyData').hide();
						}
						$('#contentValue').append(str);
						$('#page').val((parseInt(page)+1));

					}
				});  
			  }  
		  });  
		})

		function getContent(data_r,l){
			var str='';
			for(var i=0;i<l;i++){
						
				str+='<div class="cat" >';
				str+='<div class="c-left left">';
				str+='<a href="detail.html?id='+data_r[i]['id']+'"><img src="'+data_r[i]["pic"]+'" style="width:4.8296296rem;height:3.88148148rem" /></a>';
				str+='</div>';
				str+='<div class="c-right left">';
				str+='<div class="title"><a href="detail.html?id='+data_r[i]['id']+'">'+data_r[i]["title"]+'</a></div>';

				str+='<div class="date">';
				str+='<img src="images/date.png" style="margin-right:0.148148148rem;">'+data_r[i]["starttime"]+' 至 '+data_r[i]["endtime"]+'';
				str+='</div>';

				str+='<div class="area">';
				str+='<img src="images/position.png" style="margin-right:0.148148148rem;"/>'+data_r[i]["address"];
				str+='</div>';

				str+='<div class="action">';
				str+='<div class="price left">';
				str+='<span class="price">'+data_r[i]["price2"]+'元</span>';
				str+='<span class="status" style="margin-left:0.148148148rem;">售票中</span>';
				str+='</div>';
				str+='<div class="book right">';
				str+='<a href="detail.html?id='+data_r[i]['id']+'"><img src="images/booking.png" style="margin-right:0.148148148rem;" class="bookingImg">立即预定</a>';
				str+='</div>';
				str+='</div>';
				str+='</div>';
				str+='</div>';
			}
			return str;
		}