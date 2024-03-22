import { useState, useEffect } from "react";
import axios from 'axios';

// export const useGet = (url) => {
//     const [data, setData] = useState(null);
//     const [isPending, setIsPending] = useState(false);
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsPending(true);
//             try {
//                 const data = await axios.get(`http://localhost:8080/api/v1/${url}`);
//                 setIsPending(false);
//                 setData(data.data);
//             } catch (error) {
//                 console.error('error', error);
//                 setIsPending(false);
//             }
//         };
//         fetchData();
//     }, [url]);
//     return { data, isPending };
// };

export const useGet = () => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const fetchData = async (url) => {
        setIsPending(true);
        try {
            const result = await axios.get(`http://localhost:8080/api/v1/${url}`);
            setIsPending(false);
            setData(result.data);
        } catch (error) {
            console.error('error', error);
            setIsPending(false);
        }
    };
    return { data, isPending, fetchData };
};

export const usePost = () => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const postData = async (url, reqBody) => {
        setIsPending(true);
        try {
            const data = await axios.post(`http://localhost:8080/api/v1/${url}`, reqBody);
            setIsPending(false);
            setData(data.data);
        } catch (error) {
            console.error('error', error);
            setIsPending(false);
        }
    };
    return { data, isPending, postData };
};