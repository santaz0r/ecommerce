import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000/"
});

const httpService = {
    get: http.get,
    put: http.put,
    patch: http.patch,
    delete: http.delete,
    post: http.post
};
export default httpService;
