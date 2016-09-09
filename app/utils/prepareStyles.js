const hyphenateRE = /([a-z\d])([A-Z])/g;

function hyphenate(str) {
    return str.replace(hyphenateRE, '$1-$2').toLowerCase();
}

function prepareStyles(styles) {
	const styleProps = Object.keys(styles);
	const len = styleProps.length;
	let stylesGenerated = [];
	for (let i = 0; i < len; i++) {
		let key = styleProps[i];
		let style = hyphenate(key) + ': ' + styles[key];
		stylesGenerated.push(style);
	}
	return stylesGenerated.join(';')
}

export default prepareStyles;

