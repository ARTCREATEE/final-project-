// main.js — Xbox 360 Memory Site

function showPage(id) {
	document.querySelectorAll('.page').forEach(function(p) {
		p.classList.remove('visible');
	});

	var target = document.getElementById(id);
	if (target) target.classList.add('visible');

	window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('[data-page]').forEach(function(el) {
		el.addEventListener('click', function() {
			showPage(el.getAttribute('data-page'));
		});
	});
});



	
