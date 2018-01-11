$(function () {

    $('#idt_submit').click(function () {
        var idt = $('#itp_idt').val();
        if (!ChinaIdChecker(idt)) {
            layer.open({
                content: '身份证号不合法'
                , skin: 'msg'
                , time: 2 //2秒后自动关闭
            });
            return '身份证号不合法';
        }
        //修改用户姓名、身份证
        $.ajax({
            url: DOMAIN + AMEND_EDITUSER,
            data: {
                'userID': USERID,
                'idcard': idt,
            },
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                // layer.close(index);
                if (data.code == 'success') {
                    layer.open({
                        content: '修改身份证号成功'
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                    window.history.back(-1);
                } else {
                    layer.open({
                        content: "修改失败：" + data.message
                        , skin: 'msg'
                        , time: 2 //2秒后自动关闭
                    });
                }
            }
        });
    });

    // 检测身份证号是否合法
    function ChinaIdChecker(id) {
        this.isOK = false;
        this.error = '';

        if (!id || typeof (id) != 'string' || id.length != 15 && id.length != 18
            || !id.match(/^[0-9]{15}$/) && !id.match(/^[0-9]{17}[0-9xX]$/) || "111111111111111" == id) {
            this.error = '输入不是15位或者18位有效字符串';
            return false;
        }

        var area = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };

        this.areaName = area[id.substr(0, 2)];
        if (!this.areaName) {
            this.error = '前2位不是有效的行政区划代码';
            return false;
        }
        ;

        if (id.length == 15) {
            this.year = parseInt(id.substr(6, 2));
            this.month = parseInt(id.substr(8, 2));
            this.day = parseInt(id.substr(10, 2));
        }
        else {
            this.year = parseInt(id.substr(6, 4));
            this.month = parseInt(id.substr(10, 2));
            this.day = parseInt(id.substr(12, 2));
        }

        this.error = '出生日期不正确';
        if (this.month > 12) {
            return false;
        }
        if (this.day > 31) {
            return false;
        }
        // February can't be greater than 29 (leap year calculation comes later)
        if ((this.month == 2) && (this.day > 29)) {
            return false;
        }
        // check for months with only 30 days
        if ((this.month == 4) || (this.month == 6) || (this.month == 9)
            || (this.month == 11)) {
            if (this.day > 30) {
                return false;
            }
        }
        // if 2-digit year, use 50 as a pivot date
        if (this.year < 100) {
            this.year += 1900;
        }
        if (this.year > 9999) {
            return false;
        }
        // check for leap year if the month and day is Feb 29
        if ((this.month == 2) && (this.day == 29)) {
            var div4 = this.year % 4;
            var div100 = this.year % 100;
            var div400 = this.year % 400;
            // if not divisible by 4, then not a leap year so Feb 29 is invalid
            if (div4 != 0) {
                return false;
            }
            // at this point, year is divisible by 4. So if year is divisible by
            // 100 and not 400, then it's not a leap year so Feb 29 is invalid
            if ((div100 == 0) && (div400 != 0)) {
                return false;
            }
        }
        this.yearStr = '' + this.year;
        this.monthStr = (this.month < 10 ? '0' : '') + this.month;
        this.dayStr = (this.day < 10 ? '0' : '') + this.day;

        // date is valid
        var birthDay = new Date(this.year, this.month - 1, this.day);

        if (birthDay - new Date() >= 0 || birthDay - new Date(1850, 1, 1) <= 0) {
            return false;
        }

        this.error = '';
        var lastNum = id.length == '15' ? id.substr(14, 1) : id.substr(16, 1);
        this.sex = (lastNum == '1' || lastNum == '3' || lastNum == '5'
            || lastNum == '7' || lastNum == '9') ? '1' : '0';
        this.sexName = this.sex == '1' ? '男' : '女';
        if (id.length == '15') {
            this.isOK = true;
            return true;
        }

        var getLastValidationLetter = function (str) {
            var strArray = new Array(17);
            // 存储身份证的前17为数字
            var Wi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,
                1);
            // 表示第i位置上的加权因子
            var Y = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            // 校验码值
            var S = 0;
            // 十七位数字本体码加权求和
            var jym = 0;
            // 校验码

            for (var i = 16;
                 i >= 0;
                 i -= 1) {
                strArray[i] = Number(str.charAt(i));
            }

            for (var j = 16;
                 j >= 0;
                 j -= 1) {
                S += strArray[j] * Wi[j];
            }

            jym = S % 11;
            return Y[jym];
        };

        if (id.substr(17, 1) != getLastValidationLetter(id.substr(0, 17))) {
            this.error = '18位身份证编码最后一位校验码不正确';
            return false;
        }

        this.isOK = true;
        return true;
    }

});

