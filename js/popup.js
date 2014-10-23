faders = function(oldID, newID) {
	$(oldID).fadeOut(500, function() {
		$(newID).fadeIn(500);
	});
}

$(window).load(function() {
	$("#btn-opts").click(function() {
		faders('#home', '#options');
	});
	
	$("#btn-faq").click(function() {
		faders('#home', '#faq');
	});
	
	$('#btn-faqhome').click(function() {
		faders('#faq', '#home');
	});
	
	$('#btn-optshome').click(function() {
		faders('#options', '#home');
	});
	
	$('#btn-src').click(function() {
		$(location).attr('href', 'https://github.com/stdako/scholzly');
	});
});