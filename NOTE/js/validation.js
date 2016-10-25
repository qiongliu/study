define(function(){
	var Validation = function(){
		var name = document.getElementById('name'),
		pwd1 = document.getElementById('password1'),
		pwd2 = document.getElementById('password2'),
		name_msg = document.getElementById('name-tip'),
		pwd1_msg = document.getElementById('psw1-tip'),
		pwd2_msg = document.getElementById('psw2-tip'),
		icon = document.getElementsByTagName('i'),
		name_icon = icon[0],
		em1 = document.getElementById('r'),
		em2 = document.getElementById('z'),
		em3 = document.getElementById('q')
		count = document.getElementById('count'),
		name_length = 0;
  
    // \u4e00-/u9fa5 为汉字 x00-xff 为单字节
   
    	function getLength(str){
    		return str.replace(/[^\x00-\xff]/g, 'xx').length;
    	}
		
		name.onfocus = function(){
			name_msg.innerHTML = '<i class="tips"></i>5-25个字符，一个汉字为两个字符';
			count.style.visibility = 'visible';
		}

		name.onkeyup = function(){	
			name_length = getLength(this.value);	
			count.innerHTML = name_length + "个字符";
		}

		name.onblur = function(){
			var reg = /[^\w\u4e00-\u9fa5]/g;
			if(reg.test(this.value)){
				name_msg.innerHTML = "<i class='arr'></i>含有非法字符";
			}else if(this.value == ''){
				name_msg.innerHTML = "<i class='arr'></i>用户名不能为空";
			}else if(name_length > 25){
				name_msg.innerHTML = "<i class='arr'></i>用户名不能超过25个字符";
			}else if(name_length < 6){
				name_msg.innerHTML = "<i class='arr'></i>用户名不能小于6个字符";
			}else {
				name_msg.innerHTML = "<i class='ok'></i>OK";
			}
		}

		pwd1.onfocus = function(){
			pwd1_msg.innerHTML = '<i class="tips"></i>6-16个字符，请使用数字、字母或者下划线的组合，不能单独使用数字、字母或者下划线';
		}

		pwd1.onkeyup = function(){
			var pwd1Length = this.value.length;
			//大于5个字符，为中，大于10个字符，为强
			if(pwd1Length > 5){
				em2.className = 'active';
				pwd2.removeAttribute('disabled');
				pwd2_msg.innerHTML = '<i class="tips"></i>请再输入一次'
			} else {
				em2.className = '';
				pwd2.setAttribute('disabled','');
				pwd2_msg.innerHTML = '';
			}
			if(pwd1Length > 10){
				em3.className = 'active';
			}else{
				em3.className = '';
			}
		}

		function checkStr(str,char){
			var tmp = 0;
			for (var i = 0; i < str.length; i++) {
				if(str.charAt(i) == char){
					tmp++;
				}
			};
			return tmp;
		}

		pwd1.onblur = function(){
			
			var m = checkStr(this.value,this.value[0]),
			reg_d = /[^\d]/g,
			reg_w = /[^a-zA-Z]/g;
			//密码不能为空
			if(this.value == ''){
				pwd1_msg.innerHTML = '<i class="arr"></i>密码不能为空'
			}
			//不能小于6位
			else if(this.value.length < 6){
				pwd1_msg.innerHTML = '<i class="arr"></i>不能小于6位';
			}
			//不能大于16位
			else if(this.value.length > 16){
				pwd1_msg.innerHTML = '<i class="arr"></i>不能大于16位';
			}
			//不能使用相同字符
			else if(m == this.value.length){
				pwd1_msg.innerHTML = '<i class="arr"></i>不能使用相同字符';
			}
			//不能全为数字
			else if(!reg_d.test(this.value)){
				pwd1_msg.innerHTML = '<i class="arr"></i>不能全为数字';
			}
			//不能全为字母
			else if(!reg_w.test(this.value)){
				pwd1_msg.innerHTML = '<i class="arr"></i>不能全为字母';
			}else{
				pwd1_msg.innerHTML = '<i class="ok"></i>OK';
			}
		}

		pwd2.onblur = function(){
			if(pwd1.value != this.value){
				pwd2_msg.innerHTML = '<i class="arr"></i>两次密码输入不一样'
			}else{
				pwd2_msg.innerHTML = '<i class="ok"></i>OK'
			}
		}

	}

	return{Validation:Validation};
});