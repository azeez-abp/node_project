import React from 'react'
import { ResponsiveChoropleth } from '@nivo/geo'
import { useGetGeographicsQuery } from '../../state/api'
import { Box, useTheme } from '@mui/material'
import { geodata } from '../../state/geodata'
import GetUser from './GetUser'
function Geographics() {
        const theme   = useTheme()
        const {data}  = useGetGeographicsQuery()
   
         

        const MyResponsiveChoropleth = ({ data /* see data tab */ }) =>{
                
                let maxValueNumberOfUser    =  0
                  
                      for(let i = 0; i < data.length; i++)
                      {
                        if(data[i]['value'] > maxValueNumberOfUser  ) maxValueNumberOfUser   = data[i]['value']
                      }
             
                return(
                <ResponsiveChoropleth
                    data={data}
                    theme={{
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
                    features={geodata.features}
                    margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                    //colors="nivo"
                    domain={[ 0,  maxValueNumberOfUser ]}
                    unknownColor="#666666"
                    label="properties.name"
                    valueFormat=".2s"
                    projectionTranslation={[ 0.5, 0.5 ]}
                    projectionRotation={[ 0, 0, 0 ]}
                    enableGraticule={true}
                    graticuleLineColor="#dddddd"
                    borderWidth={0.5}
                    borderColor="#152538"

                    legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 70,
                translateY: 0,
                itemsSpacing: 4,
                itemWidth: 97,
                itemHeight: 24,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 27,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
                    

                />
            )
}

  return (
    <Box 
     mt={"40px"}
     height={"100vh"}
     width={"calc(100% - 56px)"}
     border={"1px solid "+theme.palette.secondary[200]}
     borderRadius={"4px"}
     m={"0 19px 0 53px"}
    >
    <GetUser />
       {data ? MyResponsiveChoropleth(data)  : <>Loading</>}
    </Box>
  )
}

export default Geographics