import React, { Fragment, useEffect, useState } from './node_modules/react'
import { Row, Container, Col, Button } from './node_modules/reactstrap';
import ReactHtmlParser from './node_modules/react-html-parser'; 
import { useRouter } from 'next/router';
import { observer } from './node_modules/mobx-react';
import { useMobxStores } from '../../stores/stores';
import { MainLayout } from '../../templates';
import { serverUrl } from '../../services/APIService';

const ProductDetails = props => {
  const router = useRouter();
    const { productStore } = useMobxStores();
    const { product, getProductDetails } = productStore;
    
  const [data, setData] = useState({
          id: '',
          price: '',
          packed: '',
          location: '',
          available: '',
          shop_name: '',
          main_image: '',
          first_image: '',
          product_name: '',
          first_delivery: '',
          second_delivery: '',
          third_delivery: '',
          within_distance: '',
          within_charge: '',
          beyond_charge: '',
          beyond_distance: '',
          description: ''
  }); 
    useEffect(() => {
        const id = router.query.id;
        getProductDetails(id);
    }, [])
    
  useEffect(() => {
    const rp = product && product.product_name;  
    if(rp) {
      setData(state => ({
        ...state, 
          id: product.id,
          price: product.price,
          packed: product.packed,
          location: product.location,
          available: product.available,
          shop_name: product.shop_name,
          main_image: product.main_image,
          first_image: product.first_image,
          product_name: product.product_name,
          first_delivery: product.first_delivery,
          second_delivery: product.second_delivery,
          third_delivery: product.third_delivery,
          within_distance: product.within_distance,
          within_charge: product.within_charge,
          beyond_charge: product.beyond_charge,
          beyond_distance: product.beyond_distance,
          description: product.description
      }));
    }    
  }, [product]); 
        console.log('data', data, product);
    return (
        <Fragment>

          <MainLayout>
            
        <Container fluid={true} className="mt-5">
            <Row>
             <Col md="5">
             <div className="carousel slide" data-ride="carousel" id="carousel-1">
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        <img className="img-thumbnail w-100 d-block" src={`${serverUrl}${data.main_image}`} alt="Slide Image" loading="lazy" />
                    </div>
                    {data.first_image ?  (
                       <div className="carousel-item">
                       <img className="img-thumbnail w-100 d-block"  src={`${serverUrl}${data.first_image}`} alt="Slide Image" />
                   </div>
                    )
                    :
                     null}
                   
                   
                </div>

                <div>
                  <a className="carousel-control-prev" href="#carousel-1" role="button" data-slide="prev"><span className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a>
                  <a className="carousel-control-next" href="#carousel-1" role="button" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                    <span className="sr-only">Next</span></a>
                </div>
                <ol className="carousel-indicators">
                    <li data-target="#carousel-1" data-slide-to="0" className="active"></li>
                    {data.first_image ?  <li data-target="#carousel-1" data-slide-to="1"></li> : null}
                    {/* <li data-target="#carousel-1" data-slide-to="2"></li> */}
                </ol>
            </div>
             </Col>
             <Col md="7">
               <h4>{ data.product_name }</h4>
               
            <div className="price"><span className="mr-2">
                <i className="fa fa-rupee text-success"></i>&nbsp;{ data.price }</span>
                {/* <span className="mr-2 cut">65,000</span>
                <span className="text-success">25% OFF</span> */}
            </div>
            <div className="d-flex flex-row">
                <div className="icons mr-2"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i><i className="fa fa-star-o"></i></div><span>1200 ratings &amp; 564 reviews</span>
            </div>
            <div className="d-flex align-items-center mt-5 delivery"><i className="fa fa-map-marker"></i>
            <span className="ml-2">Delivery options<br /></span>           
            </div>
            <hr />
            {data.first_delivery ?
            (
                <div className="d-flex align-items-center mt-4 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Buyer will pick up</span>   <span className="ml-2 mr-2">|<br /></span><span className="ml-2 mr-2 text-success">FREE<br /></span>
                </div>
            )
              : null
            }

            {data.second_delivery ?
            (
                <div className="d-flex align-items-center mt-4 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">I will deliver to buyer within {data.within_distance} Meters</span><span className="ml-1">for {data.within_charge}<br /></span>
                </div>
            )
              : null
            }

            
            {data.third_delivery ?
            (
                <div className="d-flex align-items-center mt-4 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">I will deliver to buyer beyond {data.beyond_distance} Meters</span><span className="ml-1">for {data.beyond_charge}<br /></span>
                </div>
            )
              : null
            }
          
            {/* <div className="d-flex align-items-center offers mb-1">
            <i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Bank Offers</span>
            <span className="ml-1">5% Unlimited Cashback on Axis Bank Credit Card<br /></span>
            </div>
            <div className="d-flex align-items-center offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Bank Offers</span><span className="ml-1">Extra 5% off* with Axis Bank Buzz Credit Card<br /></span></div>
            <div className="d-flex align-items-center offers"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Bank Offers</span><span className="ml-1">20% Instant Discount on pay with&nbsp;&nbsp;google wallet<br /></span></div> */}

            <div className="d-flex align-items-center mt-5 delivery"><i className="fa fa-map-marker"></i>
            <span className="ml-2">Description<br /></span> 
            </div>
            <hr />
            {ReactHtmlParser(data.description)}
            {/* <div className="d-flex align-items-center mt-2"> <label className="radio"> <input type="radio" name="ram" value="128GB" checked /> <span>128GB</span> </label>
             <label className="radio"> <input type="radio" name="ram" value="256GB" /> <span>256GB</span> </label>
              <label className="radio"> <input type="radio" name="ram" value="256GB" /> <span>512GB</span> </label>
               </div> */}

            <div><span className="font-weight-bold">Seller:</span>
            <span className="ml-2"> {data.shop_name} </span></div>
            <div className="mt-3">
                <Button className="btn btn-dark mr-2" type="button">BID NOW</Button>
                {/* <Button className="btn btn-success" type="button">BUY NOW</Button> */}
            </div>
             </Col>

            </Row>
        </Container>

          </MainLayout>

        </Fragment>
        
    )
}

export default observer(ProductDetails);
