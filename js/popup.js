faders = function(oldID, newID) {
	$(oldID).fadeOut(500, function() {
		$(newID).fadeIn(500);
	});
}

$(window).load(function() {
	chrome.storage.local.get(['SCHOLZLY_RUN_FLAG', 'SCHOLZLY_MAX', 'SCHOLZLY_MIN'], function(obj) {
		var runScholzly = (obj["SCHOLZLY_RUN_FLAG"] === undefined) ? true : JSON.parse(obj["SCHOLZLY_RUN_FLAG"]),
		soMax = (obj["SCHOLZLY_MAX"] === undefined) ? 4 : parseInt(obj["SCHOLZLY_MAX"]),
		soMin = (obj["SCHOLZLY_MIN"] === undefined) ? 1 : parseInt(obj["SCHOLZLY_MIN"]);
		
		$('#runScholzly').attr('checked', runScholzly);
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
		$('#soMin').val('');
		$('#soMax').val('');
	});
	
	$('#btn-src').click(function() {
		window.open('https://github.com/stdako/scholzly');
	});
	
	$('#btn-save').click(function() {
		var min = parseInt($('#soMin').val()),
			max = parseInt($('#soMax').val()),
			run = $('#runScholzly').is(':checked');
		
		if (Number.isNaN(min) || min <= 0)
			min = $('#soMin').attr('placeholder');
		if (Number.isNaN(max) || max <= 0)
			max = $('#soMax').attr('placeholder');
		if (max - min <= 0) {
			min = $('#soMin').attr('placeholder');
			max = $('#soMax').attr('placeholder');
		}
				
		chrome.storage.local.set({
			'SCHOLZLY_RUN_FLAG': run.toString(),
			'SCHOLZLY_MAX': max.toString(),
			'SCHOLZLY_MIN': min.toString()
		}, function() {
			$('#soMin').attr('placeholder', min.toString());
			$('#soMax').attr('placeholder', max.toString());
		});
	});
});