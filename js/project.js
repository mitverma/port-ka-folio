$(document).ready(function(){
	console.log('js');
	$('body').css('color','red');
	particlesJS.load('particles-js', 'js/particles.json', function() {
		console.log('callback - particles.js config loaded');
	});
})
