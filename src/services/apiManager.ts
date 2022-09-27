import axios from "axios";
import {REACT_APP_BASE_URL} from "../constants/environmentConstants";

type axiosMethodTypes = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";


export const axiosInstance = axios.create({
    baseURL: REACT_APP_BASE_URL,
    responseType: "json",
    headers: {
        "Content-type": "application/json",
        locale: "en",
    },
});

const apiManager = {
    request: async (url: string, body: unknown, method: axiosMethodTypes, baseURL = "") => {
        try {
            return axiosInstance({
                method: method,
                url: baseURL + url,
                data: body,
            });
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            } else {
                throw new Error("An Error Occurred");
            }
        }
    },
};

export default apiManager;
