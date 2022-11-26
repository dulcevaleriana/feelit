import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export default function UploadButtons() {
    const cardFile = (<div>ADD FILE WORK</div>)
    let arrayFileUpload = []

    const addPreviewFileUpload = () => {
        arrayFileUpload.push({
            cardFileElement: cardFile
        })
    }
    console.log("arrayFileUpload",arrayFileUpload)
    return (
        <Stack direction="row" alignItems="center" spacing={2} className="class-UploadButtons">
            <div>
                {arrayFileUpload.map((index, key)=>(
                    <div key={key}>{index.cardFileElement}</div>
                ))}
            </div>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={addPreviewFileUpload}>
                <input hidden accept="image/*" type="file" />
                <PhotoCamera /> <p></p>
            </IconButton>
        </Stack>
    );
}