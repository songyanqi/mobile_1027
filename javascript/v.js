jQuery(document).ready(function($) {
	var page = "个人页";
	var vContainer = $(".v-con");
	if(vContainer && vContainer.length){
		vAdajust();
	}


	function vAdajust(){
		var bgCon = vContainer.find(".bg_container")
		var w = document.body.clientWidth;
		bgCon.css("max-height",w/2+"px");


	}

});
