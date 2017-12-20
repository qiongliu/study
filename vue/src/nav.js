Vue.component('m-nav',{
	props: {
		nav: {
			type: Array,
			default: ['html','css']
		},
		navActive: {
			type: Number,
			default: 0
		}
	},
	template: '<ul class="nav"><li :class="{active: navActive == index}" v-for="(item,index) in nav"><a href=javascript:;>{{item}}</a></li></ul>'
});