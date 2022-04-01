import httpService from "./http.service";

const productsEndPoint = "products/";

const productsService = {
    get: async () => {
        const { data } = await httpService.get(productsEndPoint);
        return data;
    },
    getById: async (id) => {
        const { data } = await httpService.get(productsEndPoint + `${id}/`);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productsEndPoint + payload.id,
            payload
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            productsEndPoint + payload.id,
            payload
        );
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(productsEndPoint + id);
        return data;
    }
};

export default productsService;
