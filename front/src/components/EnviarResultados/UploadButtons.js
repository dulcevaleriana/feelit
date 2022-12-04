import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faFile } from '@fortawesome/free-solid-svg-icons';

export default function UploadButtons(props) {
    const cardFile = "ADD-FILE-WORK.pdf"
    const [modifyStyleTop, setModifyStyleTop] = useState(100)
    const [arrayFileUpload, setArrayFileUpload] = useState([])
    const filePicketRef = useRef()

    const addPreviewFileUpload = () => {
        filePicketRef.current.click()
        setArrayFileUpload(arr => [
            ...arr,
            { cardFileElement: cardFile}
        ])
        setModifyStyleTop(modifyStyleTop === 10 ? 10 : modifyStyleTop - 10)
    }
    console.log("arrayFileUpload",arrayFileUpload)
    return (
        <div direction="row" alignItems="center" spacing={2} className="class-UploadButtons">
            <input
                id={props.id}
                type="file"
                ref={filePicketRef}
                style={{display:'none'}}
                accept=".jpg,.png,.jpeg,.pdf"
                // onChange={pickerHandle}
            />
            <button type='button' onClick={addPreviewFileUpload} style={{height:`${modifyStyleTop}%`}} className={modifyStyleTop === 10 ? "class-cardUpload" : ""}>
                <FontAwesomeIcon icon={faFileImport} size="lg"  />
                <h4>Click aquí o arrastrar aquí para agregar documentos a enviar</h4>
            </button>
            {arrayFileUpload.map((index, key)=>(
                <div key={key} style={{height:'10%'}} className="class-cardUploaded">
                    <FontAwesomeIcon icon={faFile} size="lg"  />
                    <h4>{index.cardFileElement}</h4>
                </div>
            ))}
        </div>
    );
}