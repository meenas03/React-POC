import { GET_ALL_CARS } from '../action/homeAction'
const homeScreenReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case GET_ALL_CARS:
            console.log("carlist -->", action.data);
            return { ...state, carsList: action.data };
        default:
            return state;
    }
}

export default homeScreenReducer;