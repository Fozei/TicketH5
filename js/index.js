// 首页初始化
var deviceID = getQueryString('device');
if (deviceID == undefined) {
    deviceID = localStorage.deviceID;
	if (deviceID==undefined)
	{
		deviceID = 2;
		localStorage.deviceID = deviceID;
	}
} else {
    localStorage.deviceID = deviceID;
}
$(window).load(function () {
    layer.load(0, {
        shade: [0.3, 'black']
    }); //0代表加载的风格，支持0-2
    //初始化节目数据
    $.post(DOMAIN + TICKET_CAT, {
        page: 1
    }).done(function (data) {
        // return
        var obj = eval("(" + data + ")"); // 将json转换为对象 json 格式{status:'1',data:'2'}
        parseInitData(obj);
    }).fail(function (xhr, status) {
        layer.open({
            content: '获取数据失败，请刷新重试'
            , skin: 'msg'
            , time: 2 //2秒后自动关闭
        });
    }).always(function () {
        layer.closeAll('loading');
    });
});
function requestSearchResult() {
	var str = $.trim($('#keyword').val());
    var searchUrl = encodeURI("event_info.html?keyword=" + str);
	var searchUrl = "event_info.html?keyword=" + str
	window.location.href = searchUrl;
}

function parseInitData(jsonData) {
    var catData = jsonData.catData;
    var recommendData = jsonData.recommendData;
    $.each(catData, function bindData(index, item) {
        var catName = item.name;
        var catid = item.id;
        var pic = item.pic;
        var url = item.url;
        var li;
        li = '<li>';
        if (catid > 1000) {
            li += '<a href="' + url + '"><img src="' + pic + '" ></a>';
            li += '<p><a href="' + url + '" >' + catName + '</a></p>';
        } else {
            li += '<img src="' + pic + '" onClick="goToList(' + catid + ')">';
            li += '<p><a href="javascript:void(0);" onClick="goToList(' + catid + ')">' + catName + '</a></p>';
        }
        li += '</li>';
        $(".cat-list").append(li);
    });

    $(".cat-list").append("<li>\n" +
        "<img src=\"images/icon6.png\" onclick=\"location.href='" + MALL_ADDRESS + deviceID +
        "'\" alt=\"\" />\n" +
        "<p onclick=\"location.href='" + MALL_ADDRESS + deviceID + "'\">长颈乐商城</p>\n" +
        "</li>");

    $.each(recommendData, function (index, item) {
        var title = item.title;
        var desc = item.ticket_info;
        var id = item.id;
        var pic = item.pic;

        var listBox = "<div class=\"listBox\"><div class=\"l-left\">" +
            "<img src=\"" + pic + "\"onclick=\"goToDetail(" + id + ")\"/></div><div class=l-right>" +
            "<div class=\"title\" onclick=\"goToDetail(" + id + ")\">" + title +
            "</div><p class=\"desc\" onclick=\"goToDetail(" + id + ")\">" + desc + "</p>" +
            "<p class=\"button\"><img src=\"images/seebutton.jpg\" onclick=\"goToDetail(" + id + ")\"/></div>" +
            "<div class=\"clear\"></div></div>";
        $(".mainContent").append(listBox);
    });
}

function goToList(catID) {
    window.location.href = "competition_classify.html?catID=" + catID;
}

function goToDetail(id) {
    window.location.href = "detail.html?id=" + id;
}

function goUserCenter() {
    var uID = getCookie(COOKIE_NAME_USER_ID);
    if (uID === null || uID === undefined || uID === "") {
        location.href = "login.html";
    } else {
        location.href = "user_center.html";
    }
}
setTimeout(function() {
	var geolocation = new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp");
	var options = {
		timeout: 0
	};

	function showPosition(position) {
		geographic = position
		document.getElementById('geographic').innerHTML = geographic.city
	};
	geolocation.getLocation(showPosition, showErr, options)

	function showErr() {
		document.getElementById("demo").appendChild(document.createElement('p')).innerHTML = "定位失败！";
		document.getElementById("city").innerHTML = "定位失败"
	};
}, 500)