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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        const DishWithId = ({match}) => {
            let val = window.location.href;
            val = val[val.length-1];
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(val, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(val, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        }


        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition classNames="page" timeout={300}>
                        <Routes lacation={this.props.location}>
                            <Route path="/home" element={<Home 
                                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                                dishesLoading={this.props.dishes.isLoading}
                                dishesErrMess={this.props.dishes.errMess}
                                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                                promosLoading={this.props.promotions.isLoading}
                                promosErrMess={this.props.promotions.errMess}
                                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                                leadersLoading={this.props.leaders.isLoading}
                                leadersErrMess={this.props.leaders.errMess}
                                />
                            } />
                            <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
                            <Route path="/menu/:dishId" element={<DishWithId/>} />
                            <Route exact path="/aboutus" element={<About leaders={this.props.leaders.leaders}/>} />
                            <Route exact path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                            <Route path="*" element={<Navigate to = "/home" />} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
