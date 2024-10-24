import React, { useEffect, useState } from 'react';
import BasicTableRequestedItems from '../../../components/vendor/BasicTableRequestedItems';
import axios from 'axios';
import SideNav from '../../../components/vendor/sideNav/Sidebar'

const RequestedItems = () => {
    const [stocks, setStocks] = useState([]);
    const [headers, setHeaders] = useState([]);
   
    useEffect(() => {
        setHeaders(["ID", "Product Id", "Product Name", "Quantity", "Request Status" , "Action"]);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/request-vendor').then((res) => {
            console.log(res.data);
            setStocks(res.data);
        }).catch(err => {
            console.error(err);
        });
    }, []);


    return (
        <div>
            <SideNav />
            <div className='stock-body'>  
                <BasicTableRequestedItems
                    headers={headers}
                    rows={stocks}
                />
            </div>
        </div>
    )
}

export default RequestedItems;