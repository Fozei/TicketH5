$(function () {
  layer.load(0, {
    shade: [0.3, 'black'] //0.1透明度的白色背景
  });
  var catId = getQueryString('catID')
  classifyView(catId)
  function classifyView(catId) {
    $.ajax({
      type:"post",
      url:DOMAIN+TICKET_CAT2,
      async: true,
      data: {
        catID:catId
      },
      success: function (data) {
        var data = eval("(" + data + ")");
        var data_r=data.catData;
        var l=data_r.length;
        var str='';
        $('#cat_titile').html(data.ctitle);
        for(var i=0;i<l;i++){
          var match= data_r[i].matchData;
          console.log(match)
          if (i==0 || i%3==0)
          {
            str+='<div class="tab-classfiy dev-font-box">';
          }
          str+='<div class="tab-basketball">';
          str+='<a href="event_info.html?catID='+data_r[i].id+'"><div class="tab-left tab-classfiy-basketball">';
          str+='<img class="tab-img" src="'+data_r[i].pic+'">';
          str+='<p class="tab-txt-backetball">'+data_r[i]["name"]+'</p>';
          str+='</div></a>';
          if(match != 0){
            str+='<a href="detail.html?id='+match[0]+'"><img class="tab-left" width="283" height="340" src="'+match[0].pic+'"></a>';
            str+='<p class="tab-left-details tab-txt-details"><a href="detail.html?id='+match[0].id+'">'+match[0].title+'</a></p>';
          }
          str+='</div>';
          if ((i+1)%3==0 || i==(l-1))
          {
            str+='<div class="clear-clear"></div>';
            str+='</div>';
          }
        }

        if (str==''){
          str="<p style='text-align: center;margin-top:40px;font-size: 32px;'>没有信息</p>";
        }
        $('#contentValue').html(str);
        layer.closeAll();
      },
      error: function (error) {
        
      }
    })
  }

  console.log(catId)

})