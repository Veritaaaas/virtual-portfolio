import Navbar from "./Navbar"

import wallet from "../assets/wallet.png"

function Dashboard() {
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
                        <h1 className="font-bold text-[#453DE0] text-[40px] ml-5">10 000 USD</h1>
                    </div>
                </div>
                <div className="bg-white w-[300px] py-4 flex flex-col items-center gap-4 rounded-xl">
                    <h1 className="font-bold text-[#453DE0] text-[35px]">Deposit</h1>
                    <input type="text" className="rounded-lg w-[200px] h-[40px] bg-[#EBEEFB]" />
                    <button className="bg-[#453DE0] text-white w-[150px] h-[40px] rounded-lg mt-4">Deposit Now</button>
                </div>
                <div className="bg-white w-[300px] py-4 flex flex-col items-center gap-4 rounded-xl">
                    <h1 className="font-bold text-[#453DE0] text-[35px]">Withdraw</h1>
                    <input type="text" className="rounded-lg w-[200px] h-[40px] bg-[#EBEEFB]" />
                    <button className="bg-[#453DE0] text-white w-[150px] h-[40px] rounded-lg mt-4">Withdraw Now</button>
                </div>
            </div>
            <div className="px-16">
                <div className="bg-white">
                    <table className="w-full">
                        <tr className="text-center">
                            <th>Symbol</th>
                            <th>Company Name</th>
                            <th>Shares</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        <tr className="text-center">
                            <td>GOOGL</td>
                            <td>Google</td>
                            <td>10</td>
                            <td>10</td>
                            <td>100</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard