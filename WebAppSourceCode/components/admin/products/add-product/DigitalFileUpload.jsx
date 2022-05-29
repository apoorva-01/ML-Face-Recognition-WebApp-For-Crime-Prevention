import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
export default function DigitalFileUpload({ document, setDocument }) {

    const [createObjectURL, setCreateObjectURL] = useState(null);



    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setDocument(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };


    const documentUploadToServer = async (event) => {
        const body = new FormData();
        body.append("file", document);
        const response = await fetch("/api/admin/document-upload", {
            method: "POST",
            body
        });
    };



    // useEffect(() => {
    //     const dropArea = document.querySelector(".drop_box");
    //       const   button = dropArea.querySelector("button");
    //        const  dragText = dropArea.querySelector("header");
    //       const   input = dropArea.querySelector("input");
    //     let file;
    //     var filename;

    //     button.onclick = () => {
    //         input.click();
    //     };

    //     input.addEventListener("change", function (e) {
    //         uploadToClient()
    //         var fileName = e.target.files[0].name;
    //         let filedata = `
    //       <h4>${fileName}</h4>
    //         `;
    //         dropArea.innerHTML = filedata;
    //     });

    // }, [])








    return (
        <>

            <Typography sx={{ mt: 3 }} component="p">You can upload a single PDF or compressed ZIP file, maximum 500MB.</Typography>
            <div style={{ marginTop: '1rem' }} className="upload-container">
                <div className="card">
                    <Typography component='h3'>Upload Files</Typography>
                    <div className="drop_box">
                        <header>
                            <Typography component='h4'>Select File here</Typography>
                        </header>
                        <Typography component='p'>Files Supported: ZIP, PDF, TEXT, DOC , DOCX</Typography>
                        {/* <input type="file"  hidden accept=".doc,.docx,.pdf,.zip" id="fileID" style={{ display: "none" }} /> */}
                        {/* <Button variant="outlined">Choose File</Button> */}
                        <input type="file" onChange={uploadToClient} id="files" name="files" multiple/>
                        <Button
                            variant="contained"
                            component="label"
                            onClick={documentUploadToServer}
                        >
                            Upload File
                          
                        </Button>

                    </div>
                </div>
            </div>
        </>
    )
}
