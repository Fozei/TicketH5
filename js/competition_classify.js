$(function () {
  function classifyView(catId) {
    $.ajax({
      type:"post",
      url:DOMAIN+TICKET_CAT,
      async: true,
      data: {
        catID:catId
      },
      success: function (data) {
        var data = eval("(" + data + ")");
        console.log(data)
        $('.tab-classfiy').append('<div class="tab-basketball">\n' +
          '        <div class="tab-left tab-classfiy-basketball">\n' +
          '            <img class="tab-img" src="images/yumaoqiu.png">\n' +
          '            <p class="tab-txt-backetball">羽毛球</p>\n' +
          '        </div>\n' +
          '        <img class="tab-left" src="images/tu2.png">\n' +
          '        <p class="tab-left-details tab-txt-details">中国羽毛球大师赛女双半决赛...</p>\n' +
          '    </div>')

      },
      error: function (error) {
        
      }
    })
  }
  classifyView(1000)
})