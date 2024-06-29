import { useEffect, useState } from "react"

import Navbar from "./Navbar"
import Modal from "./Modal"

function Trade() {

    const [symbol, setSymbol] = useState()
    const [suggestions, setSuggestions] = useState([])
    const [lookupData, setLookupData] = useState()
    const [isBuying, setIsBuying] = useState(false)
    const [currentSymbol, setCurrentSymbol] = useState()

    const updateIsBuying = (newIsBuying) => {
        setIsBuying(newIsBuying);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:5000/trade', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setSuggestions(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);


    const handleLookup = async(event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const response = await fetch('http://127.0.0.1:5000/look', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symbol
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            setLookupData(data);
        }
        else {
            alert(data.error);
        }
    }

    const handleBuyClick = (symbol) => {
        setIsBuying(true);
        setCurrentSymbol(symbol); 
    };

    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <div className="py-8 px-16 flex gap-[300px]">
                <div className="bg-white w-[400px] py-4 flex flex-col items-center gap-4 rounded-xl">
                    <h1 className="font-bold text-[#453DE0] text-[35px]">Query</h1>
                    <input type="text" className="rounded-lg w-[200px] h-[40px] bg-[#EBEEFB] p-2" value={symbol} placeholder="TSLA" onChange={(e) => setSymbol(e.target.value)} />
                    <button className="bg-[#453DE0] text-white w-[150px] h-[40px] rounded-lg mt-4" onClick={handleLookup}>Lookup Symbol</button>
                </div>
                <div className="bg-white w-[1000px] rounded-xl px-8 py-4 flex flex-col gap-6">
                    <h1 className="text-[#453DE0] text-[40px] font-bold">{lookupData?.name}</h1>
                    <table className="w-full text-[20px] text-[#A9ACBB]">
                        <tr className="text-center text-[#453DE0]">
                            <th>Symbol</th>
                            <th>EPS</th>
                            <th>PE Ratio</th>
                            <th>Revenue Growth</th>
                            <th>Net Income</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        <tr className="text-center font-bold">
                            <td>{lookupData?.symbol}</td>
                            <td>{lookupData?.eps}</td>
                            <td>{lookupData?.pe_ratio}</td>
                            <td>{lookupData?.revenue_growth}</td>
                            <td>{lookupData?.net_income}</td>
                            <td>{lookupData?.price}</td>
                            {lookupData &&
                                <td><button className="bg-[#453DE0] text-white w-[100px] h-[30px] rounded-lg" onClick={() => handleBuyClick(lookupData?.symbol)}>Buy</button></td>
                            }
                        </tr>
                    </table>
                </div>
            </div>
            <div className="px-16">
                <div className="bg-white min-h-[450px] py-6">
                    <table className="w-full text-[20px] text-[#A9ACBB] font-bold">
                        <tr className="text-center text-[#453DE0]">
                            <th>Symbol</th>
                            <th>EPS</th>
                            <th>PE Ratio</th>
                            <th>Revenue Growth</th>
                            <th>Net Income</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        <tbody className="divide-y-0">
                            {suggestions.map((stock, index) => (
                                <tr key={index} className="text-center">
                                    <td className="py-2">{stock?.symbol}</td>
                                    <td className="py-2">{stock?.eps}</td>
                                    <td className="py-2">{stock?.pe_ratio}</td>
                                    <td className="py-2">{stock?.revenue_growth}</td>
                                    <td className="py-2">{stock?.net_income}</td>
                                    <td className="py-2">{stock?.price}</td>
                                    <td className="py-2"><button className="bg-[#453DE0] text-white w-[100px] h-[30px] rounded-lg" onClick={() => handleBuyClick(stock.symbol)}>Buy</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isBuying && <Modal 
            type="Buy"
            symbol={currentSymbol} 
            updateIsBuying={updateIsBuying} />}
        </div>
    )
}

export default Trade;