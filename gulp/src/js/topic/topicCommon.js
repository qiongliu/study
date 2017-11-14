//页面全局变量
// window.globalParam = {
//     webPath: "",
//     locSite: {},
//     exName: ".shtml"
// };
// window.globalParam.locSite["WWW"] = "www.sneduyun.com"; //主站
// window.globalParam.locSite["IMAGES"] = "images.sneduyun.com"; //图片样式
// window.globalParam.locSite["UPLOAD"] = "upload.sneduyun.com"; //上传
// window.globalParam.locSite["APP"] = "app.sneduyun.com"; //应用中心
// window.globalParam.locSite["HELP"] = "help.sneduyun.com"; //帮助中心
// window.globalParam.locSite["PING"] = "ping.sneduyun.com"; //网络评比
// window.globalParam.locSite["GROUP"] = "cg.sneduyun.com"; //协作组
// window.globalParam.locSite["MALL"] = "mall.sneduyun.com"; //商城
// window.globalParam.locSite["RES"] = "res.sneduyun.com"; //资源
// window.globalParam.locSite["VIEW"] = "view.sneduyun.com"; //预览接口
// window.globalParam.locSite["OWA"] = "owa.sneduyun.com"; //Office预览服务
// window.globalParam.locSite["SSO"] = "sso.sneduyun.com"; //单点登录
// window.globalParam.locSite["HQWWW"] = "www.hengqian.net"; //恒谦教育云平台主站
// window.globalParam.locSite["DEV"] = "dev.hengqian.net"; //官方应用
// seajs.config({
//     "base": "",
//     "alias": {
//         "HQ": "Js/HengQian/HQ.Ui_v1.0.js?ver=3.1_20170419",
//         "SE": "Js/snsEditor/SE.js?ver=2.0_20170419"
//     },
//     map: [
//             ['.js', '.js?ver=20170706']//防止发布缓存
//     ]
// });

// DetailInit = {
//     webpath: "http://www.sneduyun.com/",
//     login: function (data) {
//         if (data.isSuccess) {
//             var user = data.Data;
//             $("#userInfo img").attr("src", user.Face);
//             $("#userInfo span").html(user.RealName);
//             $("#loginBtn").hide();
//             $("#userInfo").show();
//             if (user.UserType == "1") {
//                 $(".container li:first a").attr("href", this.webpath + "user/teaZone.shtml");
//             } else {
//                 $(".container li:first a").attr("href", webpath + "/user/stuZone.shtml");
//             }
//         } else {
//             DetailInit.logout();
//         }
//     },
//     logout: function () {
//         var redirectUrl = "http://www.sneduyun.com?oUrl=" + window.location.href;
//         $(".container li:first a").attr("href", this.webpath);
//         $("#loginBtn").show().attr("href", redirectUrl);
//         $("#userInfo").hide();
//         $(".m_table a").attr("href", redirectUrl);
//     },
//     check: function () {
//         $.ajax({
//             type: "post",
//             url: "/plus/GetUserLogin.ashx?action=check",
//             dataType: "json",
//             success: function (result) {
//                 DetailInit.login(result);
//             },
//             error: function (req, textStatus, err) {
//                 DetailInit.logout();
//             }
//         });
//     },
//     previewApi: function (fileUrl) {
//         seajs.use("HQ", function (ui) {
//             ui.plugIn.Load("dialog", function () {
//                 ui.plugIn.Load("tips", function () {
//                     //调用预览接口
//                     seajs.use("Js/onlinePreview", function () {
//                         fileUrl = fileUrl.indexOf('http://') > -1 ? fileUrl : "http://" + window.location.hostname + fileUrl;
//                         window.RRTView.show(fileUrl);
//                     });
//                 });
//             });
//         });
//     }
// };

$(function () {
    // DetailInit.check();

    // detail页面专家介绍添加 展开/收起
    window.slideToggle = function () {
        var MAX_HEIGHT = 85,
        MAX_NUM = 160,
        info = $('.info p');

        info.each(function(item) {
            var $this = $(this);
            if($this.height() <= MAX_HEIGHT) return;
            var content = $this.find('.content');
            cutString(content);
        });

        function cutString (content) {
            var text = content.text(),
            subText = text.slice(0,MAX_NUM) + "....",
            toggle = createToggle(content);
            content.text(subText);
            addToggleEvent(toggle,content,text,subText);
            content.after(toggle);
        }

        function createToggle (content) {
            var toggle = $('<span class="toggle" data-flag="up">展开更多</span>');
            return toggle;
        }

        function addToggleEvent (toggle,content,text,subText) {
            toggle.on('click',function () {
                if(toggle.attr('data-flag') == 'up') {
                    toggle.text('收起');
                    toggle.attr('data-flag','down');
                    content.text(text);
                    content.parents('.info').css('height','auto');
                } else {
                    toggle.text('展开更多');
                    toggle.attr('data-flag','up');
                    content.text(subText);
                    content.parents('.info').css('height',MAX_HEIGHT);
                }
            });
        }
    };
});

