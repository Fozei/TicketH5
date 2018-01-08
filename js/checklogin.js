//检查用户是否登录
var USERID=localStorage.userID;
USERID='PThFUnJGVFRSMVRQ';
if (USERID==undefined)
{
	location.href='index.html';
}