import React, {useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";


export default function AdminImg({img, isLocalImages, setGallery, id = -1}) {

    const [hide, setHide] = useState(false);

    const deleteImage = () => {
        if (!isLocalImages && confirm(`Estás apunto de borrar la imagen ${img} estás seguro?`)) {
            axios.delete(`/admin/gallery_image_delete/${id}`)
                .then(res => {
                    setHide(true);
                })
                .catch(e => console.log('FALLO EN DELETE', e));
        }
    }

    return (
        <div style={{display: hide ? "none" : ""}}>
            <CloseIcon style={{display: isLocalImages ? "none" : ""}} className="closeButton" onClick={deleteImage}/>
            <img className="modalImage"  src={img} alt={"imagen - " + img}/>
        </div>
    );
}

