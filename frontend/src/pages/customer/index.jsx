import { useEffect, useState } from "react";
import { useGet } from "./../../hooks/useFetch";
import { Button } from '@mui/material';
const Customer = () => {
    // useGet is a custom hook
    const { data, fetchData } = useGet();
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        if (!customers) {
            fetchData('customers')
        }
        if (data) {
            setCustomers(data.data)
        }
    }, [data])
    
    return (
        <>
            <h1>Names of the customers</h1>
            {(customers || []).map((customer) => {
                return (
                    <>
                        <p key={customer.id}>{customer.first_name}</p>
                        <Button variant="contained">Request More</Button>
                    </>
                )
            })}
        </>
    )
}

export default Customer