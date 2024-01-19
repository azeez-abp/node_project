import React from 'react'
import {ResponsiveLine} from  "@nivo/line"
import { useTheme } from '@emotion/react'
import { useMemo } from 'react'
import { useGetStatQuery } from '../state/api'
function OverviewChart({isDashbaord = false, view}) {

  const theme = useTheme()

  const {data,isLoading} = useGetStatQuery()
    
  const [totalSalesLine,totalUnitsline]   = useMemo(()=>{ 
    if(!data) return []
    console.log(data, "Monthdata now")
    const {monthlyData}    =  (data.hasOwnProperty('data') && data.data.length >0) ? data.data[0] :{monthlyData:[]};  
    console.log(monthlyData, "Monthdata")
    let totalSalesLine  = {
         id:"tatalSales",
         color:theme.palette.secondary.main,
         data:[]
    }

    let totalUnitsline = {
      id:"tatalUnits",
      color:theme.palette.secondary.main,
      data:[]
 }
   
 /////format data
 const formatedeDataToSuitGraph  = Object.values(monthlyData).reduce((initial,cur)=>{
         initial  = initial || {sales:0,units:0}
       
         const   {month,totalSales,totalUnits}  = cur  //destructure cur
         const curSales  = initial.sales  + totalSales
         const curUnits  = initial.units + totalUnits;
         //console.log(cur,initial, "OVER", totalUnitsline.data )
          
         totalSalesLine.data = [
          ...totalSalesLine.data,
          {x:month , y:curSales}
         ]

         totalUnitsline.data = [
          ...totalUnitsline.data,
          {x:month , y:curUnits}
         ]

        return {sales:curSales, units:curUnits} 

 },{sales:0,units:0})


   return [totalSalesLine, totalUnitsline]
  } , [data])
  
  console.log(totalSalesLine, totalUnitsline,view)
  return (
     <>{totalUnitsline && (<>
      <ResponsiveLine
    data={view === "units" ? [totalUnitsline]: [totalSalesLine] }
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

    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Month',
        legendOffset: 36,
        legendPosition: 'middle'
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:  view === "units" ? 'tatalUnits' : 'tatalSales',
        legendOffset: -40,
        legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: theme.palette.secondary.main,
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
/>
     </>)}</>
  )
}

export default OverviewChart