(function() {

	const body = document.querySelector('body');
	const hamburger = document.querySelector('#menu-hamburger__click');
	const header = document.querySelector('.header');

	const overlay = document.createElement('div');
	overlay.classList.add('overlay');
	body.appendChild(overlay);
	
	hamburger.addEventListener('click', () => {
		header.style.left = '0';
		overlay.style.visibility = 'visible';
		overlay.style.opacity = '0.5';
	});

	overlay.addEventListener('click', () => {
		header.style.left = '-100%';
		overlay.style.visibility = 'hidden';
		overlay.style.opacity = '0';
	});

})();