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
   return  Object.keys(this.categoryList || {}).map(key => ({...this.categoryList[key], uid: key}));
 
    }

  get tagCategories() {
    let data = [];
     return  Object.keys(this.categoryList || {})
     .map(key => (
                  {
                    value: this.categoryList[key].name,
                    label: this.categoryList[key].name}
                  ));
 
     
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
