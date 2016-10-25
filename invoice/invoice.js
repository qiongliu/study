var InvoiceIndex = {
	initial : function($wrap,data,urlParameters) {
		var _this = this;
		InvoiceData.list(urlParameters,data, function(invoices){
			var sum = 0;
			$.each(invoices,function(){
				$wrap.append(_this.getView(this,true));
				sum+=this.amount;
			}); 
			AccountData.list(function(accounts){
				$.each($wrap.find("span.costlist[data-name='accountItemId']"),function(){
					var $this = $(this);
					var id = parseInt($this.attr("data-value"));
					if(!isNaN(id)){
						$.each(accounts,function(){
							if(id==this.id){
								$this.html(this.name);   //?
								return false;
							}
						});
					}
				});
			});
			AmbDepartment.list(function(ambDepartments){
				$.each($wrap.find("span.costlist[data-name='departmentId']"),function(){
					var $this = $(this);
					var id = parseInt($this.attr("data-value"));
					if(!isNaN(id)){
						$.each(ambDepartments,function(){
							if(id==this.id){
								$this.html(this.name);
								return false;
							}
						});
					}
				});
			});
			PaymentUnitData.list(function(paymentUnits){
				$.each($wrap.find("span.costlist[data-name='paymentUnitId']"),function(){
					var $this = $(this);
					var id = parseInt($this.attr("data-value")); //？
					if(!isNaN(id)){
						$.each(paymentUnits,function(){
							if(id==this.id){
								$this.html(this.name);
								return false;
							}
						});
					}
				});
			});
			$("#invoice-sum,#income-should-sum").html(sum);
		});
		IncomeData.sum(null, function(r){
			$("#had-income-sum").html(r);
		});
	},
	getView:function(invoice,lazy){
		var $template = Template.getInvoiceList();
		$template.find("span.costlist[data-name='invoiceDate']").html($.jhk.time(invoice.invoiceDate,"yyyy-MM-dd"));
		if(invoice.tax!=null){
			$template.find("span.costlist[data-name='amount']>span.total-sum").html(invoice.amount+"<span>("+invoice.tax+"%)</span>").attr("data-value",invoice.amount);
			$template.find("span.costlist[data-name='tax']").html(invoice.amount*invoice.tax/100);
		}else{
			$template.find("span.costlist[data-name='amount']>span.total-sum").html(invoice.amount).attr("data-value",invoice.amount);
		}
		$template.find("span.costlist[data-name='type']").html(Setting.invoiceTypeText(invoice.type));
		$template.find("span.costlist[data-name='number']").html(invoice.number);
		$template.find("span.costlist[data-name='image'] img").attr("src",pageData.path+"/input/invoice/"+invoice.image+".htm");
		$template.find("span.costlist[data-name='accountItemId']").attr("data-value",invoice.accountItemId);
		$template.find("span.costlist[data-name='departmentId']").attr("data-value",invoice.departmentId);
		$template.find("span.costlist[data-name='paymentUnitId']").attr("data-value",invoice.paymentUnitId);
		$template.find("span.costlist[data-name='state'] span.temp-state").html(invoice.state);
		$template.find("span.costlist[data-name='remarks']").html(invoice.remarks);
		$template.find("span.costlist[data-name='userId'] img").attr("data-value",invoice.userId);
		$template.attr("data-id",invoice.id);
		IncomeData.getCount({"invoiceId":invoice.id}, function(r){
			var $state = $template.find("span.skqk-state[data-name='state']");
			$state.find(".temp-state").html("("+r+")");
			$state.find(".font12_h4").html(Setting.invoiceIncomeState(invoice.incomeState));
		});
		IncomeData.sum({"invoiceId":invoice.id},function(r){
			$template.find("span.charged-sum").html(r);
		});
		if(!lazy){
			if(invoice.accountItemId!=null){
				AccountData.list(function(accounts){
					$.each(accounts,function(){
						if(invoice.accountItemId==this.id){
							$template.find("span.costlist[data-name='accountItemId']").html(this.name);
							return false;
						}
					});
				});
			}
			if(invoice.departmentId!=null){
				AmbDepartment.list(function(ambDepartments){
					$.each(ambDepartments,function(){
						if(invoice.departmentId==this.id){
							$template.find("span.costlist[data-name='departmentId']").html(this.name);
							return false;
						}
					});
				});
			}
			if(invoice.paymentUnitId!=null){
				PaymentUnitData.list(function(paymentUnits){
					$.each(paymentUnits,function(){
						if(invoice.paymentUnitId==this.id){
							$template.find("span.costlist[data-name='paymentUnitId']").html(this.name);
							return false;
						}
					});
				});
			}
		}
		return $template;
	},
	add : function() {
		$("#jhk-income-container").append(this.showEdit(null));
	},
	edit : function(This) {
		var _this=this;
		var $li = $(This).parents("li.cost-input-list");
		InvoiceData.get($li.attr("data-id"), function(invoice){
			_this.showEdit(invoice).appendTo($li);
		});
	},
	showEdit:function(invoice){
		var isNew = invoice==null;
		var $template;
		if(isNew){
			$template= Template.getInvoiceAdd();
		}else{
			$template= Template.getInvoiceEdit();
		}
		//照片
		var $img = $template.find("span.add-box-drop-down[data-name='image']");
		$img.find(".add-photo").click(function(){
			var $a = $(this).parent();
			$a.find("input[type='file']").trigger("click");
		});
		$img.find(".delete-photo").click(function(){
			var $parent = $(this).parent();
			$parent.find(".add-photo").show();
			$parent.find("img").attr({"src":"","data-value":""}).hide();
			$parent.find(".delete-photo").hide();
		});
		var randomId = $.jhk.randomId();
		$img.find("input[type='file']").attr("id",randomId).bind("change",function(){
			var $parent = $(this).parent();
			InvoiceData.uploadImg(randomId, function(src){
				src=eval(src);
				$parent.find(".add-photo,input").hide();
				$parent.find("img").attr({"src":pageData.path+"/input/invoice/"+src+".htm","data-value":src}).show();
				$parent.find(".delete-photo").attr("style","");
			}, function(){
				console.log("上传失败");
			});
		});
		//时间
		var $invoiceDate=$template.find("span.add-box-drop-down[data-name='invoiceDate']");
		if(isNew){
			$invoiceDate.find("p:first").bind("mouseenter",function(){
				var $this = $(this);
				$this.unbind("mouseenter");
				$this.next().jhkCalendar({dayClick:function(e,data){
					var day=data.yyyy+"-"+(data.mm<10?("0"+data.mm):data.mm)+"-"+(data.dd<10?("0"+data.dd):data.dd);
					$this.html(day).attr("data-value",day);
				}});
			});
		}
		//总额
		var $amount = $template.find("span.add-box-drop-down[data-name='amount']");
		if(isNew){
			$amount.find("input:first").bind("blur",function(){
				if(this.value!=""){
					if(isNaN(this.value)){
						this.value="";
					}
				}
			});
		}
		//税率
		var $tax = $template.find("span.add-box-drop-down[data-name='tax']>p");
		$tax.bind("mouseenter",function(){
			var $this = $(this);
			$this.unbind("mouseenter");
			var $ul = $this.next();
			var value = parseFloat($this.attr("data-value"));
			$.each(Setting.invoiceTaxs,function(){
				var _this=this;
				var $li = $("<li class=\"drop-down-list\">"+this+"%</li>");
				if(this==value){
					$li.addClass("down-list-checked");
				}
				$li.click(function(){
					var $this = $(this);
					if($this.hasClass("down-list-checked")){
						return false;
					}
					$this.siblings(".down-list-checked").removeClass("down-list-checked");
					$this.addClass("down-list-checked");
					$this.parent().prev().attr("data-value",_this).html(_this+"%");
				});
				$ul.append($li);
			});
		});
		//类型
		var $type = $template.find("span.add-box-drop-down[data-name='type']>p");
		$type.bind("mouseenter",function(){
			var $this = $(this);
			$this.unbind("mouseenter");
			var $ul = $this.next();
			var value = parseInt($this.attr("data-value"));
			$.each(Setting.invoiceTypes,function(){
				var _this=this;
				var $li = $("<li class=\"drop-down-list\" data-value=\""+this.value+"\">"+this.name+"</li>");
				if(this.value==value){
					$li.addClass("down-list-checked");
				}
				$li.click(function(){
					var $this = $(this);
					if($this.hasClass("down-list-checked")){
						return false;
					}
					$this.siblings(".down-list-checked").removeClass("down-list-checked");
					$this.addClass("down-list-checked");
					$this.parent().prev().attr("data-value",_this.value).html(_this.name);
				});
				$ul.append($li);
			});
		});
		//科目
		var $account = $template.find("span.add-box-drop-down[data-name='accountItemId']");
		if(isNew){
			$account.find("p:first").jhkSelectList({
				title : "选择科目",
				getList:function(callback){
					this.initialCheck=[{id:this.$element.attr("data-value")}];
					AccountData.getIncomeAccount(function(accounts){
						callback(accounts);
					});
				},
				canCheck:function(o){return o.isEnd==1;},
				beforeCheck:function(o,type,callback){
					this.$element.attr("data-value",o.id).html(o.name);
					this.$element.parents(".edit-box:first").find("span.add-box-drop-down[data-name='departmentId']>p:first").removeAttr("data-value").html("收款部门");
					callback();
				}
			});
		}
		//部门 
		var $department = $template.find("span.add-box-drop-down[data-name='departmentId']");
		if(isNew){
			$department.find("p:first").jhkSelectList({
				title : "选择部门",
				beforePop:function(callback){
					var $this = this.$element,$div = $this.parents(".edit-box:first");
					var $account = $div.find("span.add-box-drop-down[data-name='accountItemId']>p:first");
					if($account.attr("data-value")==undefined){
						alert("请选选择科目");
						return;
					}else{
						this._accountId=$account.attr("data-value");
					}
					callback();
				},
				getList:function(callback){
					var _this=this;
					this.initialCheck=[{id:this.$element.attr("data-value")}];
					AmbDepartment.getDepartByItemId(this._accountId,function(depIds){
						_this._cancheckedIds=depIds;
						AmbDepartment.list(function(list){
							callback(list);
						});
					});
				},
				canCheck:function(o){
					var flg=false;
					$.each(this._cancheckedIds,function(){
						if(this==o.id){
							flg=true;return false;
						}
					});
					return flg;
				},
				beforeCheck:function(o,type,callback){
					this.$element.attr("data-value",o.id).html(o.name);
					callback();
				}
			});
		}
		//付款单位
		var $paymentUnit = $template.find("span.add-box-drop-down[data-name='paymentUnitId']>p");
		$paymentUnit.bind("mouseenter",function(){
			var $this = $(this);
			$this.unbind("mouseenter");
			var $ul = $this.next();
			var value = parseInt($this.attr("data-value"));
			PaymentUnitData.list(function(paymentUnits){
				$.each(paymentUnits,function(){
					var _this=this;
					var $li = $("<li class=\"drop-down-list\" data-value=\""+this.id+"\">"+this.name+"</li>");
					if(this.id==value){
						$li.addClass("down-list-checked");
					}
					$li.click(function(){
						var $this = $(this);
						if($this.hasClass("down-list-checked")){
							return false;
						}
						$this.siblings(".down-list-checked").removeClass("down-list-checked");
						$this.addClass("down-list-checked");
						$this.parent().prev().attr("data-value",_this.id).html(_this.name);
					});
					$ul.append($li);
				});
			});
		});
		if(!isNew){
			$template.attr("data-id",invoice.id);
			if(invoice.invoiceDate!=null){
				$invoiceDate.html($.jhk.time(invoice.invoiceDate,"yyyy-MM-dd"));
			}
			if(invoice.type!=null){
				$type.html(Setting.invoiceTypeText(invoice.type)).attr("data-value",invoice.type);
			}
			if(invoice.amount!=null){
				$amount.html(invoice.amount);
			}
			if(invoice.tax!=null){
				$tax.html(invoice.tax+"%").attr("data-value",invoice.tax);
			}
			if(invoice.image!=null){
				$img.find("img").show().attr("src",pageData.path+"/input/invoice/"+invoice.image+".htm").attr("data-value",invoice.image);
				$img.find(".delete-photo").attr("style","");
			}else{
				$img.find(".add-photo").show();
			}
			if(invoice.remarks!=null){
				$template.find("span.add-box-drop-down[data-name='remarks']>input").val(invoice.remarks);
			}
			if(invoice.number!=null){
				$template.find("span.add-box-drop-down[data-name='number']>input").val(invoice.number);
			}
			if(invoice.accountItemId!=null){
				AccountData.list(function(accounts){
					$.each(accounts,function(){
						if(invoice.accountItemId==this.id){
							$account.html(this.name);
							return false;
						}
					});
				});
			}
			if(invoice.departmentId!=null){
				AmbDepartment.list(function(deps){
					$.each(deps,function(){
						if(invoice.departmentId==this.id){
							$department.html(invoice.departmentId);
							return false;
						}
					});
				});
			}
			if(invoice.paymentUnitId!=null){
				$paymentUnit.attr("data-value",invoice.paymentUnitId);
			}
		}else{
			$img.find(".add-photo").show();
		}
		return $template;
	},
	save:function(This){
		var _this =this;
		var $this = $(This);
		if($this.data("saving")==1){
			return true;
		}
		$this.data("saving",1);
		var $wrap = $this.parents("div.edit-box:first");
		var data={"id":$wrap.attr("data-id"),
				"tax":$wrap.find("span.add-box-drop-down[data-name='tax']>p").attr("data-value"),
				"type":$wrap.find("span.add-box-drop-down[data-name='type']>p").attr("data-value"),
				"number":$wrap.find("span.add-box-drop-down[data-name='number']>input").val(),
				"image":$wrap.find("span.add-box-drop-down[data-name='image'] img").attr("data-value"),
				"paymentUnitId":$wrap.find("span.add-box-drop-down[data-name='paymentUnitId']>p").attr("data-value"),
				"remarks":$wrap.find("span.add-box-drop-down[data-name='remarks']>input").val()
		};
		if(data.id==undefined){
			data=$.extend(data,{"invoiceDate":$wrap.find("span.add-box-drop-down[data-name='invoiceDate']>p").attr("data-value"),
				"amount":$wrap.find("span.add-box-drop-down[data-name='amount']>input").val(),
				"accountItemId":$wrap.find("span.add-box-drop-down[data-name='accountItemId']>p").attr("data-value"),
				"departmentId":$wrap.find("span.add-box-drop-down[data-name='departmentId']>p").attr("data-value")});
			if(data.invoiceDate==undefined){
				alert("请选择开票时间");
				$this.data("saving",0);
				return true;
			}
			if(!$.jhk.isNum(data.amount)){
				alert("请输入发票金额");
				$this.data("saving",0);
				return true;
			}
			if(data.accountItemId==undefined){
				alert("请选择收入科目");
				$this.data("saving",0);
				return true;
			}
			if(data.departmentId==undefined){
				alert("请选择收款部门");
				$this.data("saving",0);
				return true;
			}
		}
		InvoiceData.save(data, function(r){
			var $li = $(This).parents("li.cost-input-list:first");
			_this.getView(r,false).insertAfter($li);
			$li.remove();
			$this.data("saving",0);
		}, function(){
			console.log("保存失败");
			$this.data("saving",0);
		});
	},
	close:function(This){
		var $li = $(This).parents("li.cost-input-list:first");
		if($li.attr("data-id")){
			$li.find("div.edit-box:first").remove();
		}else{
			$li.remove();
		}
	},
	del :function(This){
		var $li = $(This).parents("li.cost-input-list:first");
		InvoiceData.save({"id":$li.attr("data-id"),"state":1}, function(r){
			$li.remove();
		}, function(){
			console.log("保存失败");
		});
	},
	showIncomeList:function(This,callback){
		var $li = $(This).parents("li.cost-input-list:first");
		var $wrap = $li.find(".amount-details-box:first");
		if($wrap.is(":visible")){
			$wrap.hide();
		}else{
			$wrap.show();
			if($wrap.data("initial")==1){
				if(typeof callback==="function"){
					callback();
				}
			}else{
				var _this=this;
				$wrap.data("initial",1);
				$wrap.find(".details-list-header .received-sum").html($li.find("span.costlist[data-name='amount']>span.total-sum").attr("data-value"));
				IncomeData.list({"invoiceId":$li.attr("data-id")}, function(incomes){
					var $footer = $wrap.find(".details-list-footer");
					var sum = 0;
					$.each(incomes,function(i,v){
						sum+=v.amount;
						var $template = _this.getIncomeView(v,i+1);
						$template.insertBefore($footer);
					});
					$footer.find(".received-sum").html(sum);
					if(typeof callback==="function"){
						callback();
					}
					var $lis = $wrap.find("li.amount-details-list");
					IncomeModelData.list(function(models){
						$.each($lis,function(){
							var $received =$(this).find("span.received-type:first");
							$.each(models,function(){
								if(this.id==parseInt($received.attr("data-value"))){
									$received.html(this.name);
									return false;
								}
							})
						});
					});
					IncomeAccountData.list(function(accounts){
						$.each($lis,function(){
							var $bank =$(this).find("span.bank-name-number:first");
							$.each(accounts,function(){
								if(this.id==$bank.attr("data-value")){
									$bank.html(this.bank+" "+this.account);
									return false;
								}
							});
						});
					});
				});
			}
		}
	},
	getIncomeView:function(income,index){
		var $template = Template.getIncomeList();
		$template.attr({"data-id":income.id,"data-invoiceId":income.invoiceId});
		$template.find("span.details-list[data-name='index']:first").html(index+".");
		$template.find("time.details-list[data-name='date']:first").html($.jhk.time(income.date,"yyyy-MM-dd"));
		$template.find("em.details-list[data-name='amount']:first").html(income.amount);
		$template.find("span.details-list[data-name='incomeModeId']:first").attr("data-value",income.incomeModeId);
		$template.find("span.details-list[data-name='incomeAccountId']:first").attr("data-value",income.incomeAccountId);
		return $template;
	},
	addIncome:function(This){
		var $li = $(This).parents("li.cost-input-list:first");
		var $footer = $li.find(".details-list-footer:first");
		var _this = this;
		if(!$li.find(".amount-details-box:first").is(":visible")){
			_this.showIncomeList(This,function(){
				_this.showIncomeEdit($li.attr("data-id"),null).insertBefore($footer);
			});
		}else{
			_this.showIncomeEdit($li.attr("data-id"),null).insertBefore($footer);
		}
	},
	editIncome:function(This){
		var $li = $(This).parents("li.amount-details-list:first");
		var _this=this;
		IncomeData.get($li.attr("data-id"), function(income){
			_this.showIncomeEdit(null, income).appendTo($li);
		});
	},
	deleteIncome:function(This){
		var $li = $(This).parents("li.amount-details-list:first");
		IncomeData.del($li.attr("data-id"), function(){
			$li.remove();
		}, function(){
			console.log("删除失败");
		});
	},
	showIncomeEdit:function(invoiceId,income){
		var isNew = income==null;
		var $template;
		if(isNew){
			$template=Template.getIncomeAdd();
			$template.children("div.add-box").attr("data-invoiceId",invoiceId);
		}else{
			$template=Template.getIncomeEdit();
			$template.attr({"data-id":income.id,"data-invoiceId":income.invoiceId});
		}
		var $invoiceDate=$template.find("span.add-box-drop-down[data-name='date']");
		if(isNew){
			$invoiceDate.find("p:first").bind("mouseenter",function(){
				var $this = $(this);
				$this.unbind("mouseenter");
				$this.next().jhkCalendar({dayClick:function(e,data){
					var day=data.yyyy+"-"+(data.mm<10?("0"+data.mm):data.mm)+"-"+(data.dd<10?("0"+data.dd):data.dd);
					$this.html(day).attr("data-value",day);
				}});
			});
		}
		var $model = $template.find("span.add-box-drop-down[data-name='incomeModeId']");
		$model.find("p:first").bind("mouseenter",function(){
			var $this = $(this);
			$this.unbind("mouseenter");
			var $ul = $this.next();
			var value = parseFloat($this.attr("data-value"));
			IncomeModelData.list(function(modelList){
				$.each(modelList,function(){
					var _this=this;
					var $li = $("<li class=\"drop-down-list\">"+this.name+"</li>");
					if(this.id==value){
						$li.addClass("down-list-checked");
					}
					$li.click(function(){
						var $this = $(this);
						if($this.hasClass("down-list-checked")){
							return false;
						}
						$this.siblings(".down-list-checked").removeClass("down-list-checked");
						$this.addClass("down-list-checked");
						$this.parent().prev().attr("data-value",_this.id).html(_this.name);
					});
					$ul.append($li);
				});
			});
		});
		var $account = $template.find("span.add-box-drop-down[data-name='incomeAccountId']>p");
		$account.bind("mouseenter",function(){
			var $this = $(this);
			$this.unbind("mouseenter");
			var $ul = $this.next();
			var value = parseFloat($this.attr("data-value"));
			IncomeAccountData.list(function(accountList){
				$.each(accountList,function(){
					var _this=this;
					var $li = $("<li class=\"drop-down-list\">"+this.bank+" "+this.account+"</li>");
					if(this.id==value){
						$li.addClass("down-list-checked");
					}
					$li.click(function(){
						var $this = $(this);
						if($this.hasClass("down-list-checked")){
							return false;
						}
						$this.siblings(".down-list-checked").removeClass("down-list-checked");
						$this.addClass("down-list-checked");
						$this.parent().prev().attr("data-value",_this.id).html(_this.account);
					});
					$ul.append($li);
				});
			});
		});
		if(!isNew){
			if(income.date!=null){
				$invoiceDate.html("data-value",$.jhk.time(income.date,"yyyy-MM-dd"));
			}
			if(income.incomeModeId!=null){
				$model.attr("data-value",income.incomeModeId);
			}
			if(income.incomeAccountId!=null){
				$account.attr("data-value",income.incomeAccountId);
			}
			if(income.amount!=null){
				$template.find("span.add-box-drop-down[data-name='amount']").html(income.amount);
			}
		}
		return $template;
	},
	saveIncome:function(This){
		var $wrapDiv = $(This).parents("div.add-box:first");
		var _this = this;
		var data={
			"id":$wrapDiv.attr("data-id"),
			"incomeModeId":$wrapDiv.find("span.add-box-drop-down[data-name='incomeModeId']:first>p").attr("data-value"),
			"incomeAccountId":$wrapDiv.find("span.add-box-drop-down[data-name='incomeAccountId']:first>p").attr("data-value"),
		};
		if(data.id==undefined){
			data=$.extend(data,{
				"date":$wrapDiv.find("span.add-box-drop-down[data-name='date']:first>p").attr("data-value"),
				"amount":$wrapDiv.find("span.add-box-drop-down[data-name='amount']:first>input").val(),
				"invoiceId":$wrapDiv.attr("data-invoiceId")
			});
			if(data.date==undefined){
				alert("请选择时间");
				return;
			}
			if(!$.jhk.isNum(data.amount)){
				alert("请输入金额");
				return;
			}
		}
		IncomeData.save(data, function(income){
			var $li = $wrapDiv.parents("li.amount-details-list:first");
			var $template = _this.getIncomeView(income, $li.index());
			$template.insertAfter($li);
			$li.remove();
			IncomeModelData.list(function(models){
				$.each(models,function(){
					if(this.id==income.incomeModeId){
						$template.find("span.received-type:first").html(this.name);
						return false;
					}
				})
			});
			IncomeAccountData.list(function(accounts){
				$.each(accounts,function(){
					if(this.id==income.incomeAccountId){
						$template.find("span.bank-name-number:first").html(this.bank+" "+this.account);
						return false;
					}
				})
			});
		}, function(){console.log("修改失败");});
	},
	closeIncome:function(This){
		var $this = $(This);
		if($this.parents("div.add-box:first").attr("data-id")){
			$this.parents("div.add-box:first").remove();
		}else{
			$this.parents("li.amount-details-list:first").remove();
		}
	}
};
var InvoiceSearch={
	deps:[],
	types:[],
	accountItemIds:[],
	incomeStates:[],
	taxs:[],
	paymentUnitIds:[],
	fromToDate :[],
	fromToAmount :[],
	fromToDateBtn:function(){
		var fromDate = $("#invoice_from_time").val();
		var toDate = $("#invoice_to_time").val();
		if(fromDate===""||toDate===""){
			return false;
		}
		this.fromToDate=[fromDate,toDate];
		this.search();
		this.showSearchConditions(1, null,null, null);
	},
	fromToAmountBtn:function(){
		var fromAmount = $("#invoice_from_amount").val();
		var toAmount = $("#invoice_to_amount").val();
		if(fromAmount===""||toAmount===""){
			return false;
		}
		this.fromToAmount=[fromAmount,toAmount];
		this.search();
		this.showSearchConditions(2, null, null,null);
	},
	showDeps:function(This){
		var _this =this;
		var $this = $(This);
		$this.attr("onmousemove","");
		AmbDepartment.list(function(deps){
			var $div = $this.children('.tflist-dropdown-box');
			var $ul = $("<ul class=\"setleadership bod_bot\"></ul>");
			var fourLevelClass=[],lastGrade;
			$.each(deps,function(){
				var $li = Template.searchDropLi();
				$li.addClass(Setting.gradeClass[this.grade]);
				$li.find(".department-name:first").html(this.name);
				$li.attr("data-value",this.id);
				if(this.isEnd==1){
					$li.find(".temp-sub-icon:first").removeClass("verticaLine");
				}
				var depThis =this;
				if(this.state==0){
					$li.click(function(){
						var $this = $(this);
						if($this.hasClass("department-name-checked")){
							_this.deps=_this.deps.filter(function(r){return r!=depThis.id});
							$this.removeClass("department-name-checked");
							_this.search();
							_this.showSearchConditions(3, depThis.id,depThis.name, 0);
						}else{
							$this.addClass("department-name-checked");
							_this.deps.push(depThis.id);
							_this.search();
							_this.showSearchConditions(3, depThis.id,depThis.name, 1);
						}
					});
				}
				$li.find(".temp-sub-icon:first").click(function(event){
					event.stopPropagation();
					var $this = $(this),$li=$this.parents("li:first");
					if(!$this.hasClass("closed-recordIcon")){
						$this.addClass("closed-recordIcon");
						$li.parent().find($li.attr("subClass")).hide();
					}else{
						$this.removeClass("closed-recordIcon");
						$li.parent().find($li.attr("subClass")).show();
					}
				});
				if(this.grade==0){
					fourLevelClass=["temp-grade-"+this.id];
					$li.attr({"subClass":"."+fourLevelClass[0]});
				}else{
					if(lastGrade&&lastGrade>=this.grade){
						for(var i=fourLevelClass.length-this.grade;i>0;i--){
							fourLevelClass.pop();
						}
					}
					 $li.addClass(fourLevelClass.join(" "));
					 fourLevelClass.push("temp-grade-"+this.id);
					 $li.attr("subClass","."+fourLevelClass.join("."));
					lastGrade=this.grade;
				}
				$ul.append($li);
			});
			$div.append($ul);
			$ul.mCustomScrollbar({
				theme:"minimal"
			});
		});
		$this.children('.tflist-title').addClass('tflist-title-rate');
		$this.children('.tflist-dropdown-box').show();
		$this.hover(function(){
			$(this).children('.tflist-title').toggleClass(' tflist-title-rate');
			$(this).children('.tflist-dropdown-box').toggle();
		});
	},
	showIncomeState:function(This){
		var $this = $(This);
		var _this =this;
		$this.attr("onmousemove","");
		var $div = $this.children('.tflist-dropdown-box');
		var $ul = $("<ul class=\"setleadership bod_bot\"></ul>");
		$.each(Setting.invoiceIncomeStates,function(){
			var $li = $("<li class=\"stleship-list\">"+this.name+"</li>");
			$li.attr("data-value",this.value);
			var typeThis =this;
			$li.click(function(){
				var $this = $(this);
				if($this.hasClass("department-name-checked")){
					_this.incomeStates=_this.incomeStates.filter(function(r){return r!=typeThis.value});
					$this.removeClass("department-name-checked");
					_this.search();
					_this.showSearchConditions(4, typeThis.value,typeThis.name, 0);
				}else{
					$this.addClass("department-name-checked");
					_this.incomeStates.push(typeThis.value);
					_this.search();
					_this.showSearchConditions(4, typeThis.value,typeThis.name, 1);
				}
			});
			$ul.append($li);
		});
		$div.append($ul);
		$ul.mCustomScrollbar({
			theme:"minimal"
		});
		$this.children('.tflist-title').addClass('tflist-title-rate');
		$this.children('.tflist-dropdown-box').show();
		$this.hover(function(){
			$(this).children('.tflist-title').toggleClass(' tflist-title-rate');
			$(this).children('.tflist-dropdown-box').toggle();
		});
	},
	showType:function(This){
		var $this = $(This);
		var _this =this;
		$this.attr("onmousemove","");
		var $div = $this.children('.tflist-dropdown-box');
		var $ul = $("<ul class=\"setleadership bod_bot\"></ul>");
		$.each(Setting.invoiceTypes,function(){
			var $li = $("<li class=\"stleship-list\">"+this.name+"</li>");
			$li.attr("data-value",this.value);
			var typeThis =this;
			$li.click(function(){
				var $this = $(this);
				if($this.hasClass("department-name-checked")){
					_this.types=_this.types.filter(function(r){return r!=typeThis.value});
					$this.removeClass("department-name-checked");
					_this.search();
					_this.showSearchConditions(5, typeThis.value,typeThis.name, 0);
				}else{
					$this.addClass("department-name-checked");
					_this.types.push(typeThis.value);
					_this.search();
					_this.showSearchConditions(5, typeThis.value,typeThis.name, 1);
				}
			});
			$ul.append($li);
		});
		$div.append($ul);
		$ul.mCustomScrollbar({
			theme:"minimal"
		});
		$this.children('.tflist-title').addClass('tflist-title-rate');
		$this.children('.tflist-dropdown-box').show();
		$this.hover(function(){
			$(this).children('.tflist-title').toggleClass(' tflist-title-rate');
			$(this).children('.tflist-dropdown-box').toggle();
		});
	},
	showAccounts:function(This){
		var $this = $(This);
		var _this =this;
		$this.attr("onmousemove","");
		AccountData.getIncomeAccount(function(accounts){
			var $div = $this.children('.tflist-dropdown-box');
			var $ul = $("<ul class=\"setleadership bod_bot\"></ul>");
			var fourLevelClass=[],lastGrade;
			$.each(accounts,function(){
				var $li = Template.searchDropLi();
				$li.addClass(Setting.gradeClass[this.grade]);
				$li.find(".department-name:first").html(this.name);
				$li.attr("data-value",this.id);
				if(this.isEnd==1){
					$li.find(".temp-sub-icon:first").removeClass("verticaLine");
				}
				var depThis =this;
				$li.click(function(){
					var $this = $(this);
					if($this.hasClass("department-name-checked")){
						_this.accountItemIds=_this.accountItemIds.filter(function(r){return r!=depThis.id});
						$this.removeClass("department-name-checked");
						_this.search();
						_this.showSearchConditions(6, depThis.id,depThis.name, 0);
					}else{
						$this.addClass("department-name-checked");
						_this.accountItemIds.push(depThis.id);
						_this.search();
						_this.showSearchConditions(6, depThis.id,depThis.name, 1);
					}
				});
				$li.find(".temp-sub-icon:first").click(function(event){
					event.stopPropagation();
					var $this = $(this),$li=$this.parents("li:first");
					if(!$this.hasClass("closed-recordIcon")){
						$this.addClass("closed-recordIcon");
						$li.parent().find($li.attr("subClass")).hide();
					}else{
						$this.removeClass("closed-recordIcon");
						$li.parent().find($li.attr("subClass")).show();
					}
				});
				if(this.grade==0){
					fourLevelClass=["temp-grade-"+this.id];
					$li.attr({"subClass":"."+fourLevelClass[0]});
				}else{
					if(lastGrade&&lastGrade>=this.grade){
						for(var i=fourLevelClass.length-this.grade;i>0;i--){
							fourLevelClass.pop();
						}
					}
					 $li.addClass(fourLevelClass.join(" "));
					 fourLevelClass.push("temp-grade-"+this.id);
					 $li.attr("subClass","."+fourLevelClass.join("."));
					lastGrade=this.grade;
				}
				$ul.append($li);
			});
			$div.append($ul);
			$ul.mCustomScrollbar({
				theme:"minimal"
			});
		});
		$this.children('.tflist-title').addClass('tflist-title-rate');
		$this.children('.tflist-dropdown-box').show();
		$this.hover(function(){
			$(this).children('.tflist-title').toggleClass(' tflist-title-rate');
			$(this).children('.tflist-dropdown-box').toggle();
		});
	},
	showUnits:function(This){
		var $this = $(This);
		var _this =this;
		$this.attr("onmousemove","");
		PaymentUnitData.list(function(deps){
			var $div = $this.children('.tflist-dropdown-box');
			var $ul = $("<ul class=\"setleadership bod_bot\"></ul>");
			$.each(deps,function(){
				var $li = $("<li class=\"stleship-list\">"+this.name+"</li>");
				$li.attr("data-value",this.id);
				var typeThis =this;
				$li.click(function(){
					var $this = $(this);
					if($this.hasClass("department-name-checked")){
						_this.paymentUnitIds=_this.paymentUnitIds.filter(function(r){return r!=typeThis.id});
						$this.removeClass("department-name-checked");
						_this.search();
						_this.showSearchConditions(7, typeThis.id,typeThis.name, 0);
					}else{
						$this.addClass("department-name-checked");
						_this.paymentUnitIds.push(typeThis.id);
						_this.search();
						_this.showSearchConditions(7, typeThis.id,typeThis.name,1);
					}
				});
				$ul.append($li);
			});
			$div.append($ul);
			$ul.mCustomScrollbar({
				theme:"minimal"
			});
		});
		$this.children('.tflist-title').addClass('tflist-title-rate');
		$this.children('.tflist-dropdown-box').show();
		$this.hover(function(){
			$(this).children('.tflist-title').toggleClass(' tflist-title-rate');
			$(this).children('.tflist-dropdown-box').toggle();
		});
	},
	showTax:function(This){
		var $this = $(This);
		var _this =this;
		$this.attr("onmousemove","");
		var $div = $this.children('.tflist-dropdown-box');
		var $ul = $("<ul class=\"setleadership bod_bot\"></ul>");
		$.each(Setting.invoiceTaxs,function(){
			var $li = $("<li class=\"stleship-list\">"+this+"%</li>");
			$li.attr("data-value",this);
			var typeThis =this;
			$li.click(function(){
				var $this = $(this);
				if($this.hasClass("department-name-checked")){
					_this.taxs=_this.taxs.filter(function(r){return r!=typeThis});
					$this.removeClass("department-name-checked");
					_this.search();
					_this.showSearchConditions(8, typeThis,typeThis+"%", 0);
				}else{
					$this.addClass("department-name-checked");
					_this.taxs.push(typeThis);
					_this.search();
					_this.showSearchConditions(8, typeThis,typeThis+"%", 1);
				}
			});
			$ul.append($li);
		});
		$div.append($ul);
		$ul.mCustomScrollbar({
			theme:"minimal"
		});
		$this.children('.tflist-title').addClass('tflist-title-rate');
		$this.children('.tflist-dropdown-box').show();
		$this.hover(function(){
			$(this).children('.tflist-title').toggleClass(' tflist-title-rate');
			$(this).children('.tflist-dropdown-box').toggle();
		});
	},
	showSearchConditions:function(type,value,name,addRemove){
		var $searchBox = $("#checked-search-condition");
		var _this =this;
		if(type==1||type==2){
			var $span = $("#temp-type-"+type);
			var $title = Template.getSearchTipTitle(Setting.searchTip[type-1]);
			var $dateLi = Template.getFromToSearchTip(this.fromToDate[0], this.fromToDate[1]);
			$span.html("").append($title).append($dateLi);
			$dateLi.click(function(){
				$("#temp-type-"+type).html("");
				if(type==1){
					_this.fromToDate=[];
					$("#invoice_from_time,#invoice_to_time").val("");
				}else{
					_this.fromToAmount=[];
					$("#invoice_from_amount,#invoice_to_amount").val("");
				}
				_this.search();
				if(_this.isClear()){
					$searchBox.find(".alreday-empty").hide();
				}
			});
			if(!$searchBox.find(".alreday-empty").is(":visible")){
				$searchBox.find(".alreday-empty").show();
			}
		}else if(type>=3&&type<=8){
			var $span = $("#temp-type-"+type);
			if(addRemove==0){
				$span.find("li[data-value='"+value+"']").remove();
				if((type==3&&_this.deps.length==0)||(type==4&&_this.incomeStates.length==0)||(type==5&&_this.types.length==0)||(type==6&&_this.accountItemIds.length==0)||(type==7&&_this.paymentUnitIds.length==0)||(type==8&&_this.taxs.length==0)){
					$span.html("");
				}
				if(_this.isClear()){
					$searchBox.find(".alreday-empty").hide();
				}
			}else{
				if($span.find(".alreday-project").length==0){
					Template.getSearchTipTitle(Setting.searchTip[type-1]).appendTo($span);
				}
				var $li = Template.getSearchTip(value, name);
				$li.appendTo($span);
				$li.click(function(){
					$(this).remove();
					$("div.temp-search-"+type+":first").find("li[data-value='"+value+"']").removeClass("department-name-checked");
					if(type==3){
						_this.deps=_this.deps.filter(function(r){return r!=value;});
						if(_this.deps.length==0){
							$span.html("");
						}
					}else if(type==4){
						_this.incomeStates=_this.incomeStates.filter(function(r){return r!=value;});
						if(_this.incomeStates.length==0){
							$span.html("");
						}
					}else if(type==5){
						_this.types=_this.types.filter(function(r){return r!=value;});
						if(_this.types.length==0){
							$span.html("");
						}
					}else if(type==6){
						_this.accountItemIds=_this.accountItemIds.filter(function(r){return r!=value;});
						if(_this.accountItemIds.length==0){
							$span.html("");
						}
					}else if(type==7){
						_this.paymentUnitIds=_this.paymentUnitIds.filter(function(r){return r!=value;});
						if(_this.paymentUnitIds.length==0){
							$span.html("");
						}
					}else if(type==8){
						_this.taxs=_this.taxs.filter(function(r){return r!=value;});
						if(_this.taxs.length==0){
							$span.html("");
						}
					}
					_this.search();
					if(_this.isClear()){
						$searchBox.find(".alreday-empty").hide();
					}
				});
				if(!$searchBox.find(".alreday-empty").is(":visible")){
					$searchBox.find(".alreday-empty").show();
				}
			}
		}
	},
	clear:function(){
		this.fromToDate=[];
		this.fromToAmount=[];
		this.deps=[];
		this.types=[];
		this.accountItemIds=[];
		this.paymentUnitIds=[];
		this.taxs=[];
		this.incomeStates=[];
		this.search();
		$("#invoice_from_time,#invoice_to_time").val("");
		$("#invoice_from_amount,#invoice_to_amount").val("");
		$("#checked-search-condition").children("span").html("").end().find(".alreday-empty").hide();
		for(var i=3;i<=8;i++){
			$("div.temp-search-"+i+":first").find("li.department-name-checked").removeClass("department-name-checked")
		}
	},
	isClear:function(){
		return this.fromToDate.length==0&&this.fromToAmount.length==0&&this.deps.length==0&&this.incomeStates.length==0&&this.types.length==0&&this.accountItemIds.length==0&&this.paymentUnitIds.length==0&&this.taxs.length==0;
	},
	search:function(){
		var $wrap = $("#jhk-income-container");
		$wrap.children("li.cost-input-list").remove();
		var paramenters=null;
		if(this.deps.length>0){
			paramenters="departmentIds="+this.deps.join("&departmentIds=");
		}
		if(this.types.length>0){
			paramenters=paramenters==null?"":(paramenters+"&");
			paramenters+="types="+this.types.join("&types=");
		}
		if(this.accountItemIds.length>0){
			paramenters=paramenters==null?"":(paramenters+"&");
			paramenters+="accountItemIds="+this.accountItemIds.join("&accountItemIds=");
		}
		if(this.incomeStates.length>0){
			paramenters=paramenters==null?"":(paramenters+"&");
			paramenters+="incomeStates="+this.incomeStates.join("&incomeStates=");
		}
		if(this.taxs.length>0){
			paramenters=paramenters==null?"":(paramenters+"&");
			paramenters+="taxs="+this.taxs.join("&taxs=");
		}
		if(this.paymentUnitIds.length>0){
			paramenters=paramenters==null?"":(paramenters+"&");
			paramenters+="paymentUnitIds="+this.paymentUnitIds.join("&paymentUnitIds=");
		}
		if(this.fromToDate.length==2){
			paramenters=paramenters==null?"":(paramenters+"&");
			paramenters+="fromDate="+this.fromToDate[0]+"&toDate="+this.fromToDate[1];
		}
		if(this.fromToAmount.length==2){
			paramenters=paramenters==null?"":(paramenters+"&");
			paramenters+="fromAmount="+this.fromToAmount[0]+"&toAmount="+this.fromToAmount[1];
		}
		InvoiceIndex.initial($wrap,{"state":0},paramenters);
	}
		
};
var Template = {
	getIncomeAdd : function() {
		if (this.incomeAdd == undefined) {
			var t = $("#temp-income-add").html();
			var first = t.indexOf("<!--"), last = t.lastIndexOf("-->");
			this.incomeAdd = t.substring(first + 4, last);
			$("#temp-income-add").remove();
		}
		return $(this.incomeAdd);
	},
	getIncomeEdit : function() {
		if (this.incomeEdit == undefined) {
			var t = $("#temp-income-edit").html();
			var first = t.indexOf("<!--"), last = t.lastIndexOf("-->");
			this.incomeEdit = t.substring(first + 4, last);
			$("#temp-income-edit").remove();
		}
		return $(this.incomeEdit);
	},
	getIncomeList : function() {
		if (this.incomeList == undefined) {
			var t = $("#temp-income-list").html();
			var first = t.indexOf("<!--"), last = t.lastIndexOf("-->");
			this.incomeList = t.substring(first + 4, last);
			$("#temp-income-list").remove();
		}
		return $(this.incomeList);
	},
	getInvoiceAdd : function() {
		if (this.invoiceAdd == undefined) {
			var t = $("#temp-invoice-add").html();
			var first = t.indexOf("<!--"), last = t.lastIndexOf("-->");
			this.invoiceAdd = t.substring(first + 4, last);
			$("#temp-invoice-add").remove();
		}
		return $(this.invoiceAdd);
	},
	getInvoiceEdit : function() {
		if (this.invoiceEdit == undefined) {
			var t = $("#temp-invoice-edit").html();
			var first = t.indexOf("<!--"), last = t.lastIndexOf("-->");
			this.invoiceEdit = t.substring(first + 4, last);
			$("#temp-invoice-edit").remove();
		}
		return $(this.invoiceEdit);
	},
	getInvoiceList :function(){
		if (this.invoiceList == undefined) {
			var t = $("#temp-invoice-list").html();
			var first = t.indexOf("<!--"), last = t.lastIndexOf("-->");
			this.invoiceList = t.substring(first + 4, last);
			$("#temp-invoice-list").remove();
		}
		return $(this.invoiceList);
	},
	getFromToSearchTip:function(from,to){
		return $("<li class=\"alredayck-list font12_h4 disinle\"><time class=\" font12_h4\">"+from+"</time><span class=\"font12_h4\">到</span><time class=\"font12_h4\">"+to+"</time></li>");
	},
	getSearchTipTitle:function(name){
		return $("<li class=\"disinle alreday-project\"><span class=\"font14_h2\">"+name+"</span></li>");
	},
	getSearchTip:function(value,name){
		return $("<li class=\"alredayck-list font12_h4 disinle\" data-value=\""+value+"\">"+name+"</li>");
	},
	searchDropLi:function(){
		return $("<li class=\"stleship-list\"><span class=\"recordIcon verticaLine temp-sub-icon\"></span><span class=\"department-name\"></span></li>");
	},
};
var Setting = {
		invoiceTypes:[{"value":"1","name":"普通发票"},{"value":"2","name":"增值税发票"},{"value":"3","name":"无发票"}],
		invoiceIncomeStates:[{"value":"0","name":"尚未收款"},{"value":"1","name":"部分收款"},{"value":"2","name":"已收全款"}],
		gradeClass:["department-list","second-department-list","thild-department-list","four-department-list"],
		searchTip:["时间","金额","部门","收入","类型","科目","单位","税率"],
		invoiceTaxs:[2,4,6,8],
		incomeAccount:-1,
		invoiceTypeText:function(type){
			switch(type){
			case 1:
				return "普通发票";
			case 2:
				return "增值税发票";
			case 3:
				return "无发票";
			default:
				return "";
			}
		},
		invoiceIncomeState:function(state){
			switch(state){
			case 0:
				return "尚未收款";
			case 1:
				return "部分收款";
			case 2:
				return "已收全款";
			default:
				return "";
			}
		},
};
var AmbDepartment = {
	deps : null,
	refresh : function() {
		this.deps = null;
	},
	list : function(callback) {
		var _this = this;
		if (_this.deps == null) {
			$.get(pageData.path + "/versionId/setting/department-using.htm", null, function(rs) {
				_this.deps = rs;
				callback(rs);
			}).error(function() {
				callback([]);
			});
		} else {
			callback(this.deps);
		}
	},
	getDepartByItemId:function(id,callback){
		$.get(pageData.path + "/1/setting/get-current-account-item-department-list-by-itemid.htm", {"itemId":id}, function(depIds) {
			callback(depIds);
		}).error(function() {
			callback([]);
		});
		
	}
};
var AccountData = {
	accounts :null,
	refresh : function() {
		this.accounts = null;
	},
	list : function(callback) {
		var _this = this;
		if (_this.accounts == null) {
			$.get(pageData.path + "/versionId/setting/account-using.htm", null, function(rs) {
				_this.accounts = rs;
				callback(rs);
			}).error(function() {
				callback([]);
			});
		} else {
			callback(this.accounts);
		}
	},
	getIncomeAccount:function(callback){
		if(this.incomeAccount==undefined||this.incomeAccount==null){
			var _this=this;
			this.list(function(list){
				_this.incomeAccount = _this.getPiecesOfAccount(list,Setting.incomeAccount);
				callback(_this.incomeAccount);
			});
		}else{
			callback(this.incomeAccount);
		}
	},
	getPiecesOfAccount:function(list,id){
		var c=arguments[2];
		if(c==undefined){
			c=[];
			$.each(list,function(){
				if(this.id==id){
					c=[this];return false;
				}
			});
		}
		for(var i=0;i<list.length;i++){
			if(list[i].parentId==id){
				c.push(list[i]);
				arguments.callee(list,list[i].id,c);
			}
		}
		return c;
	}
};
var PaymentUnitData = {
	payments :null,
	refresh : function() {
		this.payments = null;
	},
	list : function(callback) {
		var _this = this;
		if (_this.payments == null) {
			$.get(pageData.path + "/input/invoice/payment-unit-list.htm", null, function(rs) {
				_this.payments = rs;
				callback(rs);
			}).error(function() {
				callback([]);
			});
		} else {
			callback(this.payments);
		}
	}
	
};
var IncomeModelData = {
	incomeModel :null,
	refresh : function() {
		this.incomeModel = null;
	},
	list : function(callback) {
		var _this = this;
		if (_this.incomeModel == null) {
			$.get(pageData.path + "/input/invoice/income-mode-list.htm", null, function(rs) {
				_this.incomeModel = rs;
				callback(rs);
			}).error(function() {
				callback([]);
			});
		} else {
			callback(this.incomeModel);
		}
	}
		
};
var IncomeAccountData = {
	incomeAccount :null,
	refresh : function() {
		this.incomeAccount = null;
	},
	list : function(callback) {
		var _this = this;
		if (_this.incomeAccount == null) {
			$.get(pageData.path + "/input/invoice/income-account-list.htm", null, function(rs) {
				_this.incomeAccount = rs;
				callback(rs);
			}).error(function() {
				callback([]);
			});
		} else {
			callback(this.incomeAccount);
		}
	}
		
};
var InvoiceData={
	save :function(data,callback,errorback){
		$.post(pageData.path+"/input/invoice/edit.htm",data,function(invoice){
			if(invoice!=null){
				callback(invoice);
			}else{
				errorback();
			}
		}).error(function(){errorback();});
	},
	list :function(urlParameters,data,callback){
		$.get(pageData.path+"/input/invoice/list.htm"+(urlParameters!=null?("?"+urlParameters):""),data,function(invoices){
			callback(invoices);
		}).error(function(){callback([]);});
	},
	get :function(id,callback){
		$.get(pageData.path+"/input/invoice/get.htm",{"id":id},function(invoice){
			callback(invoice);
		});
	},
	uploadImg:function(inputElementId,callback,errorback){
		$.ajaxFileUpload({
            url:pageData.path+'/input/invoice/upload-invoice.htm',
            secureuri:false,
            fileElementId:inputElementId,
            type:"POST",
            dataType: "text",
            success: function (data){   
                callback(data)
            },
            error: function (data, status, e){
                errorback();
            }
        });
	}
};
var IncomeData={
	save :function(data,callback,errorback){
		$.post(pageData.path+"/input/invoice/income/edit.htm",data,function(income){
			if(income!=null){
				callback(income);
			}else{
				errorback();
			}
		}).error(function(){errorback();});
	},
	list :function(data,callback){
		$.get(pageData.path+"/input/invoice/income/list.htm",data,function(incomes){
			callback(incomes);
		}).error(function(){callback([]);});
	},
	get :function(id,callback){
		$.get(pageData.path+"/input/invoice/income/get.htm",{"id":id},function(income){
			callback(income);
		});
	},
	getCount :function(data,callback){
		$.get(pageData.path+"/input/invoice/income/count.htm",data,function(r){
			callback(r);
		}).error(function(){callback(0);});
	},
	sum:function(data,callback){
		$.get(pageData.path+"/input/invoice/income/sum.htm",data,function(r){
			callback(!r?0:r);
		}).error(function(){callback(0);});
	},
	del:function(id,callback,errorback){
		$.get(pageData.path+"/input/invoice/income/delete.htm",{"id":id},function(r){
			console.log(r);
			if(r==1){
				callback();
			}else{
				errorback();
			}
		}).error(function(){errorback();});
	}
};
$(function() {
	InvoiceIndex.initial($("#jhk-income-container"),{"state":0});
	$('#invoice_from_time').calendar({btnBar:false ,maxDate:'#invoice_to_time'});
	$('#invoice_to_time').calendar({btnBar:false ,minDate:'#invoice_from_time'});
});

var InvoiceIndex = {
	initial:function(){
		
	}
}

$(function(){
	InvoiceIndex.initial($('#jhk-income-container'),{'state:0'});
})