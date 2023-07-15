export const destroyCookie = (res,name)=> {
        console.log(new Date( ((new Date()).getTime())-(10000*60*60*3) )   )
        res.cookie(name,'cookie_done', { 
                domain:'',
                expires: ((new Date()).getTime())-(10000*60*60*3),
                httpOnly:true ,
                signed:true ,
                sameSite:'None',// "strict",// 'lax  | None'
                secure: true,
                maxAge:0
              });

       
}