export default function session () {

	//Note: trecho comentado. pois o live server está com problemas para manter a sessão
	// const user = localStorage.getItem('login-user');
	// if (!user) {
	// 	console.warn('Sessão inválida');
	// 	window.location.href = '/';
	// 	return;
	// }

	const today = new Date();
	const twoDays = 1 * 24 * 60 * 60 * 1000;

	const dateToExpire = new Date(today.getTime() + twoDays);
	const dateToExpireString = dateToExpire.toISOString();
	if (dateToExpireString > today) {
		localStorage.removeItem('login-user');
		console.warn('Sessão inválida');
		window.location.href = '/';
		return;
	}

	console.warn('Sessão válida');
	if (window.location.pathname === '/index.html') {
		window.location.href = '../routes/exams.html';
	}
}