import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CUModal from '../components/CUModal';

const Add = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        editor: '',
        price: '',
        author: '',
        subtitle: '',
        image: null,
        borrow: 'Free'
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = () => {
        if (formData.name !== "" && formData.description !== "" && formData.editor !== "" && formData.price !== "" && formData.author && formData.subtitle !== "" && formData.image) {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            axios
                .post(import.meta.env.VITE_REACT_APP_API_URL + `/books`, formDataToSend)
                .then((res) => {
                    console.log(res);
                    navigate('/book');
                })
                .catch((err) => {
                    console.error('Error adding book:', err);
                });
        } else {
            alert("Please enter every input")
        }
    };

    return <CUModal formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default Add;


