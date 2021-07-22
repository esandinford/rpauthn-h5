/**
 * 创建一个inputeElement
 * @param name 对象的名字
 * @param value 对象的值
 * @returns {HTMLInputElement}
 */
function createInput(name,value){
    let input =document.createElement("input");
    input.type="text";
    input.name=name;
    input.value=value;
    return input;
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 获取一个随机字符串
 * @param e 字符串长度
 * @returns {string}
 */
function getRandomStr(e){
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) {
        n += t.charAt(Math.floor(Math.random() * a));
    }
    return n;
};

/**
 * 当提交按钮被点击
 */
function onPostClick(){
    let certName=$(`input[name="certName"]`).val();
    let certNo=$(`input[name="certNo"]`).val();
    axios({
        method: 'post',
        url: `/getVerifyUrl`,
        headers: {"Content-Type": "application/json",charset:"utf-8"},
        data:{
            bizId:new Date().format("yyyymmddhhMMss")+getRandomStr(8),
            certName:certName,
            certNo:certNo,
            livingType:"4",
            returnUrl:"http://www.baidu.com"
        }
    }).then(response=>{
        const resData=response.data;
        console.log(resData);
        if(resData.code==="0000") {
            window.location =resData.url;
        }

    });
}

function getVerify(){
    let resultUrl=$(`input[name="resultUrl"]`).val();
    axios({
        method: 'post',
        url: `/livingdetection/rpverifyh5/getVerifyResult/`+resultUrl,
        headers: {"Content-Type": "application/json",charset:"utf-8"},
    }).then(response=>{
        const resData=response.data;
        if(resData.code==="0000") {
            // window.location =resData.verifyUrl;
            console.log(resData);
        }

    });
}