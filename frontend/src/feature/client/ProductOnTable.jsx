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

 import {

 CancelOutlined,
 EditOutlined,
 DeleteOutline,
 SaveOutlined
  } from "@mui/icons-material";
 import { DataGrid , GridToolbarContainer,
        GridToolbarDensitySelector,GridToolbar,  GridActionsCellItem,  GridRowModes, } from '@mui/x-data-grid';

import { useGetProductQuery } from '../../state/api'
import GetUser from './GetUser'




function ProductOnTable() {

const {data,refetch,isloading}  = useGetProductQuery()
const [products,setProducts]  = useState(null)
const [selectedRowIds, setSelectedRowIds] = useState([]);
const [rowModesModel, setRowModesModel] = useState({});

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
          type: 'string',
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



        //////////////////////////////
        
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            console.log(rowModesModel)
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<SaveOutlined />}
                  label="Save"
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={(id)=>console.log(id,'Saveing')}
                />,
                <GridActionsCellItem
                  icon={<CancelOutlined />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={(id)=>console.log(id,'Cnacle')}
                  color="inherit"
                />,
              ];
            }
    
            return [
              <GridActionsCellItem
                icon={<EditOutlined />}
                label="Edit"
                className="textPrimary"
                onClick={(id)=>console.log(id,'Edit')}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteOutline />}
                label="Delete"
                onClick={(id)=>console.log(id,'Delete')}
                color="inherit"
              />,
            ];
          },
        },

      /////////////////////




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
      
   
      const handleSelectionChange = (selectionModel) => {
        console.log(selectionModel)
        setSelectedRowIds(selectionModel);
      };
    
   
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
                                                slots={{toolbar: GridToolbar  }}
                                                editMode="row"

                                                onRowSelectionModelChange={(data)=>console.log(data,"SelectionModelChange")} // Handle selection change
                                                selectionModel={selectedRowIds} // Pass the selected row IDs to the DataGrid
                                                //onStateChange={(state)=>console.log(state,"onStateChange")}
                                                onCellClick={()=>console.log("cell click")}
                                                onRowEdit={(state)=>console.log(state,"onRowEditStop")}
                                                onCellEditCommit={(state)=>console.log(state,"onCellEditCommit")}
                                                onRowEditStop={(state)=>console.log(state,"onRowEditStop")}
                                                
                                                
                                        />
                               
                                
                                </Box>) : (<Box>Loading...</Box>)}
    </Box> 
    </Box>
  )
}

export default ProductOnTable