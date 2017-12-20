Vue.component('m-select',{
	props: {
		slt: {
			type: Array,
			default: []			
		}
	},
	data: {
		selected: ''
	},
	template: '<select @change="change"><option value="">请选择</option><option v-for="(item,index) in slt" :value="index">{{item}}</option></select>',
	methods: {
		change (index) {
			console.log(0);
			this.$emit('aa');
		}
	}
});