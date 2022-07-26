import React from "react";
import { Link } from 'react-router-dom';
import { Item, AdImage } from './styled';

export default (props) => {

    let price = '';
    let imagem = '';

    if(props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

     if(props.data.images) {
        imagem = `http://localhost:5000/media/${props.data.images[0].url}`
        
        console.log("imagem:",imagem);
       
    }
     
       

    return (
        <Item className="aditem">
          <Link to={`/ad/${props.data.id}`}>
            
            <div className="itemImage">
              <img src={imagem  ? imagem: props.data.image } alt="" />
            </div>
            <div className="itemName">
              {props.data.title}
            </div>
            <div className="itemPrice">{price}</div>
          </Link>
        </Item>
      );
}