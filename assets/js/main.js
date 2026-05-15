// main.js — Xbox 360 Memory Site

// ── Pages to track for avatar progression ──
// Each page visited unlocks the next avatar layer
var PAGES_TO_TRACK = ['landing', 'about', 'games', 'hw-console', 'hw-controller', 'hw-kinect'];
var visitedPages = new Set();

// ── Show a page ──
function showPage(id) {
	document.querySelectorAll('.page').forEach(function(p) {
		p.classList.remove('visible');
	});

	var target = document.getElementById(id);
	if (target) target.classList.add('visible');

	window.scrollTo(0, 0);

	// Track visit and update avatar
	if (PAGES_TO_TRACK.indexOf(id) !== -1) {
		visitedPages.add(id);
		updateAvatar();
	}
}

// ── Avatar cursor ──
function buildAvatarSVG(level) {
	// level 0 = bare outline, 1 = shirt, 2 = shoes, 3 = hat, 4 = jacket, 5 = full/accessories

	var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="64" viewBox="0 0 48 64">';

	// Shadow
	svg += '<ellipse cx="24" cy="61" rx="10" ry="3" fill="rgba(0,0,0,0.10)"/>';

	// ── Shoes (level 2+) ──
	if (level >= 2) {
		// left shoe
		svg += '<ellipse cx="16" cy="57" rx="7" ry="4" fill="#107c10"/>';
		svg += '<rect x="9" y="53" width="14" height="5" rx="2" fill="#107c10"/>';
		// right shoe
		svg += '<ellipse cx="32" cy="57" rx="7" ry="4" fill="#107c10"/>';
		svg += '<rect x="25" y="53" width="14" height="5" rx="2" fill="#107c10"/>';
	} else {
		// bare feet
		svg += '<ellipse cx="16" cy="57" rx="6" ry="3.5" fill="#e8c99a"/>';
		svg += '<ellipse cx="32" cy="57" rx="6" ry="3.5" fill="#e8c99a"/>';
	}

	// ── Legs ──
	svg += '<rect x="13" y="42" width="9" height="16" rx="3" fill="' + (level >= 4 ? '#1a1a2e' : '#c8b89a') + '"/>';
	svg += '<rect x="26" y="42" width="9" height="16" rx="3" fill="' + (level >= 4 ? '#1a1a2e' : '#c8b89a') + '"/>';

	// ── Jacket body (level 4+) ──
	if (level >= 4) {
		svg += '<rect x="8" y="24" width="32" height="22" rx="4" fill="#1a3a5c"/>';
		// jacket collar
		svg += '<polygon points="24,24 18,30 24,28 30,30" fill="#eef4e8"/>';
		// jacket zipper line
		svg += '<line x1="24" y1="28" x2="24" y2="46" stroke="#eef4e8" stroke-width="1" opacity="0.5"/>';
		// jacket sleeves
		svg += '<rect x="2" y="25" width="9" height="14" rx="3" fill="#1a3a5c"/>';
		svg += '<rect x="37" y="25" width="9" height="14" rx="3" fill="#1a3a5c"/>';
	} else if (level >= 1) {
		// ── Shirt (level 1+) ──
		svg += '<rect x="10" y="24" width="28" height="22" rx="4" fill="#d4e4c4"/>';
		// shirt collar
		svg += '<path d="M18 24 Q24 30 30 24" fill="none" stroke="#b0c8a0" stroke-width="1.5"/>';
		// shirt sleeves
		svg += '<rect x="3" y="25" width="9" height="12" rx="3" fill="#d4e4c4"/>';
		svg += '<rect x="36" y="25" width="9" height="12" rx="3" fill="#d4e4c4"/>';
	} else {
		// bare torso
		svg += '<rect x="10" y="24" width="28" height="22" rx="4" fill="#e8c99a"/>';
		svg += '<rect x="3" y="25" width="9" height="12" rx="3" fill="#e8c99a"/>';
		svg += '<rect x="36" y="25" width="9" height="12" rx="3" fill="#e8c99a"/>';
	}

	// ── Hands ──
	svg += '<circle cx="5" cy="38" r="4" fill="#e8c99a"/>';
	svg += '<circle cx="43" cy="38" r="4" fill="#e8c99a"/>';

	// ── Neck ──
	svg += '<rect x="20" y="18" width="8" height="8" rx="2" fill="#e8c99a"/>';

	// ── Head ──
	svg += '<ellipse cx="24" cy="14" rx="13" ry="14" fill="#e8c99a"/>';

	// ── Hat (level 3+) ──
	if (level >= 3) {
		// cap brim
		svg += '<ellipse cx="24" cy="4" rx="15" ry="4" fill="#107c10"/>';
		// cap top
		svg += '<ellipse cx="24" cy="2" rx="12" ry="6" fill="#107c10"/>';
		// X logo on cap
		svg += '<text x="24" y="5" font-family="Anton,sans-serif" font-size="5" fill="#eef4e8" text-anchor="middle">X</text>';
	}

	// ── Accessories: headphones + controller (level 5) ──
	if (level >= 5) {
		// headphone band
		svg += '<path d="M11 14 Q24 2 37 14" fill="none" stroke="#0d0d0d" stroke-width="2.5" stroke-linecap="round"/>';
		// headphone pads
		svg += '<circle cx="11" cy="15" r="4" fill="#0d0d0d"/>';
		svg += '<circle cx="37" cy="15" r="4" fill="#0d0d0d"/>';
		// mini controller in hand
		svg += '<ellipse cx="43" cy="38" rx="5" ry="4" fill="#555"/>';
		svg += '<circle cx="43" cy="37" r="1.5" fill="#107c10"/>';
	}

	// ── Face ──
	// Eyes
	svg += '<circle cx="19" cy="13" r="2.5" fill="#fff"/>';
	svg += '<circle cx="29" cy="13" r="2.5" fill="#fff"/>';
	svg += '<circle cx="19.5" cy="13.5" r="1.2" fill="#3a2a1a"/>';
	svg += '<circle cx="29.5" cy="13.5" r="1.2" fill="#3a2a1a"/>';
	// Smile
	svg += '<path d="M19 19 Q24 23 29 19" fill="none" stroke="#c8a070" stroke-width="1.5" stroke-linecap="round"/>';

	svg += '</svg>';
	return svg;
}

