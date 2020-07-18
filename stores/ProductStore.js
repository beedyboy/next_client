import {  observable, action, computed } from "mobx" 
import api from "../services/APIService";
import CookieService from "../services/CookieService";
import { Beedy } from "../services/Beedy";


class ProductStore {
  constructor() {  
    this.fetchProduct(); 
  }
  
    @observable error = false;
    @observable filter = 'ALL';
    @observable message = '';
    @observable loading = false;
    @observable saved = false; 
    @observable sending = false; 
    @observable products = [];
    @observable product = [];
    @observable homeProducts = []; 

    @action  setFilter = (data) => {
     	this.filter = data;
     }
    
     @action refreshForm = () => {
      this.saved = false; 
     }
    @action fetchProduct = () => { 
    this.loading = true; 
    api.get('product/all').then( res => {  
          this.homeProducts = res.data;
      this.loading = false;
        
    }); 
  }

   
 @action saveProduct = (formData) => { 
    try {
      this.sending = true;
      api.post('product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.sending = false;
        if(res.data.status === 500) {
          CookieService.logout();
        }
       else  if(res.data.status === 200) {
        this.saved = true;
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

 @action myProducts = () => {  
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

 @action  removeProduct = (id) => { 
    api.delete('product/' + id).then( res => {
      if(res.status === 200) {
        this.fetchProduct();
        Beedy('success', res.data.message);
      }
    })
  }
 @action getProductById = (id) => {
  console.log(id)
    api.get('product/' + id).then( res => {
      if(res.data.status === 200) { 
        this.product = res.data.data[0];
      }
    })
  }
  

  @computed get filteredProduct() {
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

  @computed get info() {
  	return {
      total: this.products.length,
      status: this.products.filter(cat => cat.status).length
    }
   
  }

}  
 
// export default createContext(new ProductStore())
export default ProductStore;
