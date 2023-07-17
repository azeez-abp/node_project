import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { setDialogue } from '../state';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  px: 4,
  py:2,
  color:"black",
  borderRadius:"4px"
};

/**
 * 
 * 
 * 
*/

export default function DialoguePane({dialogue}) {

  const dispatch = useDispatch()
  const   {open ,text }      = dialogue  
  //const [open, setOpen] = React.useState(true);

  const handleCallCallback = () => dispatch(setDialogue({...dialogue,callback:true}))

  
  const handleClose = () => dispatch(setDialogue({...dialogue,close:true,open:false}));
  

  const  style2={
    backgroundColor:"rgba(0,0,0,.6)",
    filter:"blur(9px)",
    position:"fixed",
    top:0,
    left:0,
    bottom:0,
    right:0,
    zIndex:"1300"
  
}

  return (
    <div>
        {
      open && (<>
        <div
           style={style2}
     >
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop
        // sx={style2}
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {text}
          </Typography>
          <Box sx={{
            float:"right"
          }}>
          <Button onClick={handleCallCallback} >Yes</Button>
          <Button onClick={handleClose}>NO</Button>
          </Box>
        
        </Box>
      </Modal>
    </div>
      </>)
    }
    </div>
  

  );
}