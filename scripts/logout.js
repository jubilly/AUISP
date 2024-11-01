(function () {

	const handleLogout = () => {
		const user = localStorage.getItem('login-user');
		if (!user) {
			return;
		}
		localStorage.removeItem('login-user');
		window.location.href = '../index.html';
	};

	const logoutButton = document.querySelector('[data-action="logout"]');
	logoutButton.addEventListener('click', handleLogout);
})();