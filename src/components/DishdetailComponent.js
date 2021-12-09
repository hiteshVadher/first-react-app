import React from 'react';
import { Card, CardImg, Breadcrumb, BreadcrumbItem, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    if(props.dish == null) {
        return(
            <div></div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;