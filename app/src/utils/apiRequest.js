import store from "@/store";
import axios from "axios";

const apiRequest = async (path, data, method) => {
	const config = {
		headers: {
			Authorization: store.getters.getToken,
		},
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const errorLog = (error) => {
		// eslint-disable-next-line
		console.debug("Request error", error.response, new Date().getTime());
		return error;
	};
	const request = `http://127.0.0.1:8080${path}`;
	if (!data && method != "get") {
		return await axios
			.get(request, config)
			.then((response) => response)
			.catch((error) => errorLog(error));
	} else if (method === "delete") {
		console.debug("DELETE");
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
