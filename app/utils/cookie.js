const get = (key) => {
	const cookies = document.cookie ? document.cookie.split('; ') : [];
	let i = cookies.length;
	let cookieVal;
	while (i--) {
		const cookie = cookies[i];
		if (cookie.indexOf(key) !== -1) {
			cookieVal = decodeURIComponent(cookie.split('=')[1]);
			break;
		}
	}
	return cookieVal;
}

export default {get};
