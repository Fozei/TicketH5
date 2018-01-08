$('.nav li').on('touchstart',function(e) {
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
});
$('.head .backUp').on('touchstart',function(e) {
  window.history.back();
});
