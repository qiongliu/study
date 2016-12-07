;(function(){
	var config = {};
    config.webDomain = window.globalParam.siteWeb;
	config.imagesDomain = window.globalParam.siteImages;
    config.editVal = "说点啥吧！";
    config.tipsRoot = "http://" + config.imagesDomain + "/SNS/images/tips/";
	config.emojiRoot = "http://" + config.imagesDomain + "/SNS/images/emoji/";
	config.emoji = {
        "撇嘴": "1.gif", "色": "2.gif", "发呆": "3.gif", "得意": "4.gif", "流泪": "5.gif", "害羞": "6.gif",
        "闭嘴": "7.gif", "睡": "8.gif", "大哭": "9.gif", "尴尬": "10.gif", "发火": "11.gif", "调皮": "12.gif",
        "呲牙": "13.gif", "惊讶": "14.gif", "难过": "15.gif", "酷": "16.gif", "冷汗": "17.gif", "抓狂": "18.gif",
        "呕吐": "19.gif", "偷笑": "20.gif", "可爱": "21.gif", "白眼": "22.gif", "傲慢": "23.gif", "饥饿": "24.gif",
        "困": "25.gif", "惊恐": "26.gif", "流汗": "27.gif", "憨笑": "28.gif", "大兵": "29.gif", "奋斗": "30.gif",
        "咒骂": "31.gif", "疑问": "32.gif", "嘘..": "33.gif", "晕": "34.gif", "折磨": "35.gif", "衰": "36.gif",
        "骷髅": "37.gif", "敲打": "38.gif", "拜拜": "39.gif", "擦汗": "40.gif", "抠鼻": "41.gif", "鼓掌": "42.gif",
        "糗大了": "43.gif", "坏笑": "44.gif", "左哼哼": "45.gif", "右哼哼": "46.gif", "哈欠": "47.gif", "鄙视": "48.gif",
        "委屈": "49.gif", "快哭了": "50.gif", "阴险": "51.gif", "亲亲": "52.gif", "吓": "53.gif", "可怜": "54.gif",
        "菜刀": "55.gif", "西瓜": "56.gif", "啤酒": "57.gif", "篮球": "58.gif", "乒乓球": "59.gif", "咖啡": "60.gif",
        "米饭": "61.gif", "猪头": "62.gif", "玫瑰": "63.gif", "凋谢": "64.gif", "红唇": "65.gif", "爱心": "66.gif",
        "心碎": "67.gif", "蛋糕": "68.gif", "闪电": "69.gif", "炸弹": "70.gif", "刀": "71.gif", "足球": "72.gif",
        "瓢虫": "73.gif", "便便": "74.gif", "月亮": "75.gif", "太阳": "76.gif", "礼物": "77.gif", "抱抱": "78.gif",
        "强": "79.gif", "弱": "80.gif", "握手": "81.gif", "胜利": "82.gif", "抱拳": "83.gif", "勾引": "84.gif",
        "拳头": "85.gif", "差劲": "86.gif", "爱你": "87.gif", "No": "88.gif", "Ok": "89.gif", "爱情": "90.gif",
        "飞吻": "91.gif", "跳跳": "92.gif", "发抖": "93.gif", "怄火": "94.gif", "转圈": "95.gif", "磕头": "96.gif"
    };

    // upload
    config.photoBoxObj = "#" + SE.reserveKeyword + "-photo-viewbox"; //上传图片
    config.photoMaxNum = 10;
    config.swfuploadUrl = "http://" + config.webDomain + "/SNS/lib/swfUploadLib.js";
    config.uploadFlashUrl = "http://" + config.webDomain + "/SNS/lib/swfupload.swf";
    SE.config = config;
})();