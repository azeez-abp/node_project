import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { crypto } from "../lib/crypto";
let token  = localStorage.getItem("APP_ACCESS_TOKEN")? crypto.decode( JSON.parse(localStorage.getItem("APP_ACCESS_TOKEN")),process.env.REACT_APP_ACCESS_TOKEN, JSON.parse(atob('WzMsNCwyLDAsMV0='))   ) :null
//console.log(token,process.env.REACT_APP_ACCESS_TOKEN)
export  const api  = createApi({

    baseQuery:fetchBaseQuery({ baseUrl:process.env.REACT_APP_BASE_URL }),
    reducerPath:"adminAPi",//name of the slice
    tagTypes:['User'],
    endpoints: (builder)=>({

        getUser:builder.query({
            query:(id)=>`/general/user/${id}`,
            providesTags:["User"],
        
              
        }),
        registerUser: builder.mutation({
            query: initialPost => ({
              url: '/client/register',
              method: 'POST',
              body: initialPost
            })
        })
            , 
            
       loginUser: builder.mutation({
                query: initialPost =>{
                    console.log(initialPost, "INITIAL PSOT")
                       return ({
                        url: '/client/login',
                        method: 'POST',
                        body: initialPost,
                        headers: {
                            Authorization: `Bearer token`,
                          },
                      })
                } 
            }),
    
            userProfile: builder.query({
                query:()=>`/clients/profile`,
               // providesTags:["User"],
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            
                  
            })
                , 
     

    })
 })
// use+loginUser+Mutation
//
 export const {
    useGetUserQuery,
    useRegisterUserMutation,
    useLoginUserMutation,
    useUserProfileQuery

}  = api