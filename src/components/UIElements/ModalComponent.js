import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalOverlay = (props) => {
    const content = (
        <Modal
            open={props.show}
            onClose={props.onCancel}
            className={`class-modal ${props.className}`}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <header>
                    <Typography id="modal-modal-title" variant="h2" component="h2">
                        {props.headerTitle}
                    </Typography>
                    {props.iconName && <FontAwesomeIcon icon={props.iconName} size="lg" onClick={props.onCancel} />}
                </header>
                <div>
                    {props.children}
                </div>
                <footer>
                    {props.footer}
                </footer>
            </Box>
        </Modal>
    )
    return ReactDOM.createPortal(content,document.getElementById('modal-hook'))
}

const ModalComponent = (props) => {
    return <React.Fragment>
        <CSSTransition
            classNames={props.className ? `modal ${props.className}`: "modal"}
            in={props.show}
            timeout={200}
            mountOnEnter
            unmountOnExit
        >
            <ModalOverlay {...props}/>
        </CSSTransition>
    </React.Fragment>
}

export default ModalComponent;