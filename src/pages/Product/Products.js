import React, { Component } from 'react';
import {Stitch, RemoteMongoClient} from 'mongodb-stitch-browser-sdk'
import Products from '../../components/Products/Products';
import BSON from 'bson'

class ProductsPage extends Component {
  state = { isLoading: true, products: [] };
  componentDidMount() {
    this.fetchData();
  }

  productDeleteHandler = productId => {
    const mongodb = Stitch.defaultAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );

    mongodb
      .db("shop")
      .collection("products").deleteOne({_id : new BSON.ObjectId(productId)})
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          "Deleting the product failed. Please try again later"
        );
        console.log(err);
      });
          
      // axios
    //   .delete("http://localhost:3100/products/" + productId)
    //   .then(result => {
    //     console.log(result);
    //     this.fetchData();
    //   })
    //   .catch(err => {
    //     this.props.onError(
    //       "Deleting the product failed. Please try again later"
    //     );
    //     console.log(err);
    //   });
  };

  fetchData = () => {
    const mongodb = Stitch.defaultAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );

    mongodb
      .db("shop")
      .collection("products")
      .find() 
      .asArray()
      .then(products => {
        console.log('!!!!!!~~~~~~~', products);
        const transformedProducts = products.map(product => {
          product._id = product._id.toString();
          product.price = product.price.toString();
        });
        this.setState({isLoading : false, products: products });
      })
      .catch(err => {
        this.setState({isLoading : false });
        this.props.onError(
          "Fetching the product failed. Please try again later"
        );
      });

    // axios
    //   .get('http://localhost:3100/products')
    //   .then(productsResponse => {
    //     this.setState({ isLoading: false, products: productsResponse.data });
    //   })
    //   .catch(err => {
    //     this.setState({ isLoading: false, products: [] });
    //     this.props.onError('Loading products failed. Please try again later');
    //     console.log(err);
    //   });
  };

  render() {
    let content = <p>Loading products...</p>;

    if (!this.state.isLoading && this.state.products.length > 0) {
      content = (
        <Products
          products={this.state.products}
          onDeleteProduct={this.productDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.products.length === 0) {
      content = <p>Found no products. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default ProductsPage;
