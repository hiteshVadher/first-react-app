import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Menu from './MenuComponents';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const DishWithId = ({match}) => {
            let val = window.location.href;
            val = val[val.length-1];
            return(
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(val, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(val, 10))}
                />
            );
        }


        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={<Home 
                        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
                    } />
                    <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" element={<DishWithId/>} />
                    <Route exact path="/aboutus" element={<About leaders={this.props.leaders}/>} />
                    <Route exact path="/contactus" element={<Contact/>} />
                    <Route path="*" element={<Navigate to = "/home" />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Main);
