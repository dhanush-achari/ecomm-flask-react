import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillBagFill } from "react-icons/bs";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const Li = styled.li`
  margin-right: 10px;
`;

const A = styled.a`
  text-decoration: none;
  color: #000;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    color: #0000ff;
  }
`;

const NavButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0000ff;
  }
`;

const CartIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: #000;
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff0000;
  color: #fff;
  padding: 2px;
  border-radius: 50%;
  font-size: 12px;
`;

const Navbar = ({ cartCount }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav class="navbar navbar-expand-lg bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#">Hidden brand</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Products</a>
        </li>
      </ul>
      <form class="d-flex mx-auto" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Change password</a>
        </li>
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#"><BsFillBagFill className="md"/></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default Navbar;