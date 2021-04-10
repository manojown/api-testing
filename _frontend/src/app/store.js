import {configureStore} from  "@reduxjs/toolkit"
import userReducer from '../features/userSlice'
import requestReducer from '../features/requestSlice'
import performanceReducer from '../features/performanceSlice'
import serverReducer from '../features/serverSlice'
import downloadReducer from '../features/downloadSlice'
import utilityReducer from '../features/utilitySlice'





export default configureStore({
    reducer: {
        user:userReducer,
        request:requestReducer,
        performance:performanceReducer,
        server:serverReducer,
        download:downloadReducer,
        utility:utilityReducer
    }
})