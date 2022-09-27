import React, {useEffect, useMemo, useState} from 'react';
import {getProductListingService} from "../../services/getProductListingService";
import {iProduct} from "../../interfaces/interfaces";
import {Button, Card, Form} from "react-bootstrap";
import "./productListing.css"

const COLOR_FILTERS = ["All", "Black", "Red", "Stone"]

export const ProductListing = () => {

    const [productList, setProductList] = useState<iProduct[]>([]);
    const [filteredList, setFilteredList] = useState<iProduct[]>([]);
    const [colorFilter, setColorFilter] = useState(COLOR_FILTERS[0]);

    const getProducts = async () => {
        const products = await getProductListingService();
        setProductList(products);
    }

    const incrementProduct = (id: number) => {
        const index = productList.findIndex(product => product.id === id);
        const products = [...productList];
        products[index].quantity++;
        setProductList(products);
    }

    const decrementProduct = (id: number) => {
        const index = productList.findIndex(product => product.id === id);
        if (productList[index].quantity !== 0) {
            const products = [...productList];
            products[index].quantity--;
            setProductList(products);
        }

    }

    const totalBill = useMemo( ()=> {
        let total = 0;
        filteredList.forEach((product) => {
            if(product.quantity > 0) {
                total += product.quantity * product.price
            }
        })
        return total.toFixed(2)
    }, [filteredList])

    useEffect( ()=> {
        productList.length && colorFilter !== COLOR_FILTERS[0] ?
            setFilteredList(productList.filter( (product: iProduct) => product.colour === colorFilter ))
            : setFilteredList([...productList])
    }, [productList, colorFilter])

    useEffect( () => {
        getProducts()
    }, [])

    return <div className="d-flex">
        <div className="m-2 p-2 w-75">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="color-filter">Filter by Color</label>
                </div>
                <Form.Select id="color-filter" defaultValue={COLOR_FILTERS[0]} onChange={(e) => setColorFilter(e.target.value)}>
                    {COLOR_FILTERS.map( (color, index) =>
                        <option key={color+index} value={color}>{color}</option>
                    )}
                </Form.Select>
            </div>
            { filteredList.length !== 0 && filteredList.map((product) => (
                <Card key={product.id}>
                    <Card.Body className="d-flex justify-content-between">
                        <div className="product-image-holder w-25">
                            <img src={product.img} alt="product image" />
                        </div>
                        <div className="product-details text-left w-50 p-2" >
                           <p>Name: {product.name}</p>
                            <p>Price: {product.price}$</p>
                        </div>
                        <div className="product-quantity-controls w-25">
                            <Button variant="danger" onClick={() =>decrementProduct(product.id)}>-</Button>
                            <span className="quantity-label">{product.quantity}</span>
                            <Button variant="primary" onClick={() =>incrementProduct(product.id)}>+</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
        <div className="w-25 m-2">
            <h3> Total Amount</h3>
            {totalBill}$
        </div>
    </div>
}