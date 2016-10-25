//main.js

requirejs.config({
	paths:{
		jquery: 'jquery-1.11.3.min'
	}
});

requirejs(['jquery','note','carousel-poster','carousel-fade','lightbox','scrollto','validation'],
	function($,note,carouselPoster,carouselFade,lightBox,scrollTo,validation){
	new note.Note();
	carouselPoster.CarouselPoster.init($(".P_CarouselPoster"));
	carouselFade.CarouselFade.init($(".P_CarouselFade"));
	new lightBox.LightBox();
	scrollTo.ScrollTo.init($(".P_ScrollTo"));
	new validation.Validation();
})