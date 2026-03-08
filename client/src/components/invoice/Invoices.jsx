import axios from 'axios';
import { toast } from 'sonner';
import { RefreshCcw } from 'lucide-react'
import { useDispatch } from 'react-redux';
import InvoiceTable from './InvoiceTable';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import useGetAllInvoices from '../../hooks/useGetAllInvoices';
import { setSearchInvoiceByText, setInvoices  } from '../../redux/invoicesSlice';

const Invoices = () => {
    useEffect(() => {
        document.title = "Invoices";
    }, []);
    useGetAllInvoices();
    const [input, setInput] = useState("");
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchInvoiceByText(input));
    }, [input]);

    const refreshPage = async () => {
        setSpinning(true);
        try {
            // console.log("refresh clicked");
            // console.log(INVOICE_ENDPOINT, 'invoice endpoint');
            const res = await axios.get(`${import.meta.env.VITE_INVOICE_ENDPOINT}/get-invoice`, { withCredentials: true });
            // console.log(res.data);
            // console.log(res.data.success);
            if (res.data.success) {
                dispatch(setInvoices(res.data.invoices));
                setTimeout(() => setSpinning(false), 300);
                toast.success(res?.data?.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            setSpinning(false);
        }
    };


    return (
        <div className='min-w-60 mx-3'>
            <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                    <input type="text" className='p-2 outline-none border-2 border-gray-100' placeholder='Search By Customer' onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => navigate('/invoice/add-invoice')} className='bg-gray-700 text-white text-center p-2 capitalize cursor-pointer'>add invoice</button>

                    <button onClick={() => refreshPage()} className="flex items-center bg-gray-700 text-white text-center p-2 cursor-pointer">
                        <RefreshCcw size={20} className={`pe-1 cursor-pointer transition-transform ${spinning ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>
                <InvoiceTable />
            </div>
        </div>
    )
}

export default Invoices