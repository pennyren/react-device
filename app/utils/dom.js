function isDescendant(el, target) {
  	if (target !== null) {
    	return el === target || isDescendant(el, target.parentNode);
  	}
  	return false;
};

function index(el) {
	var arr = el.parentNode.children;
	var i = arr.length;
	while (i--) {
		if (arr[i] === el) return i;
	}
	return -1;
}

function closest(el, selector) {
	while (el) {
		if (el.matches(selector)) {
			return el;
		} else {
			el = el.parentElement;
		}
	}
	return null;
}

export {isDescendant, index, closest};