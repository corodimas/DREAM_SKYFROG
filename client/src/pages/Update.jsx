import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CUModal from '../components/CUModal'

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        editor: "",
        price: 0,
        author: "",
        subtitle: "",
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = () => {
        if (formData.name !== "" && formData.description !== "" && formData.editor !== "" && formData.price !== "" && formData.author && formData.subtitle !== "" && formData.image) {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            axios.put(import.meta.env.VITE_REACT_APP_API_URL +  `/books/${bookId}`, formDataToSend)
                .then((res) => {
                    console.log(res);
                    navigate("/book");
                })
                .catch(err => {
                    console.error("Error adding book:", err);
                })
        } else {
            alert("Please enter every input")
        }
    };

    return (
        <CUModal
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default Update;
