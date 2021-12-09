import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { Media } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    renderDish(dish) {
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments) {
        if(comments == null) {
            return(
                <div></div>
            );
        } else {

            const comment = comments.map((eachComment) => {
                return (
                    <div key={eachComment.id} className="mb-3">
                        <li className="unstyled-list">{eachComment.comment}</li>
                        <span>-- {eachComment.author}, </span> 
                        <span>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(eachComment.date)))}</span>
                    </div>
                );
            });

            return(
                <div>
                    <h4>Comments</h4>
                    {comment}
                </div>
            );
        }
    }

    render() {
        const selectedDish = this.props.dish;
        if(selectedDish == null) {
            return(
                <div></div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(selectedDish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(selectedDish.comments)}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default DishDetail;