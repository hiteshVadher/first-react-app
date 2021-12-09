import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { Router, Route, Routes, Navigate } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={<Home/>} />
                    <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} />
                    <Route path="*" element={<Navigate to = "/home" />} />
                </Routes>
            </div>
        );
    }
}

export default Main;
