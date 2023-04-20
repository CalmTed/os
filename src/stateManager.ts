import { ActionModel, AppStateModel, SubscriberModel } from "./models";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";
import { reducer } from "./reducer";
import { VERSION } from "./constants";

const subscribers: SubscriberModel[] = [];
const storage = new Storage({
  size: 100,
  storageBackend: AsyncStorage,
  defaultExpires: null,
});
const storageName = "storageName";

const getInitialAppState: () => AppStateModel = () => {
  return {
    version: VERSION,
    lastChange: new Date().getTime(),
    theme: "dark",
    number: 0
  }
}

const getState: () => Promise<AppStateModel> = async () => {
  const localData = await storage.load({
    key: storageName
  }) || null;
  if(localData !== null) {
    try{
      return JSON.parse(localData);
    }catch(e) {
      //fallback to set initial state
      const initialData = getInitialAppState();
      await storage.save({
        key: storageName,
        data: JSON.stringify(initialData)
      })
      return initialData; 
    }
  }else{
    //or get initial
    const initialData = getInitialAppState();
    await storage.save({
      key: storageName,
      data: JSON.stringify(initialData)
    })
    return initialData;
  }
};

const dispach: (arg: ActionModel) => Promise<void> =  async (action) => {
  const currentState = await getState().catch((e) => {
    return getInitialAppState();
  });
  const {state: newState, stateUpdated: stateUpdated} = reducer(currentState, action);
  //if state has changed
  if(!stateUpdated) {
    return;
  }
  storage.save({
    key: storageName,
    data: JSON.stringify(newState)
  })
  //notify all subscribers
  subscribers.forEach(subscriber => {
    subscriber(newState);
  });
};
const subscribe: (callback: SubscriberModel) => void = (callback) => {
  subscribers.push(callback);
};

const stateManager:{
  getState: () => Promise<AppStateModel>
  dispach: (arg: ActionModel) => Promise<void>
  subscribe: (callbeck: SubscriberModel) => void
} = {
  getState:getState,
  dispach:dispach,
  subscribe: subscribe
};

export default stateManager;
