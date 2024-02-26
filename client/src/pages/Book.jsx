import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const Book = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const fetchAllBooks = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_REACT_APP_API_URL +  `/books`);
            setBooks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllBooks();
    }, []);
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(import.meta.env.VITE_REACT_APP_API_URL +  `/books/${id}` );
            const updatedBooks = books.filter(book => book.id !== id);
            setBooks(updatedBooks);
            setIsModalOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleImageClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [borrower, setBorrower] = useState('Free');

    const handleUpdate = async (id, borrower) => {
        try {
            const response = await axios.put(import.meta.env.VITE_REACT_APP_API_URL +  `/books/${id}/reserve`, { borrower: borrower });
            await fetchAllBooks()
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='h-screen'>
            <div className='mx-auto w-[1200px]'>
                <div className='flex flex-col'>
                    <Banner />
                    <div className='mx-auto w-[1500px]'>
                        <div className='flex justify-between mt-2 w-[1200px]'>
                            <div className="relative w-11/12 mx-5">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-7 h-5 text-black " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full p-4 ps-10 text-[20px] text-gray-900 border-2 border-black rounded-full bg-transparent placeholder-zinc-700 focus:outline-none"
                                    placeholder="Search by book name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className='text-white text-[16px] bg-black w-1/12 rounded-full mr-5 hover:scale-110 hover:duration-150 shadow-xl'>
                                <Link to='/add'>Add +</Link>
                            </button>
                        </div>
                        <div className='grid grid-cols-4 mt-12 w-[1200px]'>
                            {filteredBooks.map((book) => (
                                <div key={book.id} className='w-[240px] mx-auto'>
                                    <div>
                                        <div className='flex flex-col mb-10'>
                                            <img
                                                src={import.meta.env.VITE_REACT_APP_API_URL + `/images/` + book.image}
                                                className='hover:scale-110 duration-150 w-full h-[350px] object-cover'
                                                style={{ boxShadow: '-12px 15px 10px 2px #545353' }}
                                                onClick={() => handleImageClick(book)}
                                            />
                                            <div className='text-[21px] font-extralight w-[240px] h-[70px] mt-7 text-ellipsis overflow-hidden ...'>
                                                <div>{book.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className='w-2/3 h-fit my-auto mx-auto z-50 fixed inset-0 flex items-center justify-center focus:outline-none'
            >
                {selectedBook && (
                    <div className='flex flex-col items-center bg-[#f0eee2] w-[1000px] h-[550px] rounded-[70px] p-[50px] relative'>
                        <button
                            className='text-[40px] absolute top-3 left-10 m-4 hover:scale-125 hover:duration-150'
                            onClick={closeModal}
                        >
                            X
                        </button>

                        <div className=' w-full flex justify-between'>

                            <div className=' w-1/2 flex justify-center'>
                                <img
                                    src={import.meta.env.VITE_REACT_APP_API_URL + `/images/` + selectedBook.image}
                                    className='w-[145px] h-[210px] object-cover'
                                    style={{ boxShadow: '-12px 15px 10px 2px #545353' }}
                                    onClick={() => handleImageClick(selectedBook)}
                                />
                            </div>
                            <div className='flex flex-col w-1/2'>
                                <div className=''>
                                    <div className=''>
                                        <div className='text-[36px] text-ellipsis overflow-hidden w-[1/2] h-[100px]'><div>{selectedBook.name}</div></div>
                                        <div className='text-[21px] font-normal mt-5 truncate w-[1/2] h-[70px]'><div>{selectedBook.author}</div></div>
                                        <div className='text-[16px] font-light  truncate'>{selectedBook.subtitle}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-between mt-7'>
                            <div className=' w-1/2'>
                                <div className='text-[21px] font-normal '>Description</div>
                                <div className='text-[16px] font-light mt-3 overflow-auto h-[110px] '>{selectedBook.description}</div>
                                <div>
                                    {selectedBook.borrow === 'Free' ? (
                                        <div className='mt-2'>
                                            <div className='flex'>
                                                <div className='text-[21px] font-light'>Status:</div>
                                                <div className='ml-2 text-[21px] font-semibold text-[#62c637]'>Free</div>
                                            </div>
                                            <input onChange={(e) => setBorrower(e.target.value)} type="text" name="" id="" placeholder='Enter name of reservation' className='border border-black bg-transparent rounded-full w-8/12 py-2 px-3 focus:outline-none' />
                                            <button
                                                onClick={() => { handleUpdate(selectedBook.id, borrower); closeModal(); }}
                                                className='text-white bg-[#488f56] ml-2 px-4 py-2 rounded-full  hover:scale-110 hover:duration-150 shadow-xl'>
                                                Reserve
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='mt-10'>
                                            <div className='flex'>
                                                <div className='text-[21px] font-light'>Reserved by:</div>
                                                <div className='ml-2 text-[21px] font-semibold text-[#e38d50]'>{selectedBook.borrow}</div>
                                                <button
                                                    className='bg-[#65d8e1] px-8 py-2 rounded-full shadow-lg text-white ml-3'
                                                    onClick={() => { handleUpdate(selectedBook.id, 'Free'); closeModal(); }} >
                                                    Return
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className=' w-5/12'>
                                <div className='text-[21px] font-normal'>Editor</div>
                                <div className='text-[16px] font-light mt-3 text-ellipsis overflow-hidden h-[50px]'>{selectedBook.editor}</div>
                                <div className='text-[21px] font-normal mt-5 '>Price</div>
                                <div className='text-[16px] font-light mt-3'>{selectedBook.price} $</div>
                                <div className='flex flex-row mt-3 justify-end'>
                                    <button className='text-white bg-[#d5a166] rounded-full w-fit px-9 py-2 text-[16px] hover:bg-black hover:scale-110 hover:duration-150 shadow-xl'>
                                        <Link to={`/update/${selectedBook.id}`}>Edit</Link>
                                    </button>
                                    <button className='text-white bg-[#e16868] rounded-full w-fit px-6 py-2 ml-3 text-[16px] hover:bg-black hover:scale-110 hover:duration-150 shadow-xl'
                                        onClick={() => handleDelete(selectedBook.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Book;

