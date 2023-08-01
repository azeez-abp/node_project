import React, { useState } from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField,InputAdornment } from '@mui/material'
import { 
        GridToolbarDensitySelector,
        GridToolbarContainer,
        GridToolbarExport,
        GridToolbarColumnsButton,
        GridToolbarQuickFilter
 } from '@mui/x-data-grid'
 import FlexBetween from './FlexBetween'


function DataGridToolBar({state,setState}) {
      // const [searchInput ,setSearchInput]  = useState("")
  return (
    <GridToolbarContainer>
        <FlexBetween width={"100%"} >
                <FlexBetween>
                        <GridToolbarColumnsButton></GridToolbarColumnsButton>
                        <GridToolbarDensitySelector></GridToolbarDensitySelector>
                        <GridToolbarExport></GridToolbarExport>
                        <GridToolbarQuickFilter/>
                </FlexBetween>
                <TextField 
                  label ={"Search"}
                  sx={{
                        mb:"0.5rem", 
                        width:"15rem"
                  }}
                  onChange={(e)=>{setState({...state, search:e.target.value}); console.log(e.target.value)} }
                  value={ state.search }
                    variant="standard"
                 InputProps={{ // The prop name should be "InputProps" (with capital "I")
                        endAdornment: ( // The prop name should be "endAdornment" (with lowercase "e")
                        <InputAdornment position="end">
                                <IconButton 
                                //     onClick={ ()=>{ setSearch(searchInput)
                                //                 setSearchInput("")
                                //                     }
                                //     }

                                >
                                <Search />
                                </IconButton>
                        </InputAdornment>
                        )
                        }}
                />
        </FlexBetween>
    </GridToolbarContainer>

  )
}

export default DataGridToolBar