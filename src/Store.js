import { configureStore } from "@reduxjs/toolkit";
import {addtonotereducer} from "./Reducer/reducer"

const Store = configureStore({
    reducer:{
     addtonotereducer
    }
})
export default Store;



