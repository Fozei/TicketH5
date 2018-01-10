$(function () {

  layer.load(0, {
    shade: [0.3, 'black'] //0.1透明度的白色背景
  });
  var catId =getQueryString('catID')
  var page = 1;
  var key = '';
  eventView(catId,page,'')
  function eventView(catId,page,key) {
    $.ajax({
      type:"post",
      url:DOMAIN+TICKET_LIST,
      async: true,
      data: {
        catID:catId,
        page:page,
        keyword:key
      },
      success: function (data) {
        var data = eval("(" + data + ")");
        // var data_r=data.catData;
        var dataList=data.list;

        var le = dataList.length;
        var str='';

        $('.header .title').text(data.ctitle)
        // data.list
        for(var i=0;i<le;i++){
          if (i==0 || i%3==0) {
            str+='<div class="eventsList">';
          }
         str += '<a href="detail.html?id='+dataList[i].id+'">\n' +
           '                    <dl>\n' +
           '                        <dt><img src="'+dataList[i].pic+'"></dt>\n' +
           '                        <dd>'+dataList[i].title+'</dd>\n' +
           '                        <dd><span>'+dataList[i].starttime+'</span><em>'+dataList[i].price1+'元</em></dd>\n' +
           '                    </dl>\n' +
           '                </a>'
          if ((i+1)%3==0 || i==(le-1))
          {
            str+='</div>';
          }
        }
        $('.content').html(str);
        layer.closeAll();

      },
      error: function (error) {

      }
    })
  }
})
