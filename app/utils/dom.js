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

export {isDescendant, index};