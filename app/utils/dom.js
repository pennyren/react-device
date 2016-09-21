function isDescendant(el, target) {
  	if (target !== null) {
    	return el === target || isDescendant(el, target.parentNode);
  	}
  	return false;
};

export {isDescendant};