import React, { useState } from 'react'
import GetUser from './GetUser'
import { Box, useTheme} from '@mui/material';
import { useGetTransationQuery } from '../../state/api';
import { DataGrid } from '@mui/x-data-grid';
import DataGridToolBar from '../../components/DataGridToolBar';


function Transaction() {
  const theme  = useTheme()
  const [state, setState]   = useState({page:1,pageSize:20,sort:{}, search:""  });
  const [search,setSearch]  = useState("")


  const {data, isLoading }  = useGetTransationQuery({
    page:state.page,
    pageSize:state.pageSize,
    sort:JSON.stringify(state.sort),
    search:state.search
  })

const columns  = [
  {
    field:"_id",
    headerName:"ID",
    flex:1
  },
  {
    field:"userId",
    headerName:"User ID",
    flex:1
  },
  {
    field:"createdAt",
    headerName:"CreatedAt",
    flex:1
  },

  {
    field:"products",
    headerName:"Products Number",
    flex:1,
    sortable:false,
    renderCell:(params)=>params.value.length
  },
  {
    field:"cost",
    headerName:"Cost",
    flex:1,
    renderCell: (params)=>`$${  Number(Number(params.value).toFixed(2)).toLocaleString() }` /**renderCell is used to format each data i the celll*/
  },
   
]



console.log(state, data)

  return (
    <div>
    <GetUser />
       <Box m={"1.5rem 2.5rem"}>
        
        <Box
                  sx={{
                        "&.MuiDataGrid-root": {
                        border: "none",
                        "&.MuiDataGrid-cell": {
                        },
                        borderBottom: "none",
                        },
                        "&.MuiDataGrid-column Headers": {
                        backgroundColor:
                        theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        porderBottom: "none",
                         },
                        "&.MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light, 
                      },
                        "&.MuiDataGrid-footerContainer": {
                       
                        backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderTop: "none",
                      },
                        "&.MuiDataGrid-toolbarContainer .MuiButton-text": { 
                          color: `${theme.palette.secondary[200]} !important`,
                        },
                  }}
            >
             {  /** if data present is not checked and is null or undefined, infinite loop error occur*/
              data && data.transactions.length > 0 && <DataGrid

                //  {...data.transactions}
                    initialState={{
                      ...data.transactions.initialState,
                      pagination: { paginationModel: { pageSize: state.pageSize } },
                    }}
                    pageSizeOptions={[5, 10, 20,100]}
                    // loading={!data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.totalCount) || 0}

                    // pagination
                     page={state.page}
                    //  pageSize={state.pageSize}
                    //  pageSizeOptions={[10, 20, 50 , 100]}
           
                    /**This activate server side pagination so the front won't work,  */               
                    paginationMode="server"
                    sortingMode="server"
                    
                    onPaginationModelChange={(newPage) =>  { setState({...state, ...newPage}) ; 
                    console.log(`Page change to page ${state.page+1}`, newPage)
                     }  }
                    onPageSizeChange={(newPageSize) =>{ 
                      setState({...state,pageSize:newPageSize})  
                      console.log(`onPageSizeChange to page ${state.page+1}`)
                    
                    } }
                    onSortModelChange={(newSortModel)=> { 
                      setState({...state,sort:newSortModel[0] })  
                      console.dir(`Page change to page ${ JSON.stringify(newSortModel) }`) 
                      } }
                   slots={{toolbar:DataGridToolBar }}
                    slotProps={ {
                      toolbar:{state,setState}
                      }}

             />
             }
              
         
            
        </Box> 
       </Box>


    </div>
  )
}

export default Transaction