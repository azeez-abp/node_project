import React, {useMemo} from 'react'
import { useGetProductQuery } from '../state/api'
import { Box, useTheme } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'



function Breakdown() {
    
        const theme  =  useTheme()
        const {data}  =useGetProductQuery ()

        const [totalSalesLine]   = useMemo(()=>{ 
                if(!data) return []

             /////format data
             let cache  = {} ///using cache to improve grouping
             const formatedeDataToSuitGraph  = data.reduce((initial,cur,index)=>{
                     initial  = initial || []
                    console.log(cache)
                     const   {monthlyData,category  }  = cur  //destructure cur
                     let cat    = category.substring(0,3)

                     let totSales  = 0;
                      for (let index = 0; index < monthlyData.length; index++) {
                       totSales += monthlyData[index]['totalSales'];
                       
                      } 
                      
                       let prev_index  = -1;
                      if(!cache.hasOwnProperty(cat) )
                      {
                        cache[cat ]    = index;
                      }else{
                       prev_index   =  cache[cat ] 
                      }

                      let   totalSalesLine  = {
                       id:cat ,
                       color:theme.palette.secondary.main,
                       value: totSales,
                       label :category 
                  } 
                    
                      if(  prev_index !== -1 ){

                       totalSalesLine =  initial[prev_index] 
                       console.log(totalSalesLine, "PREV")

                       // 
                       if(totalSalesLine) {
                         totalSalesLine.value  = totalSalesLine.value + totSales
                         initial[prev_index] =  totalSalesLine
                       }
                      }else{
                        initial  = [...initial,totalSalesLine]
                      }

                
           
              
           
                   return  initial
           
            },[])
             
            
               return [ formatedeDataToSuitGraph]
              } , [data])
              
        
   if(totalSalesLine)console.log(totalSalesLine)

  return (
     <Box 
       height={"100vh"}
     >
      {totalSalesLine &&(<ResponsivePie
        data={totalSalesLine}

        theme={{
          /**Theme impact color and enable us to see*/
                        axis: {
                                domain:{
                                        line:{
                                                stroke:theme.palette.secondary[200]
                                        }
                                },
                
                                legend:{
                                        text:{
                                                fill:theme.palette.secondary[200],
                                                
                                        },
                                        
                                        
                                },
                               
                                ticks:{
                                        line:{
                                                stroke:theme.palette.secondary[200],
                                                strokeWidth:1
                                        },
                                        text:{
                                                fill:theme.palette.secondary[200]
                                        }
                                },
                                   
                        },
                        tooltip:{
                                container:{
                                                color:theme.palette.primary.main
                                        }
                       },

                       legends:{
                           text:{
                                fill:theme.palette.secondary[200]
                           }
                       }

        
                    }}


        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
       
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />)}
        
    </Box>
  )
}

export default Breakdown