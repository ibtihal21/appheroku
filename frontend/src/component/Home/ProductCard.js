import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from "@material-ui/lab";



//import ker liya idhar home.js wale product ko
const ProductCard = ({product}) => {

  //niche ka options idhar bna diya
const options={
  value: product.ratings,
    readOnly: true,
    precision: 0.5,
};

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      {/* in img .url se ? haata dea hai (ye hone pe bina photo ka bhi product aa jata ) */}
        <img src={product.images[0].url} alt={product.name}/> 
        <p>{product.name}</p>
        <div>
          <Rating {...options} />{" "}
           <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
           </span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;