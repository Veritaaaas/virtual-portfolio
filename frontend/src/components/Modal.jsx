import { useState } from "react";
import { FaTimes } from 'react-icons/fa';

function Modal({ type, symbol, updateIsBuying, updateIsSelling }) {

    const [quantity, setQuantity] = useState();

    const handleSell = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://127.0.0.1:5000/sell', { // Fixed URL
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symbol,
                quantity
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Sold successfully");
        } else {
            alert(data.error);
        }
    };

    const handleBuy = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://127.0.0.1:5000/buy', { // Assuming this should be /buy
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symbol,
                quantity
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Bought successfully");
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-[400px] py-4 flex flex-col items-center gap-4 rounded-xl">
                <div className="flex justify-end w-full px-6">
                    <FaTimes className="text-[#453DE0] text-[25px] m-0 p-0 cursor-pointer" onClick={() => type === "Sell" ? updateIsSelling(false) : updateIsBuying(false)}/>
                </div>
                <h1 className="font-bold text-[#453DE0] text-[35px] m-0 p-0 cursor-pointer">{type}</h1>
                <h1 className="font-bold text-[#453DE0] text-[35px]">{symbol}</h1>
                <input type="number" className="rounded-lg w-[200px] h-[40px] bg-[#EBEEFB] p-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <button className="bg-[#453DE0] text-white w-[150px] h-[40px] rounded-lg mt-4" onClick={type === "Sell" ? handleSell : handleBuy}>{type} Now</button>
            </div>
        </div>
    );
}

export default Modal;