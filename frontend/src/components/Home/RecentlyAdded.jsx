import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from '../Bookcard/Bookcard';
 

const RecentlyAdded = () => {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/users/get-recent-book");
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetch();
    }, []);

    return (
        <div className='mt-8 px-4'>
            <h4 className='text-2xl font-semibold text-yellow-100'>Recently Added books</h4>
            <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {Data.length > 0 ? (
                    Data.map((item, index) => (
                        <div key={index}>
                            <Bookcard data={item} />
                        </div>
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>
        </div>
    );
};

export default RecentlyAdded;
