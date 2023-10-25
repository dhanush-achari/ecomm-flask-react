import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProductsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 0;
`;

const ProductListItem = styled.li`
  width: 25%;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;
const AddToCartButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
const ProductPrice = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  font-style: italic;
`;
const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://127.0.0.1:5000/products");
      const productsJson = await response.json();
      setProducts(productsJson);
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    // Add the product to the cart
  };
  return (
    <ProductsList>
      {products.map((product) => (
        <ProductListItem key={product.id}>
          <ProductImage src={product.product_img} />
          <ProductName>{product.product_name}</ProductName>
          <ProductDescription>{product.product_description}</ProductDescription>
          <ProductPrice>Rs.{product.product_price}</ProductPrice>
          <AddToCartButton onClick={() => handleAddToCart(product)}>Add to Cart</AddToCartButton>
        </ProductListItem>
      ))}
    </ProductsList>
  );
};

export default ProductsContainer;