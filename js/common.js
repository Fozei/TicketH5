function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getQueryString2(url) {
    if (url.replace(/(^s*)|(s*$)/g, "").length === 0) {
        return "";
    } else {
        if (url.indexOf("&") === -1) {
            return url.substr(url.indexOf("=") + 1, url.length);
        } else {
            //todo 有多个参数情况
            return "";
        }
    }
}