const getPropsFromInputs = (container) => {
	let props = {};
	const els = container.querySelectorAll('input');
	for (let i = 0; i < els.length; i++) {
		const currentElement = els[i];
		const key = currentElement.getAttribute('name');
		const val = currentElement.value;
		val && (props[key] = val);
	}
	return props;
}

export default getPropsFromInputs;