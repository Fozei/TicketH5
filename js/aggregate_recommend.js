$('.nav li').on('touchstart',function(e) {
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
});
$('.head .backUp').on('touchstart',function(e) {
  window.history.back();
});

var myscroll;
var is_r = false;
var static = '';
var num = 0;
var total = 50;
$('#num').text(total)
var lis  = [
              {"time":"2017.12.12/16:58","tel":"187****3155","rank":"一级"},
              {"time":"2017.12.12/16:58","tel":"187****3155","rank":"一级"},
              {"time":"2017.12.12/16:58","tel":"187****3155","rank":"一级"},
              {"time":"2017.12.12/16:58","tel":"187****3155","rank":"一级"},
              {"time":"2017.12.12/16:58","tel":"187****3155","rank":"一级"},
              {"time":"2017.12.12/16:58","tel":"187****3155","rank":"一级"},
              {"time":"2017.12.12/16:58","tel":"187****3155","rank":"一级"},
              {"time":"2017.12.12/16:58","tel":"187****3155","rank":"一级"}
]
var page=1,pageCount=2;
function loadMore() {
  $(lis).each(function (i,item) {
    num++
    $('.tipListsCon>ul').append(' <li>\n' +
      '                    <span>'+num+'</span>\n' +
      '                    <span>'+item.time+'</span>\n' +
      '                    <span>'+item.tel+'</span>\n' +
      '                    <span>'+item.rank+'</span>\n' +
      '                </li>')
  })

}
$('#more').hide();
$('#null').hide();
$('#loadOver').hide();
$(lis).each(function (i,item) {
  num++
  $('.tipListsCon>ul').append(' <li>\n' +
    '                    <span>'+num+'</span>\n' +
    '                    <span>'+item.time+'</span>\n' +
    '                    <span>'+item.tel+'</span>\n' +
    '                    <span>'+item.rank+'</span>\n' +
    '                </li>')
})
$(function () {
    setTimeout(function(){
    myscroll = new iScroll("wrapper",{
      topOffset: 0,
      //上拉时触发
      onScrollMove: function(){
        static = 0;
        //如果上拉高度 大于 (内容高度 - wrapper高度) 50px 以上  且是未刷新状态时触发 ;
        console.log(1)
        if(this.y <= ( this.wrapperH - this.scroller.clientHeight -50) && is_r == false){
          // console.log(this.y)
          // console.log(this.scroller.clientHeight)
          //正在加载状态
          $('#more').show();
          $('#more>img').show();
          is_r = true;
          setTimeout(function(){
            //这
            // 里表示数据加载成功后
            if(page<pageCount){
              page++
              loadMore()
            }else{
              $('#more img').hide();
              $('#more').show();

              $('#more>span').text('暂无更多数据');
            }
            //这里表示渲染完成后刷新wrapper
            setTimeout(function(){
              console.log("刷新wrapper");
              //显示加载成功状态图标 (没有更多数据时候的提示作用)
              static = 2;
              setTimeout(function(){
                static = "";
              },500)
              //加载完成状态
              $('#more').hide();
              $('#more>img').hide();
              is_r = false;
              myscroll.refresh();
            },0)
          },2000)

        }
      },
      onScrollEnd: function(){
        //上拉之后如果触发刷新则 状态图标值为1 显示loading状态
        if(is_r == true){
          static = 1;
          if(page>=pageCount){
            $('#more>img').hide();
            $('#more').show();
          }else{
            $('#more>img').show();
            $('#more').show();
          }

        }
      }
    });
  },0);
})
