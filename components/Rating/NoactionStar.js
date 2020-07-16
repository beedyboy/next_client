import React from 'react';
import './rating.css';
import { FaStar } from 'react-icons/fa';
export const NoactionStar = ({total}) => { 
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                let ratingValue= i + 1 
                return (  
                    <FaStar
                    className="star"
                    key={i}
                    color={ratingValue <= total  ? '#ffc107' : '#e4e5e9'}
                     size={10} 
                     />  
                )
            })}
            
        </div>
    )
}
