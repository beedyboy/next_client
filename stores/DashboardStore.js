import { decorate, observable, action, computed, reaction } from "mobx"

import api from "../services/APIService"; 

class ServiceStore {
  
  
     type = 'success'; 
     message = '';
     open = false; 
 

     fireMe = (open, type, message) => {
       this.open = open;
       this.type = type;
       this.message = message;
     }
 
   

} 
decorate(ServiceStore, { 
  message: observable,
  open: observable,
  type: observable, 
  fireMe: action
})

 
export default ServiceStore;