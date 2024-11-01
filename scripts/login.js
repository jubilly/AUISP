import session from './session.js';
console.warn('Login..')

const handleLogin = event => {
	event.preventDefault();
	const formData = new FormData(event.target);
	
	const email = formData.get('email');
	const password = formData.get('password');
	const remember = rememberUser();

	if (!validateForm(email, password)) {
		return;
	}

	const id = Math.floor(Math.random() * 100);

	const user = {
		id,
		email,
		password,
		remember: remember
	};
	localStorage.setItem('login-user', JSON.stringify(user));
	window.location.href = '../routes/exams.html';
};

function rememberUser () {
	const checkbox = document.querySelector('#remember');
	return checkbox.checked;
}

function validateEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

function validatePassword(password) {
	return password.length > 0;
}

function validateForm(email, password) {
	return validateEmail(email) && validatePassword(password);
}

(function(){
	const loginForm = document.querySelector('[data-form="login"]');
	loginForm.addEventListener('submit', handleLogin);
	document.addEventListener('DOMContentLoaded', session);

})();



