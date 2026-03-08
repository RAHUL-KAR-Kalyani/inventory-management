import axios from 'axios';
import { toast } from 'sonner';
import { RefreshCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import CustomerTable from './CustomerTable';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import useGetAllCustmers from '../../hooks/useGetAllCustomers'
import { setSearchCustomerByText, setCustomers } from '../../redux/customersSlice';

const Customers = () => {
    useEffect(() => {
        document.title = "Customers";
    }, []);

    useGetAllCustmers();
    const [input, setInput] = useState("");
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCustomerByText(input));
    }, [input]);

    const refreshPage = async () => {
        setSpinning(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_CUSTOMER_ENDPOINT}/get-customer`, { withCredentials: true });
            // console.log(res.data);
            // console.log(res.data.success);
            if (res.data.success) {
                dispatch(setCustomers(res.data.customers));
                setTimeout(() => setSpinning(false), 300);
                toast.success(res.data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.res.data.message);
        } finally {
            setSpinning(false);
        }
    }

    return (
        <div className='min-w-60 mx-3'>
            <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                    <input type="text" className='p-2 outline-none border-2 border-gray-100' placeholder='Search Customers' onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => navigate('/customer/add-customer')} className='bg-gray-700 text-white text-center p-2 capitalize cursor-pointer'>add customer</button>

                    <button onClick={() => refreshPage()} className="flex items-center bg-gray-700 text-white text-center p-2 cursor-pointer">
                        {/* <RefreshCcw size={20} className={`cursor-pointer transition-transform ${spinning ? "animate-spin" : ""}`} /> */}
                        <RefreshCcw size={20} className={`pe-1 cursor-pointer transition-transform ${spinning ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>
                <CustomerTable />
            </div>
        </div>
    )
}

export default Customers