import api from "../services/APIService"; 
const { observable, action, computed } = require("mobx");

class LocationStore {
    constructor() {
        this.fetchLocation(); 
    }
    @observable locations = [];
    @observable cities = [];
    
    @action fetchLocation = () => {  
        api.get('location/cities').then( res => {  
              this.locations = res.data;
            //   console.log(res.data);
        }); 
      }
    
      @action searchCites = (data) => {  
        api.get('location/search', data).then( res => {  
             if(res.data.status === 200) {
                this.location = res.data; 
             } 
        }); 
      }
    @computed get location() {
        return  Object.keys(this.locations || {}).map(key => ({...this.locations[key], uid: key}));
 
    }
}

export default LocationStore;