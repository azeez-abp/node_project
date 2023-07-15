export const setCookie = (res,name ,values,max_age)=> {
        res.cookie(name,values, { 
                domain:'',
                maxAge: max_age,
                httpOnly:true ,
                signed:true ,
                sameSite:'None',// "strict",// 'lax  | None'
                secure: true
              });

              const setCookieHeader = res.getHeader('Set-Cookie');

              if (setCookieHeader) {
                console.log('Cookie was successfully set:', setCookieHeader);
              } else {
                console.log('Failed to set cookie.');
              }
}