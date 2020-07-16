import { decorate, observable, action, computed } from "mobx"
import api from "../services/APIService";

class CategoryStore {
  constructor() {  
    this.fetchCategory();  
   
  }
  
     error = false;
     filter = 'Active';
     message = '';
     loading = false; 

     categoryList = [] 
 
    fetchCategory = () => {
    this.loading = true;
    api.get('category').then( res => {  
          this.categoryList = res.data;
      this.loading = false;
        
    }); 
  }

  get categories() {
    var data = []
    this.categoryList.map(cat => {
      const d = {
        id: cat.id,
        name: cat.name
      }      
      data.push(d); 
    });   
     return data; 
    }

  get tagCategories() {
    let data = [];
    this.categoryList.map(cat => {
      const d = {
        value: cat.name,
        label: cat.name
      }
      data.push(d);
    }); 
    return data;
  }
  

} 
decorate(CategoryStore, { 
  message: observable,
  error: observable,
  filter: observable,  
  loading: observable,
  categoryList: observable, 
  fetchCategory: action,
  tagCategories: computed,
  categories: computed
})

 
export default CategoryStore;
