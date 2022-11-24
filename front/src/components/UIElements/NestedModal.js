import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import BasicButtons from './BasicButtons-MUI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let modalReturn;

  props.withButton === true ? modalReturn = (
    <div>
        <BasicButtons
            onClick={handleOpen}
            variantName={props.variantName}
            buttonName={props.name}
            iconName={props.icon}
            className={props.className}
        />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">{props.title}</h2>
          {props.message && <p id="parent-modal-description">
            {props.message}
          </p>}
          {props.body && <Box>
            {props.body}
          </Box>}
          <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'row', justifyContent: 'space-between' }}>
            {props.cancelButton ? <BasicButtons
                onClick={handleClose}
                variantName="outlined"
                buttonName={props.buttonNameCancel ? props.buttonNameCancel : "No, continuar"}
            /> : null}
            {props.buttonOptions}
          </Box>
        </Box>
      </Modal>
    </div>
  )
  :
  modalReturn = (
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">{props.title}</h2>
          <p id="parent-modal-description">
            {props.message}
          </p>
          <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'row', justifyContent: 'space-between' }}>
            {props.cancelButton ? <BasicButtons
                onClick={props.handleClose}
                variantName="outlined"
                buttonName={"Cancelar"}
            /> : null}
            {props.buttonOptions}
          </Box>
        </Box>
      </Modal>
  )

  return modalReturn;
}