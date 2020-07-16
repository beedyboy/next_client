// import { useStaticRendering } from 'mobx-react';
import {useLocalStore, useObserver} from 'mobx-react';
import Auth from './AuthStore';
import ProductStore from './ProductStore';
import CategoryStore from './CategoryStore';
import UserStore from './UserStore';
import LocationStore from './LocationStore';

const isServer = typeof window === 'undefined';
// useStaticRendering(isServer);

let store;

export  function getStores(initialData = { productStore: {}, categoryStore: {}, userStore: {} }) {

    if(isServer) {
        return {
            authStore: new Auth(),
            productStore: new ProductStore(initialData.ProductStore),
            categoryStore: new CategoryStore(initialData.categoryStore),
            locationStore: new LocationStore(initialData.locationStore),
            userStore: new UserStore(initialData.userStore)
        };
    }
    if(!store) {
        store = {
            authStore: new Auth(),
            productStore: new ProductStore(initialData.ProductStore),
            categoryStore: new CategoryStore(initialData.categoryStore),
            locationStore: new LocationStore(initialData.locationStore),
            userStore: new UserStore(initialData.userStore)
        };
    }
    return store;
}

const StoreContext = React.createContext();

export function StoreProvider(props) {
    return <StoreContext.Provider value={props.value}>
        {props.children}
    </StoreContext.Provider>
}


 

export function useMobxStores() {
    return React.useContext(StoreContext);
}