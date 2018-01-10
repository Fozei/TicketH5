//检查用户是否登录
var USERID=getCookie(COOKIE_NAME_USER_ID);
if (USERID==undefined || USERID==null || USERID=='')
{
	location.href='index.html';
}