import React from 'react';
import { Link } from 'react-router-dom';

const CUModal = ({ formData, handleChange, handleSubmit }) => {
    return (
        <div className=''>
            <div className='w-2/3 h-fit my-auto mx-auto fixed z-50 inset-0 flex items-center justify-center focus:outline-none'>
                <div className='flex flex-col items-center bg-white w-full h-[650px] rounded-[50px] p-[40px]'>
                    <div className=' w-full flex justify-around '>
                        <div className='flex flex-col w-5/12'>
                            <div className='flex justify-center'>
                                <div className="relative">
                                    <input
                                        id="fileInput"
                                        type="file"
                                        name="image"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='w-full'>
                                    <div className='text-[24px] font-light'>Cover book</div>
                                    <div className="relative">
                                        {formData.image ? (
                                            <div className=' rounded-xl h-[230px] flex items-center  bg-[#f0eee2]'>
                                                <img
                                                    src={URL.createObjectURL(formData.image)}
                                                    alt="Selected Image"
                                                    className='w-[150px] h-[220px] mx-auto overflow-hidden'
                                                />
                                            </div>
                                        ) : (
                                            <div className=' rounded-xl h-[230px] flex items-center  bg-[#f0eee2]'>
                                                <svg width="500" height="126" viewBox="0 0 426 426" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M353.25 10.5V72.75M353.25 72.75V135M353.25 72.75H415.5M353.25 72.75H291"
                                                        stroke="black"
                                                        stroke-width="20"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M228.75 10.5H62.75C46.2403 10.5 30.4067 17.0585 18.7326 28.7326C7.05847 40.4067 0.5 56.2403 0.5 72.75V290.625C0.5 292.41 0.728251 294.153 1.164 295.812C0.724772 297.507 0.501666 299.25 0.5 301V363.25C0.5 379.76 7.05847 395.593 18.7326 407.267C30.4067 418.942 46.2403 425.5 62.75 425.5H353.25C369.76 425.5 385.593 418.942 397.267 407.267C408.942 395.593 415.5 379.76 415.5 363.25V218C415.498 216.25 415.275 214.507 414.836 212.812C415.275 211.118 415.498 209.375 415.5 207.625V197.25H374V197.582C284.837 200.466 220.45 221.942 175.215 252.009C192.355 258.089 211.528 266.742 230.327 278.071C259.356 295.501 288.863 319.986 308.721 352.419C310.143 354.743 311.094 357.325 311.518 360.016C311.943 362.708 311.833 365.457 311.195 368.107C310.558 370.756 309.404 373.254 307.801 375.457C306.198 377.661 304.177 379.527 301.852 380.95C299.528 382.372 296.946 383.323 294.254 383.747C291.563 384.172 288.814 384.062 286.164 383.425C283.515 382.787 281.017 381.634 278.813 380.03C276.61 378.427 274.743 376.406 273.321 374.081C258.049 349.119 234.352 328.888 208.954 313.637C183.598 298.406 157.806 288.903 139.919 284.753C114.723 278.999 88.9235 276.309 63.082 276.743H62.6255C55.4045 276.847 48.5155 277.158 42 277.677V72.75C42 67.2468 44.1862 61.9689 48.0775 58.0775C51.9689 54.1862 57.2468 52 62.75 52H228.75V10.5ZM135.375 93.5C124.063 93.5846 113.046 97.117 103.794 103.626C91.966 112.133 83.5 126.161 83.5 145.375C83.5 164.589 91.966 178.596 103.794 187.103C113.04 193.627 124.059 197.167 135.375 197.25C143.882 197.25 156.187 194.864 166.957 187.103C178.784 178.596 187.25 164.589 187.25 145.375C187.25 126.161 178.784 112.154 166.957 103.626C157.708 97.1098 146.688 93.5766 135.375 93.5Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                        <input
                                            id="fileInput"
                                            type="file"
                                            name="image"
                                            className="absolute inset-0 opacity-0 cursor-pointer "
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col w-5/12'>
                            <div className=''>
                                <div className='flex flex-col'>
                                    <div className='text-[24px] font-light'>Name</div>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        placeholder='Enter name'
                                        name='name'
                                        className='bg-[#f0eee2] rounded-xl px-3 py-2 placeholder-zinc-700 focus:outline-none'
                                    />
                                    <div className='text-[24px] font-light mt-3'>Author</div>

                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        placeholder='Enter author'
                                        name='author'
                                        className='bg-[#f0eee2] rounded-xl px-3 py-2 placeholder-zinc-700 focus:outline-none'
                                    />
                                    <div className='text-[24px] font-light mt-3'>Subtitle</div>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        placeholder='Enter subtitle'
                                        name='subtitle'
                                        className='bg-[#f0eee2] rounded-xl px-3 py-2 placeholder-zinc-700 focus:outline-none'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex justify-around mt-10'>
                        <div className='w-5/12'>
                            <div className='text-[24px] font-light'>Description</div>
                            <textarea
                                onChange={handleChange}
                                type="textarea"
                                placeholder='Enter description'
                                name='description'
                                className='bg-[#f0eee2] rounded-xl px-3 py-3 w-full  placeholder-zinc-700 focus:outline-none h-[140px]'
                            />
                            <button className='mt-10 text-[24px] text-zinc-500 hover:underline'><Link to='/book'>Back</Link></button>
                        </div>
                        <div className=' w-5/12 flex flex-col'>
                            <div className='text-[24px] font-light'>Editor</div>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder='Enter editor'
                                name='editor'
                                className='bg-[#f0eee2] rounded-xl px-3 py-2 placeholder-zinc-700 focus:outline-none'
                            />
                            <div className='text-[24px] font-light mt-3'>Price</div>
                            <input
                                onChange={handleChange}
                                type="number"
                                placeholder='$'
                                name='price'
                                className='bg-[#f0eee2] rounded-xl px-3 py-2 placeholder-zinc-700 focus:outline-none'
                            />
                            <button
                                onClick={handleSubmit}
                                className='bg-black text-white rounded-xl mt-9 px-3 py-3 text-[20px] hover:scale-105 duration-150 shadow-lg'>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CUModal;
