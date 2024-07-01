import { useState, useEffect } from "react";

import Navbar from "./Navbar";

function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:5000/history', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setHistory(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="mt-16 px-16">
                <div className="bg-white min-h-[450px] p-6">
                    <table className="w-full text-[20px] text-[#A9ACBB] font-bold">
                        <tr className="text-center text-[#453DE0] border-b-4">
                            <th className="p-4">Date</th>
                            <th className="p-4">Symbol</th>
                            <th className="p-4">Shares</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Transaction</th>
                        </tr>
                        {history.map((stock, index) => (
                            <tr key={index} className="text-center border-b-2">
                                <td className="p-4">{stock.date}</td>
                                <td className="p-4">{stock.symbol}</td>
                                <td className="p-4">{stock.shares}</td>
                                <td className="p-4">{stock.price}</td>
                                <td className="p-4">{stock.total}</td>
                                <td className="p-4">{stock.type}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}


export default History;