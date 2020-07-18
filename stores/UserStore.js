import { observable, action, computed } from "mobx" ;
import 'mobx-react/batchingForReactDom';
import api from "../services/APIService";
import { Beedy } from "../services/Beedy";


class UserStore { 
 
    @observable error = null;
    @observable invited = false;
    @observable loading = false;
    @observable emailExist = false; 
    @observable buyer = [];
    @observable profiles = [];
    @observable seller =  [
      {'name': 'Dynamic Programming', 'description': "dynamic", 'duration': '10'} 
    ];

    
 @action confirmEmail = (data) => {
    api.get('staff/' + data + '/exist').then( res => { 
      this.emailExist = res.data.exist;
    })
  }
   
    
 @action getBuyerProfile = () => {
    api.get('user/buyer/profile/').then( res => { 
      if(res.data.status === 200) {
        this.buyer = res.data.data[0];
      }
    })
  }
  
 @action updateBuyer = (data) => { 
    api.post('user/update/buyer/', data).then( res => {  
      if(res.data.status === 200) {
       this.getBuyerProfile(); 
       Beedy('success', res.data.message);
       this.response = true;           
      }
    })
  }
      
 @action getSellerProfile = () => {
    api.get('user/seller/profile/').then( res => { 
      if(res.data.status === 200) { 
        this.profiles = res.data.data; 
      }
    })
  }
  
 @action updateSeller = (data) => { 
    api.post('user/update/seller/', data).then( res => {  
      if(res.data.status === 200) {
       this.getSellerProfile(); 
       Beedy('success', res.data.message);
       this.response = true;           
      }
    })
  }
 @action updateShop = (data) => { 
    api.post('user/update/shop', data).then( res => {  
      if(res.data.status === 200) {
       this.getSellerProfile();
       Beedy('success', res.data.message); 
       this.response = true;           
      }
    })
  }

 @action inviteAFriend = (data) => { 
    this.loading = true;
    api.post('user/invite', {email: data}).then( res => {  
      if(res.data.status === 200) { 
        this.loading = false;
        Beedy('success', res.data.message);
       this.invited = true;           
      }
    }).catch(err => {
      console.log(err.response)
    })
  }
 @action setInvited = (data) => {
    this.invited = data;
  }
  @computed get plentylist() {
    return Object.keys(this.seller || {}).map(key =>  ({...this.seller[key], uid: key}));
 }
  @computed get sellerProfile() { 
    return Object.keys(this.profiles || {}).map(key => ({...this.profiles[key], uid: key}));
    
    }
  
} 
export default UserStore;