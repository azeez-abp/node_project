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
const [rows, setRows] = useState(null);

//console.log(data)


const isMobile  = useMediaQuery("(min-width:100px)")
        
useEffect(()=>{
         
          //  if(data)   {
          //   let data_  = data.map(({_id,name,price,category},id)=> ({id:_id,name,price,category}) )

          //   return setProducts(data_ )
          //  }else{
          //   //reload
          //  }

        refetch().then(products=>{
         
           let data_  = products.data.map(({_id,name,price,category},id)=> ({id:_id,name,price,category}) )
          
          if(products) return setProducts(data_)
        }).catch(error=>{
              console.log(error)
        }) 

    
},[])


const handleEditClick = (id) => () => {
 // console.log(rowModesModel,"Edit",id)
  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
};



const handleCancelClick = (id) => () => {
  setRowModesModel({
    ...rowModesModel,
    [id]: { mode: GridRowModes.View, ignoreModifications: true },
  });
}


const handleSaveClick = (id) => () => {
  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
};

const handleDeleteClick = (id) => () => {
  setProducts(products.filter((product) =>product.id !== id));
};


const processRowUpdate = (newRow) => {
  const updatedRow = { ...newRow, isNew: false };
  setProducts(products.map((row) => (row.id === newRow.id ? updatedRow : row)));
  console.log(updatedRow, "MEW")
  return updatedRow;
};


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
          headerName: 'Actions  <p>delete</p>',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
           // console.log(rowModesModel)
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<SaveOutlined />}
                  label="Save"
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<CancelOutlined />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />,
              ];
            }
    
            return [
              <GridActionsCellItem
                icon={<EditOutlined />}
                label="Edit"
                title='Edit'
                className="textPrimary"
                //onClick={(id)=>console.log(id,'Edit')}
                onClick = {handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteOutline />}
                label="Delete"
                onClick={handleDeleteClick(id) }
                color="inherit"
              />,
            ];
          },
        },

      /////////////////////

      ];




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
                                                rows={products}
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
                                               // onCellClick={()=>console.log("cell click")}
                                                onRowEdit={(state,state2)=>console.log(state,"onRowEditStop",state2)}
                                                onCellEditCommit={(state)=>console.log(state,"onCellEditCommit")}
                                                onRowEditStop={(state)=>console.log(state,"onRowEditStop")}

                                                processRowUpdate={processRowUpdate}
                                                
                                              
                                                
                                                
                                        />
                               
                                
                                </Box>) : (<Box>Loading...</Box>)}
    </Box> 
    </Box>
  )
}

export default ProductOnTable