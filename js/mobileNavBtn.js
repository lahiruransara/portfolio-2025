//Custom JS
$(document).ready(function(){
	$('a.target-burger').click(function(e){
		$('div.blur-container, nav.main-nav, a.target-burger').toggleClass('toggled');
		e.preventDefault();
	});//target-burger-click
});//doc-rdy