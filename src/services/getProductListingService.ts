import apiManager from "./apiManager";
import {iProduct} from "../interfaces/interfaces";


export const getProductListingService = async (): Promise<iProduct[]> => {
    try {
        const url = "/benirvingplt/products/products"
        const resp = await apiManager.request(url, {}, "GET")
        return resp.data.map( (product: iProduct) => {
            product.quantity = 0;
            return product;
        })
    } catch (e) {
        console.log(e)
        return [];
    }
}