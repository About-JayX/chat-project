export interface ResData {
    code : number
    msg : string
}

export interface ResWholeData<T> extends ResData {
    data :T
}