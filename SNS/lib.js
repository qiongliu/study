;(function(){
	var Lib = function(methodName,opts){
		switch(methodName){
			case "insertCaret" :
				this.insertCaret(opts);	break;
			case "drag" :
				this.drag(opts); break;
			default: break;
		}
	};

	Lib.prototype = {
		insertCaret: function(opts){
			var $obj = $(opts.obj),
			obj = $obj[0],
			val = "[" + opts.val + "]";
			if(document.selection){	
				$obj.focus();
				var range = document.selection.createRange();
				range.text = opts.val;
				$obj.focus();
				console.log(1);
			}else
                if (obj.selectionStart || obj.selectionStart == '0') {
                    var startPos = obj.selectionStart;
                    var endPos = obj.selectionEnd;
                    var scrollTop = obj.scrollTop;
                    obj.value = obj.value.substring(0, startPos) + val + obj.value.substring(endPos, obj.value.length);
                    $obj.focus();
                    obj.selectionStart = startPos + val.length;
                    obj.selectionEnd = startPos + val.length;
                    obj.scrollTop = scrollTop;console.log(startPos,endPos,scrollTop);
                }
                else {
                    $obj.value += val;
                    $obj.focus();console.log(3);
                }
		},
		drag: function(opts){
			document.onselectstart=new Function('event.returnValue=false;');
			var $drag = opts.dragArea,
			$wrap = opts.wrapArea;
			$drag.css("cursor","move");
			$drag.on('mousedown',function(e){
				e.stopPropagation();
				var x = e.clientX,
				y = e.clientY,
				left = $wrap.offset().left,
				top = $wrap.offset().top;
				$(document).on('mousemove.drag',function(e){
					e.stopPropagation();
					var offsetX = e.clientX - x,
					offsetY = e.clientY - y,
					l = left + offsetX,
					t = top + offsetY;
					maxLeft = $(window).width() - $wrap.outerWidth();
					maxTop = $(window).height() - $wrap.outerHeight();
					if(l <= 0){
						l = 0;
					}else if(l >= maxLeft){
						 l = maxLeft;
					}
					if(t <= 0){
						t = 0;
					}else if(t >= maxTop){
						t = maxTop;
					}
					$wrap.css({
						left: l,
						top: t,
						position: "absolute",
						marginLeft: 0,
						marginTop: 0
					});
					$(this).on('mouseup.drag',function(){
						$(this).off(".drag");
					});
				});
			});
		}
	};

	Lib.init = function(methodName,opts){
		return new Lib(methodName,opts);
	};

	SE.lib = Lib.init;

})();