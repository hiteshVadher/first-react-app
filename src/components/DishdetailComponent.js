import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
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

function RenderComments({comments}) {
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


const DishDetail = (props) => {
    const selectedDish = props.dish;
    if(selectedDish == null) {
        return(
            <div></div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={selectedDish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={selectedDish.comments} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;