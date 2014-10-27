faders = function(oldID, newID) {
	$(oldID).fadeOut(500, function() {
		$(newID).fadeIn(500);
	});
}

$(window).load(function() {
	chrome.storage.local.get(['SCHOLZLY_MAX', 'SCHOLZLY_MIN'], function(obj) {
		var soMax = (obj["SCHOLZLY_MAX"] === undefined) ? 4 : parseInt(obj["SCHOLZLY_MAX"]),
		soMin = (obj["SCHOLZLY_MIN"] === undefined) ? 1 : parseInt(obj["SCHOLZLY_MIN"]);
		
		$('#soMin').attr('placeholder', soMin);
		$('#soMax').attr('placeholder', soMax);
	});
	
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
	
	$('#btn-save').click(function() {
		var min = parseInt($('#soMin').val()),
			max = parseInt($('#soMax').val());
		
		if (Number.isNaN(min) || min <= 0)
			min = 1;
		if (Number.isNaN(max) || max <= 0)
			max = 4;
		if (max - min <= 0) {
			min = 1;
			max = 4;
		}
		
		chrome.storage.local.set({
			'SCHOLZLY_RUN_FLAG': "true",
			'SCHOLZLY_MAX': max.toString(),
			'SCHOLZLY_MIN': min.toString()
		});
	});
});