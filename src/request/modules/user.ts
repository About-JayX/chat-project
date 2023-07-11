import {addUserApi} from '../api'
import request from '../index'

export function addUser<T>(params:Object){
    return request.get<T>(addUserApi,params)
}