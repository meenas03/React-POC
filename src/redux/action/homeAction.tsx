import {carsList} from '../../utils/carsList'

export const GET_ALL_CARS = "GET_ALL_CARS";

//get All cars action
export const getCars = () => {

    return async (dispatch:any) => {
        dispatch({type:GET_ALL_CARS, data: carsList})
    };
}