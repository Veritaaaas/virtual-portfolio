import { useState } from "react";
import { FaTimes } from 'react-icons/fa';

function Modal({ type, symbol, price, updateIsBuying }) {

    const [quantity, setQuantity] = useState();

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-[400px] py-4 flex flex-col items-center gap-4 rounded-xl">
            <div className="flex justify-end w-full px-6">
                <FaTimes className="text-[#453DE0] text-[25px] m-0 p-0 cursor-pointer" onClick={() => updateIsBuying(false)}/>
            </div>
            <h1 className="font-bold text-[#453DE0] text-[35px] m-0 p-0 cursor-pointer">{type}</h1>
            <h1 className="font-bold text-[#453DE0] text-[35px]">{symbol}</h1>
            <input type="number" className="rounded-lg w-[200px] h-[40px] bg-[#EBEEFB] p-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button className="bg-[#453DE0] text-white w-[150px] h-[40px] rounded-lg mt-4">{type} Now</button>
        </div>
    </div>
);
}

export default Modal;