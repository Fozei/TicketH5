//检查用户是否登录
var USERID=getCookie(COOKIE_NAME_USER_ID);
if (USERID==undefined || USERID==null || USERID=='')
{
	alert('请您先登陆');
	location.href='index.html';
}