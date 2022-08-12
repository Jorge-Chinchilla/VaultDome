import axios from "axios";

const apiRequest = async (path: string, data?: object | null) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const errorLog = (error: any) => {
		// eslint-disable-next-line
		console.debug("Request error", error.response, new Date().getTime());
		return error;
	};
	const request = `http://127.0.0.1:8080${path}`;
	if (!data) {
		return await axios
			.get(request)
			.then((response) => response)
			.catch((error) => errorLog(error));
	} else {
		return await axios
			.post(request, data ?? {})
			.then((response) => response)
			.catch((error) => errorLog(error));
	}
};

export default apiRequest;
