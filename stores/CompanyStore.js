
import { decorate, observable, action, computed } from "mobx"
import api from "../services/APIService";
 

class CompanyStore {
  constructor() {  
    this.getProfile();  
    this.getPages();   
  }
  
     error = false; 
     response = false;
     message = '';
     loading = false;
     sent = false; 
     profiles = [];
     pages = [];
 
     setResponse = (data) => {
       this.response = data;
     }

     getProfile = () => {
        this.loading = true;
        api.get('company/getProfile/').then( res => { 
            this.loading = false; 
          if(res.status === 200) {
            this.profiles = res.data.data[0];
          }
        })
      }

      updateProfile = (data) => { 
        api.post('company/', data).then( res => {  
          if(res.data.status === 200) {
           this.getProfile(); 
           this.message = res.data.message; 
           this.response = true;           
          }
        })
      }

      publish = (data) => {
        try {    
          api.post('company/pages', data).then(res => { 
            if(res.data.status === 200) {
              this.getPages(); 
              this.message = res.data.message; 
              this.response = true;   
            } else {
              this.error = true;
            }
            
          })  
        } catch(err) {
          if(err.response.status === 500) {
            console.log("There was a problem with the server");
          } else {
            console.log(err.response.data.msg)
          }
        }  
      }

      getPages = () => {
          this.loading = true;
        api.get('company/pages/').then( res => { 
            this.loading = false;
          if(res.status === 200) {
            this.pages = res.data.data;
          }
        })
      }
   
  get profile() { 
    var data = [];
    const d = {
      id: this.profiles.id,
      companyname: this.profiles.companyname,
      address: this.profiles.address,
      email: this.profiles.email,
      phone: this.profiles.phone, 
      image: this.profiles.image, 
      updated_at: this.profiles.updated_at
    }
    data.push(d);  
    return data[0]; 
   }

   removePage = (id) => { 
    api.delete('company/' + id).then( res => {
      if(res.status === 200) {
        this.getPages();
        this.message = res.message; 
      }
    })
  }

}
decorate(CompanyStore, { 
  message: observable, 
  response: observable,
  error: observable, 
  profiles: observable,
  pages: observable,
  sent: observable,
  loading: observable,
  getPages: action,
  getProfile: action,
  removePage: action,
  updateProfile: action,
  setResponse: action,
  publish: action,
  profile: computed
})

 
export default CompanyStore
