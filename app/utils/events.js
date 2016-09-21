function on(el, type, cb, useCapture) {
	el.addEventListener(type, cb, useCapture);
}

function off(el, type, cb) {
	el.removeEventListener(type, cb);
}

export {on, off};