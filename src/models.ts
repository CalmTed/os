export interface AppStateModel{
  version: string
  lastChange: string
  people: PeopleModel[]
  statuses: StatusModel[]
}



export interface PeopleModel{
  id: number
  name: string
  status: number | null//status id
}

export interface StatusModel{
  id: number
  name: string
  smallName: string
  color: string
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