import axios from "axios";

const apiRequest = async (path: string, type?: string) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const request = `${process.env.APP_ROOT_API}${path}`;
	const errorLog = (error: any) => {
		// eslint-disable-next-line
		console.debug("Request error", error.response, new Date().getTime());
		return error;
	};

	if (!type || type === "get") {
		return await axios
			.get(request)
			.then((response) => response)
			.catch((error) => errorLog(error));
	}

	if (type === "post") {
		return await axios
			.post(request)
			.then((response) => response)
			.catch((error) => errorLog(error));
	}
};

export default apiRequest;
