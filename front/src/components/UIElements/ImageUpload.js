import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = props => {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    const filePicketRef = useRef()
    const {onInput, id} = props;

    useEffect(()=>{
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    },[file])

    const pickImageHandler = () => {
        filePicketRef.current.click()
    }

    const pickerHandle = event => {
        let pickedFile;
        let validate = isValid
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            validate = true;
            setIsValid(true)
        } else {
            validate = false;
            setIsValid(false)
        }
        onInput(id, pickedFile, validate);
    }

    return (
        <div>
            <input
                id={props.id}
                type="file"
                ref={filePicketRef}
                style={{display:'none'}}
                accept=".jpg,.png.jpeg"
                onChange={pickerHandle}
            />
            <div>
                {previewUrl ? <img src={previewUrl} alt="previous"/> : props.imageValue ? <img src={`http://localhost:5000/${props.imageValue}`} alt="previous"/> : <p>Please pick an image</p>}
                <button type='button' onClick={pickImageHandler}>
                    Pick Image
                </button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload;