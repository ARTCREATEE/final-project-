// main.js
// Page navigation
function showPage(id) {
	// Hide all pages
	document.querySelectorAll('.page').forEach(function(p) {
		p.classList.remove('visible');
	});

	// Remove active state from nav links
	document.querySelectorAll('.nav-link').forEach(function(l) {
		l.classList.remove('active');
	});

	// Show the target page
	var target = document.getElementById(id);
	if (target) target.classList.add('visible');

	// Set active nav link
	var activeLink = document.querySelector('.nav-link[data-page="' + id + '"]');
	if (activeLink) activeLink.classList.add('active');

	// Scroll to top
	window.scrollTo(0, 0);
}

// Attach click handlers to all nav items and CTAs
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('[data-page]').forEach(function(el) {
		el.addEventListener('click', function() {
			showPage(el.getAttribute('data-page'));
		});
	});
});
