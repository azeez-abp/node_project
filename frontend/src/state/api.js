import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { crypto } from "../lib/crypto";
let token  = localStorage.getItem("APP_ACCESS_TOKEN")? crypto.decode( JSON.parse(localStorage.getItem("APP_ACCESS_TOKEN")),process.env.REACT_APP_ACCESS_TOKEN, JSON.parse(atob('WzMsNCwyLDAsMV0='))   ) :null
//
//provideTage in query
// invalidatetahe in mutation

/*
  get for data   =>query provideTage

  put |delete for a data change =>mutation =>invalidateTag i.e when this is done get request will be called automatically

*/


export  const api  = createApi({

    baseQuery:fetchBaseQuery({ 
        baseUrl:process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const state = getState()
            
             // headers.set("Access-Control-Allow-Origin",process.env.REACT_APP_BASE_URL) 
             headers.set("Access-Control-Allow-Credentials","true")
            if (token) {
              
               headers.set('Authorization', `Bearer ${token}`)
            }else{
                headers.delete('Authorization')
            }
            return headers
        },
         credentials: 'include', 
    
    }),
  // This allows server to set cookies
    reducerPath:"adminAPi",//name of the slice
    tagTypes:['GeneralUser','ClientsProfile'],///route for get ie query
    endpoints: (builder)=>({

        getUser:builder.query({
            query:(id)=>`/general/user/${id}`,
            providesTags:["'GeneralUser"],
        
              
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
                query:()=>`/client/profile`,
                providesTags:["ClientsProfile"],///to be call automatically if the data change by mutation that reference
                //These tags help in managing the cache behavior for the query results.
                /*By providing tags, you have more control over the caching behavior of your queries,
                allowing you to keep the data up-to-date and avoid unnecessary refetching when data related to a specific tag hasn't changed.*/
                /*providesTags enables automatic cache update*/
                   /*Fro manual cache update, no need for providesTags you need to prorive asyc onQueryStarted function check it on REDUX page */
                headers: {
                    Authorization: `Bearer ${token}`,
                    AppName:"WEB APPLICATON"
                  },
            
                  
            })
                , 
            userUpdateProfile:builder.mutation({
                query:()=>'/client/updateProfile',
                invalidatesTags:["ClientsProfile"],
                method:"PUT"
                

            }),
          
          userLogout:builder.mutation({
               query:()=>`/client/logout`, 
               method:"GET"
          }),
        
          requestPassword:builder.mutation({
            query: data =>{
                    
                return ({
                 url: '/client/request-password',
                 method: 'POST',
                 body: data,
               
               })
         } 
       }),
       resetPassword:builder.mutation({
        query: data =>{
                
            return ({
             url: '/client/reset-password',
             method: 'PUT',
             body: data,
           
           })
     } 
   }),
 

    })
 })
// use+loginUser+Mutation
//
 export const {
    useGetUserQuery,
    useRegisterUserMutation,
    useLoginUserMutation,
    useUserProfileQuery,
    useUserLogoutMutation,
    useUserUpdateProfileMutation,
    useRequestPasswordMutation,
    useResetPasswordMutation

}  = api