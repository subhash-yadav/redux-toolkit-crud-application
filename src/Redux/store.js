import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./Features/PostSlice";

export default configureStore({
    reducer:{
        app:PostSlice
    }
})