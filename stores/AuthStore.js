import { decorate, observable, action} from "mobx"  
import api from "../services/APIService"; 


class AuthStore {
  // constructor() {
  //   this.fetchAuths();
  //   this.getProfile()
  //   reaction(() => this.users, _ => console.log(this.users.length))
  // }
    id = null;
    token = null;
    preferred = null; 
    isAuth = false;
    registered = false;
     error = null;
     loading = false;
     emailExist = false; 
     profiles = [];

   
  
  confirmEmail = (data) => {
    api.get('auth/' + data + '/exist').then( res => { 
      this.emailExist = res.data.exist;
    })
  }
   
  extendToBuyer = () => {
    this.loading = true;
    this.error = null; 
    api.post('auth/extend/buyer', {data: 'payload'}).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false;  
        //you can now login to buyer account 
      }
    })
  }
   
  extendToSeller = () => {
    this.loading = true;
    this.error = null; 
    api.post('auth/extend/seller', {data: 'payload'}).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false;  
        //you can now login to buyer account 
      }
    })
  }
  createBuyer = (payload) => {
    this.loading = true;
    this.error = null;
    this.registered = false; 
    api.post('auth/create/buyer', payload).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false; 
        this.registered = true; 
      }
    })
  }

  createSeller = (payload) => {
    this.loading = true;
    this.error = null; 
    this.registered = true; 
    api.post('auth/create/seller', payload).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false; 
        this.registered = false; 
      }
    })
  }
  

   
  login = (payload) => {
    this.loading = true;
    this.error = null;
    api.post('auth/auth', payload).then( res => { 
      if(res.data.status === 200) { 
        this.loading = false;  
        this.id = res.data.user[0].id;
        this.token = res.data.user[0].buyer_token; 
        this.preferred = res.data.user[0].preferred; 
        this.isAuth = true; 
         
      }
    })
  }
   
  loginSuccessful = () => {
    this.isAuth = false;
  }
    
   
   
}
decorate(AuthStore, {
  id: observable,
  token: observable,
  preferred: observable,
  isAuth: observable,
  registered: observable,
  error: observable,
  loading: observable,
  users: observable, 
  emailExist: observable, 
  confirmEmail: action, 
  createBuyer: action,
  createSeller: action, 
  extendToBuyer: action,
  extendToSeller: action,
  login: action,
  logOut: action,
  loginSuccessful: action
})

export default AuthStore

 