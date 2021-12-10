import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Menu from './MenuComponents';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Route, Routes, Navigate } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {
        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                />
            );
        }


        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={<Home 
                        dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.state.leaders.filter((leader) => leader.featured)[0]}/>
                    } />
                    <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} />
                    <Route path="/menu/:dishId" element={<DishWithId/>} />
                    <Route exact path="/aboutus" element={<About leaders={this.state.leaders}/>} />
                    <Route exact path="/contactus" element={<Contact/>} />
                    <Route path="*" element={<Navigate to = "/home" />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;
