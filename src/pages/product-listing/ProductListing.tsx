import React from 'react';

import {Button, Card, Form} from "react-bootstrap";
import "./productListing.css"

export const ProductListing = () => {

    return <div className="d-flex">
        <div className="m-2 p-2 w-75">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="color-filter">Filter by Color</label>
                </div>
                <Form.Select id="color-filter">
                    <option value="All">All</option>
                    <option value="Black">Black</option>
                    <option value="All">Red</option>
                    <option value="Stone">Stone</option>
                </Form.Select>
            </div>
                <Card >
                    <Card.Body className="d-flex justify-content-between">
                        <div className="product-image-holder w-25">
                            <img src="" alt="product image" />
                        </div>
                        <div className="product-details text-left w-50 p-2" >
                           <p>Name: Black Dress</p>
                            <p>Price: 50$</p>
                        </div>
                        <div className="product-quantity-controls w-25">
                            <Button variant="danger" >-</Button>
                            <span className="quantity-label">1</span>
                            <Button variant="primary">+</Button>
                        </div>
                    </Card.Body>
                </Card>
        </div>
        <div className="w-25 m-2">
            <h3> Total Amount</h3>
            0$
        </div>
    </div>
}