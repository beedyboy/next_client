import { decorate, observable, action, computed, reaction } from "mobx"

import api from "../services/APIService";

class ShopStore {
  constructor() {  
    this.fetchShop();  
    reaction(() => this.shops, _ => console.log(this.shops.length))
  }
  
     error = false;
     filter = 'ALL';
     message = '';
     loading = false;
     sent = false;

     shops = [] 

     setFilter = (data) => {
     	this.filter = data;
     }

    fetchShop = () => {
    this.loading = true;
    api.get('shop').then( res => {  
          this.shops = res.data;
      this.loading = false;
        
    }); 
  }

   removeShop = (id) => { 
    api.delete('shop/' + id).then( res => {
      if(res.status === 200) {
        this.fetchShop();
        this.message = res.message;
      //  return <Toast opens={true} type="success" message={res.message} />;
        // Toast(true, 'success',  res.message );
      }
    })
  }
  get filteredShop() {
    switch (this.filter) {
      case 'ALL':
        return this.shops;
      case 'Active':
        return this.shops.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.shops.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.shops.filter(s => s.section === 'Deleted');

      default:
        return this.shops;
    }
  }
  get info() {
  	return {
      total: this.shops.length,
      status: this.shops.filter(cat => cat.status).length,
      // notstatus: this.shops.filter(cat => !cat.status).length,
    }
   
  }

} 
decorate(ShopStore, { 
  message: observable,
  error: observable,
  filter: observable,
  filteredShop: computed,
  info: computed,
  sent: observable,
  loading: observable,
  shops: observable, 
  fetchShop: action,
  removeShop: action,
  setFilter: action
})

 
export default ShopStore;
