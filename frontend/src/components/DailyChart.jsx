import React, { useState } from 'react'
import {ResponsiveLine} from  "@nivo/line"
import { useTheme } from '@emotion/react'
import { useMemo } from 'react'
import { useGetStatQuery } from '../state/api'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Box } from '@mui/material'
import '../custom-datepicker.css'; 

function DailyChart() {

  const theme = useTheme()
  const [dateFrom,setDateFrom]  = useState("2021-01-01");
  const [dateTo,setDateTo]   = useState("2021-12-31")

  const {data,isLoading} = useGetStatQuery()
    
  const [totalSalesLine,totalUnitsline]   = useMemo(()=>{ 
    if(!data) return []
    const {dailyData}    = data.data[0];  
   
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
  Object.values(dailyData).forEach(({date,totalSales,totalUnits})=>{
            let dataUnit  = {x:date,y:totalUnits}
            let dataTotal  = {x:date,y:totalSales}
            console.log(dateFrom,date ,dateTo)
          if(date >= (new Date(dateFrom)).toISOString().substring(0,10) && date <= (new Date(dateTo)).toISOString().substring(0,10)  ){
               
                totalUnitsline.data.push(dataUnit)
                totalSalesLine.data.push( dataTotal)
          }

 })


   return [totalSalesLine, totalUnitsline]
  } , [data,dateFrom,dateTo]) ///to re-render if the date chage
  
  console.log(totalSalesLine, totalUnitsline,)
  return (
    <Box  height={"75vh"}  sx={{transform:"translate(50px)"}}>  
    {/* calendar start */}
    <Box display={"flex"} flexDirection={"row"}  >
      <Box>
       <DatePicker 
       
       selected={new Date(dateFrom)} 
       onChange={(date) => setDateFrom(date)} 
       dateFormat="yyyy-MM-dd"  
       maxDate={new Date("2022-01-01")}
       placeholderText="Select a date"
        popperPlacement="bottom-start"

        />
        </Box>
        <Box>
       <DatePicker 
       selected={new Date(dateTo)} 
       onChange={(date) => setDateTo(date)} 
       dateFormat="yyyy-MM-dd" 
       maxDate={new Date( "2022-01-01")}
       placeholderText="Select a date"
        popperPlacement="bottom-start"
       />
       </Box>
</Box>
{/* calendar end */}
     <>{totalUnitsline && (<>
      <ResponsiveLine
      
    data={[ totalUnitsline ,totalSalesLine] }
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
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle'
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:  'sales',
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
            anchor: 'top',
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

     </Box>
  )

}

export default DailyChart