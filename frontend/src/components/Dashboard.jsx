import { useEffect, useState } from "react"

import Navbar from "./Navbar"
import wallet from "../assets/wallet.png"
import Modal from "./Modal";
import '../index.css'

function Dashboard() {

    const [portfolio, setPortfolio] = useState([]);
    const [cash, setCash] = useState(0);
    const [deposit, setDeposit] = useState()
    const [withdraw, setWithdraw] = useState()
    const [isSelling, setIsSelling] = useState(false)
    const [currentSymbol, setCurrentSymbol] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token'); 
    
        fetch('http://127.0.0.1:5000/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCash(data.cash);
            setPortfolio(data.stocks);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const handleDeposit = async(event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const response = await fetch('http://127.0.0.1:5000/deposit', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deposit
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            setCash(data.cash);
        } 
        else {
            alert("Invalid deposit amount");
        }
    }

    const handleWithdraw = async(event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const response = await fetch('http://127.0.0.1:5000/withdraw', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                withdraw
            })
        });

        const data = await response.json();

        if (response.ok) {
            setCash(data.cash);
        }
        else {
            alert("Invalid withdraw amount");
        }
    }

    const handleSellClick = (symbol) => {
        setIsSelling(true);
        setCurrentSymbol(symbol);
    }

    if (isLoading) {
        return (
            <div className="min-h-screen min-w-full flex justify-center items-center">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <div className="py-8 px-16 flex justify-between">
                <div className="bg-white pb-4 pr-4 justify-between w-[700px] rounded-xl ">
                    <div className="flex items-center">
                        <img src={wallet} alt="wallet" />
                        <h1 className="font-bold text-[#453DE0] text-[35px]">My Wallet</h1>
                    </div>
                    <div>
                        <h1 className="font-bold text-[#453DE0] text-[40px] ml-5">{cash} USD</h1>
                    </div>
                </div>
                <div className="bg-white w-[300px] py-4 flex flex-col items-center gap-4 rounded-xl">
                    <h1 className="font-bold text-[#453DE0] text-[35px]">Deposit</h1>
                    <input type="text" className="rounded-lg w-[200px] h-[40px] bg-[#EBEEFB] p-2" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
                    <button className="bg-[#453DE0] text-white w-[150px] h-[40px] rounded-lg mt-4" onClick={handleDeposit}>Deposit Now</button>
                </div>
                <div className="bg-white w-[300px] py-4 flex flex-col items-center gap-4 rounded-xl">
                    <h1 className="font-bold text-[#453DE0] text-[35px]">Withdraw</h1>
                    <input type="text" className="rounded-lg w-[200px] h-[40px] bg-[#EBEEFB] p-2" value={withdraw} onChange={(e) => setWithdraw(e.target.value)}/>
                    <button className="bg-[#453DE0] text-white w-[150px] h-[40px] rounded-lg mt-4" onClick={handleWithdraw}>Withdraw Now</button>
                </div>
            </div>
            <div className="px-16">
                <div className="bg-white min-h-[450px]">
                    <table className="w-full text-[20px] text-[#A9ACBB] font-bold">
                        <tr className="text-center text-[#453DE0]">
                            <th>Symbol</th>
                            <th>Company Name</th>
                            <th>Shares</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                        {portfolio.map((stock, index) => (
                            <tr key={index} className="text-center">
                                <td className="py-2">{stock.symbol}</td>
                                <td className="py-2">{stock.company_name}</td>
                                <td className="py-2">{stock.shares}</td>
                                <td className="py-2">{stock.current_price}</td>
                                <td className="py-2">{stock.total}</td>
                                <td className="py-2"><button className="bg-[#453DE0] text-white w-[100px] h-[30px] rounded-lg" onClick={() => handleSellClick(stock.symbol)}>Sell</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
            {isSelling && <Modal type="Sell" symbol={currentSymbol} updateIsSelling={setIsSelling} />}
        </div>
    )
}

export default Dashboard