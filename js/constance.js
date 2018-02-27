var COOKIE_NAME_USER_ID = "ewedouserID";
//var DOMAIM_API='http://192.168.1.78/ticket/';
var DOMAIM_API='http://www.ewedo.net/ticket/';
var DOMAIN = DOMAIM_API+"api";
var MALL_ADDRESS =
    "http://sdyigou.sdevnet.com/topics/api/dev/index.html#/device/";

var H5_ADDRESS = "http://www.ewedo.net/ticket/h5";

var TICKET_DETAIL = "/tickeinfo.php";
var TICKET_LIST = "/tickelist.php";
var TICKET_AREA = "/tickearea.php";
var TICKET_SEAT = "/ticketseat.php";
var TICKET_ORDER = "/ticketorder.php";//订单确认
var TICKET_VERIFY = '/verifycode.php';
var TICKET_SENDCODE = '/sendcode.php';
var TICKET_CAT = "/cat.php";
var TICKET_CAT2 = "/cat2.php";
var TICKET_ORDER_STATUS = '/getorderstatus.php';
var TICKET_GET_DATA = '/getticket.php';
var LOGIN = '/login.php';
var ORDER_LIST = '/orderlist.php';
var CASH_HISTORY = '/withdrawlog.php';
var GET_USER_BANK = '/getuserbank.php';
var CASH_REQUEST = '/applywithdraw.php';
var GET_CASH_REQUEST_CODE = '/withdrawsendcode.php';
var APPLY_AGENT = '/applyagent.php';//申请成为代理人
var GET_REG_CODE = '/regsendcode.php';//获取验证码
var REG = '/reg.php';
var USER_INDEX = '/userindex.php';
var GET_USR_LIST = '/getuserlist.php';//得到用户基本信息
var CAT_LIST = '/catlist.php';
var USER_ORDER_LIST = '/orderlist.php';//我的订单
var INVITE_REGISTER = '/invitereg2.php';//邀请注册
var INVITE_REGISTER_INIT = '/invitereg1.php';//通过邀请人注册初始化数据
var INVITE_FRIEND = '/invite.php';//邀请好友
var AGENT_EARNING = '/agentincome.php';//代理商收益
var ADD_RECOMMEND = '/agentlist.php ';//累计推荐
var AMEND_EDITUSER = '/edituser.php';//修改用户姓名、身份证
var ADD_EARNING = '/income.php';//累计收益
var FORGET_CHECK_VCODE = '/vcode.php';//修改密码、忘记密码 验证验证码
var FORGET_PWD = '/forgetpwd.php';//修改密码、忘记密码 验证验证码

var TICKET_EXAMINE = '/checkseat.php';
var TICKET_ADDORDER = '/addorder.php';

var TICKET_SEAT_COUNT = '/getordercount.php'; //得到座位数量
var TICKET_ADDCARD = '/cardadd.php';    //添加身份证

var GET_SIGN = '/getsign.php'  //获取签名
var CHECK_PHONE = '/checkphone.php'  //检测手机是否注册
var DEL_ORDERAREA = '/orderareadel.php'; //删除选的座位
var GET_DISCOUNT_STATUS = '/getdiscountstatus.php'; //得到折扣状态


//系统加载时检测折扣是否审核
$(function(){
	$.ajax({
		type        : 'POST',
		url :        DOMAIN+GET_DISCOUNT_STATUS,
		dataType:     'json',
		success :     function(data){
			if (data.status==0)
			{
				layer.msg('系统设置未完成!',{
					shade: [0.8, '#393D49'],
					time:0
				});
				return false;
			}
											
		}
	});
})