function updateAvatar() {
	var level = 0;
	if (visitedPages.has('landing'))     level = Math.max(level, 0);
	if (visitedPages.has('about'))       level = Math.max(level, 1);
	if (visitedPages.has('games'))       level = Math.max(level, 2);
	if (visitedPages.has('hw-console'))  level = Math.max(level, 3);
	if (visitedPages.has('hw-controller')) level = Math.max(level, 4);
	if (visitedPages.has('hw-kinect'))   level = Math.max(level, 5);

	var cursor = document.getElementById('avatar-cursor');
	if (cursor) {
		cursor.innerHTML = buildAvatarSVG(level);
	}

	updateProgressDots();
	// All 6 pages visited — show the final screen
	if (visitedPages.size >= 6) {
		showLetsPlay();
	}
}

function showLetsPlay() {
	fillLetsPlayAvatar();
	var overlay = document.getElementById('letsplay-overlay');
	if (overlay && !overlay.classList.contains('visible')) {
		overlay.classList.add('visible');
	}
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function() {

	// Attach page navigation to all [data-page] elements
	document.querySelectorAll('[data-page]').forEach(function(el) {
		el.addEventListener('click', function() {
			showPage(el.getAttribute('data-page'));
		});
	});

	// Mark landing as visited on load
	visitedPages.add('landing');
	updateAvatar();

	// ── Custom cursor follow ──
	var cursor = document.getElementById('avatar-cursor');
	var mouseX = 0, mouseY = 0;
	var curX = 0, curY = 0;

	document.addEventListener('mousemove', function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	function animateCursor() {
		// Smooth lerp follow
		curX += (mouseX - curX) * 0.18;
		curY += (mouseY - curY) * 0.18;
		if (cursor) {
			cursor.style.left = (curX + 12) + 'px';
			cursor.style.top  = (curY + 8)  + 'px';
		}
		requestAnimationFrame(animateCursor);
	}
	animateCursor();

	// Hide cursor when it leaves the window
	document.addEventListener('mouseleave', function() {
		if (cursor) cursor.style.opacity = '0';
	});
	document.addEventListener('mouseenter', function() {
		if (cursor) cursor.style.opacity = '1';
	});

	// Close Let's Play overlay on click outside the button
	var overlay = document.getElementById('letsplay-overlay');
	if (overlay) {
		overlay.addEventListener('click', function(e) {
			if (e.target === overlay) {
				overlay.classList.remove('visible');
			}
		});
	}
});

// Fill the big avatar in the Let's Play overlay
function fillLetsPlayAvatar() {
	var el = document.getElementById('letsplay-avatar-display');
	if (el) {
		// Build a larger version of the full avatar
		var svg = buildAvatarSVG(5).replace('width="48" height="64"', 'width="96" height="128"');
		el.innerHTML = svg;
	}
}

// Update progress dots
function updateProgressDots() {
	document.querySelectorAll('.progress-dot').forEach(function(dot) {
		var track = dot.getAttribute('data-track');
		if (visitedPages.has(track)) {
			dot.classList.add('filled');
		}
	});
}
