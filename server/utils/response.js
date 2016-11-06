function resetResponse(success, result) {
	result = result || [];
	return {
		success: success,
		result: result
	}
}

export default resetResponse;