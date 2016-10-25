/**
 * Created by lenovo on 2015/11/16.
 */
define(function(){

    var CarouselPoster = function(poster){
       var self = this;
        this.poster = poster;
        this.posterItemMain = this.poster.find("ul.poster-list");//返回被选元素的所有层级下的子元素
        this.nextBtn = this.poster.find("div.poster-next-btn");
        this.prevBtn = this.poster.find("div.poster-prev-btn");
        this.posterItems = this.poster.find("li.poster-item");
        if(this.posterItems.size()%2==0){
            this.posterItemMain.append(this.posterItems.eq(0).clone());//clone() 方法生成被选元素的副本，包含子节点、文本和属性。
            this.posterItems = this.posterItemMain.children();//children() 方法返回被选元素的所有直接子元素。
        };
        this.posterFirstItem = this.posterItems.first();//取得指定索引的元素
        this.posterLastItem = this.posterItems.last();//取得指定索引的元素 
        this.rotateFlag = true;
        this.setting = {"width":1000,"height":270,"posterWidth":640,"posterHeight":270,"scale":0.9,"verticalAlign":"middle","autoPlay":"true",
        "delay":2000,"speed":500} //默认值
         $.extend(this.setting,this.getSetting()); //将b对象的属性扩展到a对象
        this.setSettingValue();
        this.setPosterPos();
        this.nextBtn.click(function(){
            if(self.rotateFlag){
               self.rotateFlag = false;
                self.carouselRotate("left");
                
            }
            
        })
        this.prevBtn.click(function(){
            if(self.rotateFlag){
                self.rotateFlag = false;
                 self.carouselRotate("right");
            };
           
        });
        if(this.setting.autoPlay){
            this.autoPlay();
            this.poster.hover(function(){
                window.clearInterval(self.timer);
            },function(){
                self.autoPlay();
            })
        }
    };
    CarouselPoster.prototype = {
        //自动播放
        autoPlay:function(){
            var self = this;
            this.timer = window.setInterval(function(){
                self.nextBtn.click();
            },this.setting.delay);
        },
       // 图片旋转
        carouselRotate:function(a){
            var self = this;
            var zIndexArr = [];
            if(a==="left"){
                this.posterItems.each(function(){
                    var _self_ =$(this);
                   var prev=_self_.prev().get(0)?_self_.prev():self.posterLastItem,//prev() 获得匹配元素集合中每个元素紧邻的前一个同胞元素,get() 方法获得由选择器指定的 DOM 元素
                    width = prev.width(),
                    height = prev.height(),
                    zindex = prev.css("z-index"),
                    opacity = prev.css("opacity"),
                    left = prev.css("left"),
                    top = prev.css("top");
                    zIndexArr.push(zindex);
                    _self_.animate({
                        width:width,height:height,opacity:opacity,left:left,top:top
                    },self.setting.speed,function(){
                        self.rotateFlag = true ;
                    });
                });
                     this.posterItems.each(function(i){
                        $(this).css("z-index",zIndexArr[i]);
                     })


            }else if(a==="right"){
                    this.posterItems.each(function(){
                    var _self_ =$(this);
                   var next=_self_.next().get(0)?_self_.next():self.posterFirstItem,//next() 获得匹配元素集合中每个元素紧邻的后一个同胞元素,get() 方法获得由选择器指定的 DOM 元素
                    width = next.width(),
                    height = next.height(),
                    zindex = next.css("z-index"),
                    opacity = next.css("opacity"),
                    left = next.css("left"),
                    top = next.css("top");
                    zIndexArr.push(zindex);
                    _self_.animate({
                        width:width,height:height,opacity:opacity,left:left,top:top
                    },self.setting.speed,function(){
                        self.rotateFlag = true ;
                    });    

                })
                  this.posterItems.each(function(i){
                        $(this).css("z-index",zIndexArr[i]);
                     })

            }
            
        },
        //图片设置位置
        setPosterPos:function(){
          var self = this;
            var sliceItems = this.posterItems.slice(1),//从已有的数组中返回选定的元素
            sliceSize = sliceItems.size()/ 2,
            rightSlice = sliceItems.slice(0,sliceSize),
            level = Math.floor(this.posterItems.size()/2); //计算左、右两边的层级
            var firstLeft = (this.setting.width - this.setting.posterWidth)/2;
            //设置右边位置
            var rw = this.setting.posterWidth,
                rh = this.setting.posterHeight,
                gap = firstLeft/level; //计算层间隔
            var fixOffsetLeft = firstLeft+rw;
            rightSlice.each(function(i){
                --level;
                rw = rw*self.setting.scale;
                rh = rh*self.setting.scale;
                var j = i;
                $(this).css({"z-index":level,"width":rw,"height":rh,
                "opacity":1/(++j),"left":fixOffsetLeft+(++i)*gap-rw,"top":self.setVerticalAlign(rh)})
            })
            //设置左边位置 
             var leftSlice = sliceItems.slice(sliceSize);
             var lw = rightSlice.last().width(),
             lh = rightSlice.last().height();
             var oloop = Math.floor(this.posterItems.size()/2);
             leftSlice.each(function(i){
                $(this).css({"z-index":i,"width":lw,"height":lh,
                "opacity":1/oloop,"left":i*gap,"top":self.setVerticalAlign(lh)})
                oloop--;
              lw=lw/self.setting.scale;
              lh=lh/self.setting.scale;
            })
            
        },
        //设置垂直位置
        setVerticalAlign:function(height){
            var verticalType =  this.setting.verticalAlign,
            top = 0 ;
            if(verticalType === "top"){
                top = 0;
            }else if(verticalType === "middle"){
                top = (this.setting.height-height)/2;
            }
            else if(verticalType === "bottom"){
                top = this.setting.height-height;
            }else{
                top = (this.setting.height-height)/2;
            }
               return top ;
        },
        //设置指定参数
        setSettingValue:function(){
          this.poster.css({"width":this.setting.width,"height":this.setting.height});//返回或设置指定元素的属性值
            this.posterItemMain.css({"width":this.setting.width,"height":this.setting.height});
            var w = (this.setting.width - this.setting.posterWidth)/2;
            this.prevBtn.css({"width":w,"height":this.setting.height,"z-index":Math.ceil(this.posterItems.size()/2)})//向上取整
            this.nextBtn.css({"width":w,"height":this.setting.height,"z-index":Math.ceil(this.posterItems.size()/2)})
            this.posterFirstItem.css({"width":this.setting.posterWidth,"height":this.setting.posterHeight,"left":w,"top":0,
                "z-index":Math.floor(this.posterItems.size()/2)})//向下取整

        },
        //取得指定参数
        getSetting:function(){
         var setting = this.poster.attr("data-setting");
            if(setting&&setting!=""){
                return $.parseJSON(setting);//将格式严格的Json字符串转换成jquery对象
            }else{
                return{};
            }
        }
    };
    //初始化
  CarouselPoster.init = function(posters){
      var self = this;
      posters.each(function(){//为集合里的每个对象执行方法，遍历数组
          new self($(this));
      })
  }

    return{CarouselPoster:CarouselPoster};

});
