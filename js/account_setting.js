$(function () {
    // 得到订单信息
    $.ajax({
        url: DOMAIN + GET_USR_LIST,
        data: {
            'userID': USERID,
        },
        type: "POST",
        async: false,
        dataType: "json",
        success: function (data) {
            // layer.close(index);
            if (data.code == 'success') {
                var userData = data.userData;
                if (!(userData.name === null || userData.name === undefined || userData.name === "")) {
                    $('#img-name').css('display', 'none');
                    $('#name').css('display', 'inline');
                    $('#name').html(userData.name);
                }

                if (!(userData.idcard === null || userData.idcard === undefined || userData.idcard === "")) {
                    $('#img-idt').css('display', 'none');
                    $('#idt').css('display', 'inline');
                    $('#idt').html(userData.idcard);
                }
				if (userData.pic==null || userData.pic=='')
				{
					$('#portrait').attr('src','images/head-picture.jpg');
				}else{
					$('#portrait').attr('src',userData.pic);
				}

                $('#num').html(userData.phone);

            } else {
                alert("获取失败：" + data.message);
            }
        }
    });
    $('#amend_name').click(function () {
        var data = $('#name').text();
        if (data === "" || data === undefined) {
            location.href = "inputname.html";
        }
    });

    $('#amend_idt').click(function () {
        var data = $('#idt').text();
        if (data === "" || data === undefined) {
            location.href = "inputid.html";
        }
    });

    $('#msg').click(function () {
        location.href = "msg.html";
    });

    $('#submit').click(function () {
        setCookie(COOKIE_NAME_USER_ID, "", 30);
        location.href = "index.html";
    });
});

function changePwd() {
    location.href = "changepwd.html";
}

function aboutUs() {
    location.href = "about_us.html";
}

$(function(){
				$('#portrait').click(function(){
					$('#picfile').click();
				})

				//文件上传
                $('.settting-picture').on('change', 'input[type=file]', function(){
                    //$('.fileloading').html('<img src="images/loading.gif" width="24" height="24"/> 上传中...');
                     var imageSelector = document.getElementById("picfile");
				var picture;
				picture = imageSelector.value;
				if (!picture.match(/.jpg|.JPEG|.jpeg|.JPG|.gif|.png|.bmp/i)) {
					return alert("您上传的图片格式不正确，请重新选择！");
				}
				if (imageSelector.files && imageSelector.files[0]) {
					var isChrOrSaf = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1;
					document.getElementById("portrait").src = isChrOrSaf ? window.webkitURL.createObjectURL(imageSelector.files[0]) : window.URL.createObjectURL(imageSelector.files[0]);
					upLoadFile(picture)
				} else {
					return alert("您上传的图片格式不正确，请重新选择！");
				}
					ajaxFileUpload();
                    return false;
                });
                function ajaxFileUpload(){
        		    var uploadUrl = DOMAIN +'/editphoto.php?userID='+USERID+'&act=photo&fileName=picfile';//处理文件
                    
        		    $.ajaxFileUpload({
    					url           : uploadUrl,
    					fileElementId : 'picfile',
    					dataType      : 'json',
    					success       : function(data, status){
							
    						var code = data.code;
                            var msg  = data.pic;
                            
                            $('#picfile').val('');
                            $('.fileloading').html('');
                            
    						switch(code){
    							
    						}
    				    },
                        error: function (data, status, e){
    					   	
                            
    				    }
       				})
                    return false;
        		}
				 
			});