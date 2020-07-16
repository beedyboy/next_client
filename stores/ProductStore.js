import { decorate, observable, action, computed } from "mobx" 
import api from "../services/APIService";
import CookieService from "../services/CookieService";
import { Beedy } from "../services/Beedy";


class ProductStore {
  constructor() {  
    this.fetchProduct(); 
  }
  
     error = false;
     filter = 'ALL';
     message = '';
     loading = false;
     sent = false; 
     products = [];
     product = [];
     homeProducts = []; 

     setFilter = (data) => {
     	this.filter = data;
     }

    fetchProduct = () => { 
    this.loading = true; 
    api.get('product/all').then( res => {  
          this.homeProducts = res.data;
      this.loading = false;
        
    }); 
  }

   
  saveProduct = (formData) => { 
    try {  
      api.post('product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if(res.data.status === 500) {
          CookieService.logout();
        }
       else  if(res.data.status === 200) {
        this.fetchProduct();
        Beedy('success', res.data.message);
       }
       
      }).catch(error => console.log(error))
    } catch(err) {
      if(err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg)
      }
    }
  }

  myProducts = () => {  
    this.loading = true;
    api.get('product/myproduct').then( res => {   
      this.loading = false;
      if(res.data.status === 500) {
        CookieService.logout();
      }
     else if(res.data.status === 200) {
       this.products = res.data.data; 
      }
        
    }); 
  }

   removeProduct = (id) => { 
    api.delete('product/' + id).then( res => {
      if(res.status === 200) {
        this.fetchProduct();
        this.message = res.message; 
      }
    })
  }
  getProductDetails = (id) => {
    api.get('product/' + id).then( res => {
      if(res.data.status === 200) { 
        this.product = res.data.data[0];
      }
    })
  }
  

  get filteredProduct() {
    switch (this.filter) {
      case 'ALL':
        return this.products;
      case 'Active':
        return this.products.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.products.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.products.filter(s => s.section === 'Deleted');

      default:
        return this.products;
    }
  }

  get info() {
  	return {
      total: this.products.length,
      status: this.products.filter(cat => cat.status).length
    }
   
  }

} 
decorate(ProductStore, { 
  message: observable,
  error: observable,
  filter: observable,
  product: observable, 
  sent: observable,
  loading: observable,
  products: observable,
  homeProducts: observable,
  filteredProduct: computed,
  info: computed, 
  fetchProduct: action,
  getProductDetails: action,
  addProduct: action,
  myProducts: action, 
  removeProduct: action,
  setFilter: action
})

 
// export default createContext(new ProductStore())
export default ProductStore;
