import axios, { type AxiosRequestConfig } from "axios";
import { useSessionStore } from "../stores/session";

const apiRequest = async (path: string, data?: object | null, method: string) => {
	const config: AxiosRequestConfig<object> = {
		headers: {
			Authorization: useSessionStore().getToken,
		},
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const errorLog = (error: any) => {
		// eslint-disable-next-line
		console.debug("Request error", error.response, new Date().getTime());
		return error;
	};
	const request = `http://127.0.0.1:8080${path}`;
	if (!data) {
		return await axios
			.get(request, config)
			.then((response) => response)
			.catch((error) => errorLog(error));
	} else if (method === "delete") {
		return await axios
			.delete(request, config)
			.then((response) => response)
			.catch((error) => errorLog(error));
	} else if (data) {
		return await axios
			.post(request, data ?? {}, config)
			.then((response) => response)
			.catch((error) => errorLog(error));
	}
};

export default apiRequest;
