import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Card, CardImg, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap'; 
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NoactionStar } from '../../Rating/NoactionStar';
import ReactHtmlParser from 'react-html-parser';
import './card.css';
import './flip.css';
import { serverUrl } from '../../../services/APIService';
// import Link  from 'next/link'

const ListCard = props => {
    const { product }  = props;
    return (
        <Fragment>
            <Col sm="12" md="3">
                <Card>                     
               <CardBody>
                   <div className="flip-card">
                   <div className="flip-content">
                <div className="flip-front">
                <CardImg top width="100%" style={{height: '200px'}} src={`${serverUrl}${product.main_image}`}  alt={product.product_name} />
                    {/* <CardTitle>{product.product_name}</CardTitle>  */}
                    <p className="price">{product.price}</p>
                    <div className="rating"><NoactionStar total="4" /></div>
                     
                </div> 
                <div className="flip-back">  
                    <CardTitle>{product.product_name}</CardTitle>
                    <div className="card-text">
                      
                    <PerfectScrollbar>
                    <> 
                    {ReactHtmlParser(product.description)} 
                    </> 
                    </PerfectScrollbar>
                        
                    </div>  
                </div>
               </div>
                   </div>
                   <NavLink to={`product/${product.id}/details`}>{product.product_name} </NavLink>
               </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

ListCard.propTypes = {
product: PropTypes.any.isRequired
}

export default ListCard
