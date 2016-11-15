const getPropsFromInputs = (container) => {
	let props = {};
	const forms = container.querySelectorAll('input, textarea');
	for (const el of forms) {
		const type = el.getAttribute('type');
		const key = el.getAttribute('name');
		const val = el.value.trim();
		if (type == 'checkbox') {
			const isChecked = el.checked;
			if (isChecked) {
				if (props[key]) {
					props[key].push(val)
				} else {
					props[key] = [];
					props[key].push(val)
				}
			}
		} else if (type == 'radio') {
			const isChecked = el.checked;
			if (isChecked) {
				props[key] = val;
			}
		} else {
			val && (props[key] = val);
		}
	}
	return props;
}

export default getPropsFromInputs;