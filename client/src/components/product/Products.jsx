import axios from 'axios';
import { toast } from 'sonner';
import { RefreshCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import ProductsTable from './ProductsTable';
import { useNavigate } from 'react-router-dom';
import useGetAllProducts from '../../hooks/useGetAllProducts'
import { setSearchProductByText, setProducts } from '../../redux/productsSlice';

const Products = () => {
    useEffect(() => {
        document.title = "Products";
    }, []);
    useGetAllProducts();
    const [input, setInput] = useState("");
    const [spinning, setSpinning] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchProductByText(input));
    }, [input]);

    const refreshPage = async () => {
        setSpinning(true);
        try {
            // console.log("refresh clicked")
            const res = await axios.get(`${import.meta.env.VITE_PRODUCT_ENDPOINT}/get-product`, { withCredentials: true });
            // console.log(res.data);
            // console.log(res.data.success);
            if (res.data.success) {
                dispatch(setProducts(res.data.products));
                setTimeout(() => setSpinning(false), 300);
                toast.success(res.data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            setSpinning(false);
        }
    }
    return (
        <div className='min-w-60 mx-3'>
            <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                    <input type="text" className='p-2 outline-none border-2 border-gray-100' placeholder='Search Products' onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => navigate('/product/add-product')} className='bg-gray-700 text-white text-center p-2 capitalize cursor-pointer'>add products</button>

                    <button onClick={() => refreshPage()} className="flex items-center bg-gray-700 text-white text-center p-2 cursor-pointer">
                        <RefreshCcw size={20} className={`pe-1 cursor-pointer transition-transform ${spinning ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>
                <ProductsTable />
            </div>
        </div>
    )
}

export default Products