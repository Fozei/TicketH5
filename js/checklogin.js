//检查用户是否登录
var USERID=localStorage.userID;
if (USERID==undefined)
{
	location.href='index.html';
}