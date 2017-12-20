new Vue ({
	el: '#app',
	data: {
		title: 'Vue',
		nav: ['html','css','js','nodejs','vue'],
		navActive: '0',
		slt: ['html','css','js','nodejs','vue']
	},
	methods: {
		sltChange (index) {
			console.log(1);
			this.navActive = index;
		}
	}
});