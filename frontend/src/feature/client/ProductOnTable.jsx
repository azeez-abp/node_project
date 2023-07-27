import React , {useEffect, useState}from 'react'
import { 
        Box,
        Card,
        CardActions,
        CardContent,
        Collapse,
        Button,
        Typography,
        Rating,
        useTheme,
        useMediaQuery
 } from '@mui/material'

 import { DataGrid , GridToolbarContainer,
        GridToolbarDensitySelector,} from '@mui/x-data-grid';

import { useGetProductQuery } from '../../state/api'
import GetUser from './GetUser'




function ProductOnTable() {

const {data,refetch,isloading}  = useGetProductQuery()
const [products,setProducts]  = useState(null)
//console.log(data)


const isMobile  = useMediaQuery("(min-width:100px)")
        
useEffect(()=>{
        refetch().then(products=>{
         // console.log(products)
          if(products) return setProducts(products.data)
        }).catch(error=>{

        })
},[])

/**
 * rem make dimension consistent across browser
 * One dimensional layer: flexbox
 * two dimenstional layer: grid
 * repeat(4 , minmax(0, 1fr) 4 item per row ; size min is 0 max is 1fr
 */ 
const columns = [
        { field: 'id', 
        headerName: 'ID',
         width: 90 
        },
        {
          field: 'name', //obj key
          headerName: 'Name',
          width: 150,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Proce',
          width: 150,
          editable: true,
        },
        {
          field: 'category',
          headerName: 'Category',
          type: 'number',
          width: 110,
          editable: true,
        },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
      ];


      const formatData = (data) => {
        if(data)return  data.map(({name,price,category},id)=> ({id,name,price,category}) )
      };


      
function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarDensitySelector />
          </GridToolbarContainer>
        );
      }
      
    
      console.log(formatData(data))
   
  return (
    <Box>
    <GetUser />
    <Box m={"1.5rem 2.5rem"}>
          {products? (<Box 
                                        mt={"20px"} display={"grid"} 
                                        gridTemplateColumns={"repeat(1 , minmax(0, 1fr))"} 
                                        rowGap={"20px"}
                                        columnGap={"1.33%"}
                                        sx={
                                                {  /**target all div under box div and apply style*/
                                                   "& > div" : {gridColumn:isMobile ? undefined : "span 4"}     
                                                }
                                        }
          
                               >

                                      <DataGrid
                                                loading={!products}
                                                rows={formatData(products)}
                                                columns={columns}
                                                pagination
                                                pageSize={5}
                                                pageSizeOptions={[5, 10, 20,100]}
                                                checkboxSelection
                                                disableRowSelectionOnClick
                                                density="compact"
                                                getRowId={(row) => row.id}
                                                slots={{toolbar: CustomToolbar }}
                                                
                                        />
                               
                                
                                </Box>) : (<Box>Loading...</Box>)}
    </Box> 
    </Box>
  )
}

export default ProductOnTable