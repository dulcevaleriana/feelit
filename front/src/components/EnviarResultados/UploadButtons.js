import React, { useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faFilePdf } from '@fortawesome/free-solid-svg-icons';

export default function UploadButtons(props) {
    const cardFile = "ADD-FILE-WORK.pdf"
    const [arrayFileUpload, setArrayFileUpload] = useState([])
    const filePicketRef = useRef()

    const addPreviewFileUpload = () => {
        filePicketRef.current.click()
        setArrayFileUpload(arr => [
            ...arr,
            { cardFileElement: cardFile}
        ])
    }
    console.log("arrayFileUpload",arrayFileUpload)
    return (
        <Stack direction="row" alignItems="center" spacing={2} className="class-UploadButtons">
            <div>
                {arrayFileUpload.map((index, key)=>(
                    <div key={key}>
                        <FontAwesomeIcon icon={faFilePdf} size="lg"  />
                        <h4>{index.cardFileElement}</h4>
                    </div>
                ))}
            </div>
            <input
                id={props.id}
                type="file"
                ref={filePicketRef}
                style={{display:'none'}}
                accept=".jpg,.png,.jpeg,.pdf"
                // onChange={pickerHandle}
            />
            <button type='button' onClick={addPreviewFileUpload}>
                <FontAwesomeIcon icon={faFileImport} size="lg"  />
                <h4>Click aquí o arrastrar aquí para agregar documentos a enviar</h4>
            </button>
        </Stack>
    );
}