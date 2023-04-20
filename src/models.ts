export interface AppStateModel{
  version: string
  lastChange: number
  theme: string
  number: number
}

export type SubscriberModel = (newState: AppStateModel) => {

}

export type ActionModel = {
  name: "setNum",
  payload: number
}

export type ReducerModel = (state: AppStateModel, action: ActionModel) => {
  state: AppStateModel,
  stateUpdated: boolean
}