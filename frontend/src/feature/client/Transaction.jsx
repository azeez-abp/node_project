import React, { useState } from 'react'
import GetUser from './GetUser'
import { Box, useTheme} from '@mui/material';
import { useGetTransationQuery } from '../../state/api';
import { DataGrid } from '@mui/x-data-grid';


function Transaction() {
  const theme  = useTheme()
  const [state, setState]   = useState({page:0,pageSize:20,sort:{}, search:""  });

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
    renderCell: (params)=>`$${Number(params.value).toFixed(2)}`
  },
  
]



console.log(data)

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
              data && <DataGrid
                    loading={!data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.totalCount) || 0}
                    pagination
                    page={state.page}
                    pageSize={state.pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setState({...state, page:newPage})}
                    onPageSizeChange={(newPageSize) => setState({...state,pageSize:newPageSize})}
                    onSortModelChange={(newSortModel)=>setState({...state,sort:{...newSortModel} })}
             />
             }
              
         
            
        </Box> 
       </Box>


    </div>
  )
}

export default Transaction