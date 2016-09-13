const hyphenateRE = /([a-z\d])([A-Z])/g;

function hyphenate(str) {
    return str.replace(hyphenateRE, '$1-$2').toLowerCase();
}

function stringifyStyles(styles) {
	const styleProps = Object.keys(styles);
	const len = styleProps.length;
	let stylesGenerated = [];
	
	for (let i = 0; i < len; i++) {
		let key = styleProps[i];
		let val = styles[key];

		if (typeof val === 'number' && val !== 0) {
			val = val + 'px';
		}
		
		let currentStyle = hyphenate(key) + ': ' + val;
		stylesGenerated.push(currentStyle);
	}

	return stylesGenerated.join('; ')
}

export default stringifyStyles;

