/**
 * Created by Administrator on 15-11-11.
 */
define(function(){

    var LightBox = function(){
       var self = this;
       this.popupMask=$('<div id="G-lightbox-mask"></div>');
       this.popupWin=$('<div id="G-lightbox-popup"></div>');
        this.bodyNode=$(document.body); //比$("body")更有效率
        this.renderDOM();//render 渲染
        this.picViewArea=this.popupWin.find("div.lightbox-pic-view");
        this.popupPic=this.popupWin.find("img.lightbox-image");
        this.picCaptionArea=this.popupWin.find("div.lightbox-pic-caption");
        this.nextBtn=this.popupWin.find("span.lightbox-next-btn");
        this.prevBtn=this.popupWin.find("span.lightbox-prev-btn");
        this.captionText=this.popupWin.find("p.lightbox-pic-desc");
        this.currentIndex=this.popupWin.find("span.lightbox-of-index");
        this.closeBtn=this.popupWin.find("span.lightbox-close-btn");


        this.groupName=null;
        this.groupData=[];
       //delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。
       // 使用 delegate() 方法的事件处理程序适用于当前或未来的元素（比如由脚本创建的新元素）      
        this.bodyNode.delegate(".P_lightbox,*[data-role=lightbox]","click",function(){
           
            var currentGroupName=$(this).attr("data-group");
            if(self.groupName!=currentGroupName){
                self.groupName = currentGroupName;
                self.getGroup();
            }
            self.initPopup($(this));
        })
        this.popupMask.click(function() {
            self.popupWin.fadeOut();
            $(this).fadeOut();
        });
        this.closeBtn.click(function() {
            self.popupWin.fadeOut();
            self.popupMask.fadeOut();
        });
        var flag = true;
        // this.prevBtn.hover(function() {
        //     if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
        //         $(this).addClass('lightbox-prev-btn-show');
        //     }
        // }, function() {
        //         $(this).removeClass('lightbox-prev-btn-show');
        // }).click(function(e) {
        //     if(!$(this).hasClass('disabled') && self.flag){
        //         self.flag = false;
        //         e.stopPropagation();
        //         self.goto("prev");
        //     }
        // });
        this.prevBtn.click(function(e) {
            if(!$(this).hasClass('disabled') && self.flag){
                self.flag = false;
                e.stopPropagation();
                self.goto("prev");
            }
        });

        this.nextBtn.hover(function() {
            if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
                $(this).addClass('lightbox-next-btn-show');
            }
        }, function() {
                $(this).removeClass('lightbox-next-btn-show');
        }).click(function(e) {
            if(!$(this).hasClass('disabled') && self.flag){
                self.flag = false;
                e.stopPropagation();
                self.goto("next");
            }
        });;
    };

    LightBox.prototype={
        goto:function(dir){
            if(dir === 'next'){
                this.index++;
                if(this.index >= this.groupData.length-1){
                    this.nextBtn.addClass("disabled").removeClass('lightbox-next-btn-show');
                };
                if(this.index != 0){
                    this.prevBtn.removeClass('disabled');
                }
            var src = this.groupData[this.index].src;
            this.loadPicSize(src);
            }else if(dir === 'prev'){
                this.index--;
                if(this.index <= 0){
                    this.prevBtn.addClass('disabled').removeClass('lightbox-prev-btn-show');
                };
                if(this.index != this.groupData.length-1){
                    this.nextBtn.removeClass('disabled');
                }
            var src = this.groupData[this.index].src;
            this.loadPicSize(src);
            }

        },
        loadPicSize:function(sourceSrc){
             var self = this;
             self.popupPic.css({
                width: 'auto',
                heigth: 'auto'
            });
            this.preLoadImg(sourceSrc,function(){              
             self.popupPic.attr("src",sourceSrc);
             var picWidth=self.popupPic.width(),
             picHight=self.popupPic.height();
              self.changePic(picWidth,picHight);

            });

        },
        changePic:function(width,height){
            var self = this,
            winWidth = $(window).width(),
            winHeight = $(window).height(); 
            var scale = Math.min(winWidth/(width+10),winHeight/(height+10),1)
           width = width*scale;
           height = height*scale;
            this.picViewArea.animate({
                width: width-10,
                height:height-10
            });
            self.popupWin.animate({
                width:width,
                height:height,
                "margin-left":-(width/2),
                top:(winHeight-height)/2
            },function(){
                self.popupPic.css({
                    width:width-10,
                    height:height-10
                }).fadeIn();
                self.picCaptionArea.fadeIn();
                self.flag = true;
            })
           //  self.captionText.text(this.groupData[this.index].caption);
           //  self.currentIndex.text("当前索引:"+(this.index+1)+" of "+this.groupData.length);
        },
        preLoadImg:function(src,callback){
            var img = new Image();
            //用来区别IE与其他浏览器及IE6-8之间的方法。 
            //当请求被发送到服务器时，我们需要执行一些基于响应的任务。
            //每当 readyState 改变时，就会触发 onreadystatechange 事件。
            if(!!window.ActiveXObject){
                img.onreadystatechange=function(){
                    if(this.readyState=="complete"){
                        callback();
                    };
                };
            }else{
                //onload 事件会在页面或图像加载完成后立即发生。
                img.onload=function(){
                    callback();
                };
            };
            img.src = src;
        },

        showMaskAndPopup:function(sourceSrc,currentId) {
            var self =this;
            this.popupPic.hide();
            this.picCaptionArea.hide();
            this.popupMask.fadeIn();
            var winWidth=$(window).width();
            var winHeight=$(window).height();
            this.picViewArea.css({
                "width":winWidth/2,
                "height":winHeight/2
            });
            this.popupWin.fadeIn();
            var viewHeight=winHeight/2+10;
            this.popupWin.css({
                "width":winWidth/2+10,
                "height":winHeight/2+10,
                "margin-left":-(winWidth/2+10)/2,
                "top":-viewHeight
            }).animate({
                top:(winHeight-viewHeight)/2
            },function(){

                self.loadPicSize(sourceSrc);

            })
            this.index=this.getIndexOf(currentId);
            var groupDataLength = this.groupData.length;
            if(groupDataLength>1){
                if(this.index===0){
                    this.prevBtn.addClass("disabled");
                    this.nextBtn.removeClass("disabled");
                }
                else if(this.index===groupDataLength-1){
                    this.prevBtn.removeClass('disabled');
                    this.nextBtn.addClass('disabled');
                }else{
                    this.prevBtn.removeClass('disabled');
                    this.nextBtn.removeClass('disabled');
                }

            }
        },
        getIndexOf:function(currentId){
            var index = 0 ;
            $(this.groupData).each(function(i){
                index = i;
                if(this.id === currentId){
                    return false;
                }
            })
            return index;
        },
        initPopup:function(currentObj){
            var self=this;
            sourceSrc=currentObj.attr("data-source");
            currentId=currentObj.attr("data-id");

            this.showMaskAndPopup(sourceSrc,currentId);
        },


        getGroup:function(){
           var self = this;
            //find()方法获得当前元素集合中每个元素的后代
            var groupList = this.bodyNode.find("*[data-group="+this.groupName+"]");
            self.groupData.length=0;
            //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
            //each() 方法规定为每个匹配元素规定运行的函数
            groupList.each(function(){
                self.groupData.push({
                    src:$(this).attr("data-source"),
                    id:$(this).attr("data-id"),
                    caption:$(this).attr("data-caption")
                })
            })
                   
        },
        renderDOM:function(){
            var strDom='<div class="lightbox-pic-view">'+
                '<span class="lightbox-btn lightbox-prev-btn lightbox-prev-btn-show"></span>'+
                '<img class="lightbox-image" src="">'+
                '<span class="lightbox-btn lightbox-next-btn lightbox-next-btn-show"></span>'+
                '</div>'+
                '<div class="lightbox-pic-caption">'+
                '<div class="lightbox-caption-area">'+
                '<p class="lightbox-pic-desc">1111111</p>'+
                '<span class="lightbox-of-index">222222</span>'+
                '</div>'+
                '<span class="lightbox-close-btn"></span>'+
                '</div>';
            this.popupWin.html(strDom);//html() - 设置或返回所选元素的内容（包括 HTML 标记）
            this.bodyNode.append(this.popupMask,this.popupWin);//append() 方法在被选元素的结尾（仍然在内部）插入指定内容
        }

    };

    return{LightBox:LightBox};

})