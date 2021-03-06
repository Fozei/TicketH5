$('.nav li').on('touchstart',function(e) {
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
});
$('.head .backUp').on('touchstart',function(e) {
  location.href='user_center.html';
});

var myscroll;
var is_r = false;
var static = '';
var num = 0;//序号
var page = 1
var pageNull = null;
$('#more').hide();
$('#null').hide();
$('#loadOver').hide();

$(function () {
  layer.load(0, {
    shade: [0.3, 'black']
  })
  function loadMore(page) {
    $.ajax({
      url: DOMAIN + ADD_RECOMMEND,
      data: {
        'userID':USERID,
        "page": page
      },
      beforeSend: function () {
        $('#more').show();
      },
      type: "POST",
      async: false,
      dataType: "json",
      success: function (data) {
        // console.log(data)
        if (data.code == 'success') {
          $('#num').text(data.totalCount)
          $(data.agentData).each(function (i,item) {
            num++
            $('.tipListsCon>ul').append(' <li>\n' +
                  '                    <span>'+num+'</span>\n' +
                  '                    <span>'+item.addtime+'</span>\n' +
                  '                    <span>'+item.account+'</span>\n' +
                  '                    <span>'+item.discount+'折</span>\n' +
                  '                </li>')
          })
          if(data.agentData == 0){
            pageNull = false
          }
        } else {
          console.log("获取失败：" + data.message);
        }
      },
      complete: function () {
        layer.closeAll();
        $('#more').hide();
      },
      error: function (error) {
        console.log(error)
      }
    });
  }
  loadMore(page)
  setTimeout(function () {
    myscroll = new iScroll("wrapper",{
      topOffset: 0,
      //上拉时触发
      onScrollMove: function(){
        //如果上拉高度 大于 (内容高度 - wrapper高度) 50px 以上  且是未刷新状态时触发 ;
        if(this.y <= ( this.wrapperH - this.scroller.clientHeight -50) && is_r == false){
          is_r = true;
          if(!pageNull){
            return
          }else{
            page++;
          }
          setTimeout(function(){
            //这里表示数据加载成功后
            loadMore(page)
            console.log(!pageNull)
            //这里表示渲染完成后刷新wrapper
            setTimeout(function(){
              //显示加载成功状态图标 (没有更多数据时候的提示作用)
              $('#loadOver').show();
              setTimeout(function(){
                $('#more').hide();
                $('#null').hide();
                $('#loadOver').hide();
              },0)
              //加载完成状态
              is_r = false;
              myscroll.refresh();
            },0)
          },1000)
          //正在加载状态
        }
      },
      onScrollEnd: function(){
        if(is_r == true){
          $('#more').show();
          $('#null').hide();
          $('#loadOver').hide();
          if(!pageNull){
            $('#more').show();
            setTimeout(function () {
              $('#more').hide();
              $('#null').show();
            },500)
            setTimeout(function () {
              $('#null').hide();
            },1000)
          }
        }
      }
    });
  },0);
})
