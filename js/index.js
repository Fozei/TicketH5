// 首页初始化
var deviceID=getQueryString('device');
if (deviceID==undefined)
{
	deviceID = localStorage.deviceID;
}else{
	localStorage.deviceID = deviceID;
}
$(window).load(function() {
  layer.load(0, {
    shade: [0.3, 'black']
  }); //0代表加载的风格，支持0-2
  //初始化节目数据
  var jqxhr = $.post(DOMAIN + TICKET_CAT, {
    page: 1
  }).done(function(data) {
    var obj = eval("(" + data + ")"); // 将json转换为对象 json 格式{status:'1',data:'2'}
    console.log(obj);
    parseInitData(obj);
  }).fail(function(xhr, status) {
    alert("获取数据失败，请刷新重试");
    console.log("onload error");
  }).always(function() {
    layer.closeAll('loading');
    console.log("onload always");
  });

  // 初始化天气信息
  // $.getJSON(WEATHER_REPORT, {
  //   dataType: 'JSONP'
  // }).done(function(data) {
  //   console.log(data);
  // }).fail(function() {
  //   console.log("error");
  // });
});

function requestSearchResult() {
  console.log("requestSearchResult with key words :" + $("#keyword").val());
  window.location.href = "list.html?keyword=" + $("#keyword").val();
  // var jqxhr = $.post(DOMAIN + TICKET_LIST, {
  //   page: 1,
  //   keyword: $("#keyword").val(),
  // }).done(function(data) {
  //   var obj = eval("(" + data + ")"); // 将json转换为对象 json 格式{status:'1',data:'2'}
  //   console.log(obj);
  //   //parse search result
  // }).fail(function(xhr, status) {
  //   console.log("requestSearchResult error");
  // }).always(function() {
  //   console.log("requestSearchResult always");
  // });
}

function parseInitData(jsonData) {
  var catData = jsonData.catData;
  var recommendData = jsonData.recommendData;
  console.log(catData);
  console.log(recommendData);
  // <li>
  //   <img src="images/icon1.png"  alt="" />
  //   <p><a href="#">体育</a></p>
  // </li>

  $.each(catData, function bindData(index, item) {
    var catName = item.cat;
    var catid = item.catid;
    var pic = item.pic;
    var url = item.url;
    var catid = item.catid;
    var li;
    li='<li>';
    if(catid>1000){
        li+='<a href="'+url+'"><img src="'+ pic +'" ></a>';
        li+='<p><a href="'+url+'" >'+catName+'</a></p>';
    }else{
        li+='<img src="'+ pic +'" onClick="goToList('+catid+')">';
        li+='<p><a href="javascript:void(0);" onClick="goToList('+catid+')">'+catName+'</a></p>';
    }

    li+='</li>';
    $(".cat-list").append(li);
  });

  $(".cat-list").append("<li>\n" +
    "<img src=\"images/icon6.png\" onclick=\"location.href='" + MALL_ADDRESS + deviceID +
    "'\" alt=\"\" />\n" +
    "<p onclick=\"location.href='"+MALL_ADDRESS +deviceID+"'\">长颈乐商城</p>\n" +
    "</li>");

  $.each(recommendData, function(index, item) {
    var title = item.title;
    var desc = item.ticket_info;
    var id = item.id;
    var pic = item.pic;

    var listBox = "<div class=\"listBox\">\n" +
      "<div class=\"l-left\">\n" +
      "<img src=\"" + pic + "\" onclick=\"goToDetail(" + id +
      ")\"  alt=\"\" />\n" +
      "</div>\n<div class=\"l-right\">\n" +
      "<div class=\"title\" href=\"javascript:void(0);\" onclick=\"goToDetail(" + id +
      ")\">" + title + "</div>\n" +
      "<p class=\"desc\" onclick=\"goToDetail(" + id +
      ")\">" + desc + "</p>\n<p class=\"button\" >\n" +
      "<img onclick=\"goToDetail(" + id +
      ")\" src=\"images/seebutton.jpg\" class=\"examinebutton\" alt=\"\" />\n" +
      "<img onclick=\"goBooking(" + id +
      ")\" src=\"images/bookingbutton.jpg\" class=\"bookingbutton\"/>\n" +
      "</p>\n</div>\n<div class=\"clear\"></div>\n</div>";
    $(".mainContent").append(listBox);
  });
}

function goToList(catID) {
  console.log("catID :" + catID);
  window.location.href = "list.html?catID=" + catID;
}

function goToDetail(id) {
  console.log(id);
  window.location.href = "detail.html?id=" + id;
}

function goBooking(id) {
  console.log("go booking : " + id);
  window.location.href = "select.html?id=" + id;
}
function goToList_r(url){
    window.location.href = url;
}
