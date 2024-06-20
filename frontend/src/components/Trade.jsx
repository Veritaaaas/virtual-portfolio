import { useEffect, useState } from "react"

import Navbar from "./Navbar"

function Trade() {

    const [symbol, setSymbol] = useState()

    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <div className="py-8 px-16 flex gap-[300px]">
                <div className="bg-white w-[400px] py-4 flex flex-col items-center gap-4 rounded-xl">
                    <h1 className="font-bold text-[#453DE0] text-[35px]">Query</h1>
                    <input type="text" className="rounded-lg w-[200px] h-[40px] bg-[#EBEEFB] p-2" value={symbol} placeholder="TSLA" onChange={(e) => setSymbol(e.target.value)} />
                    <button className="bg-[#453DE0] text-white w-[150px] h-[40px] rounded-lg mt-4">Lookup Symbol</button>
                </div>
                <div className="bg-white w-[1000px] rounded-xl px-8 py-4 flex flex-col gap-6">
                    <h1 className="text-[#453DE0] text-[40px] font-bold">Tesla Inc</h1>
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
                            <td>TSLA</td>
                            <td>2.24</td>
                            <td>1,200</td>
                            <td>0.74</td>
                            <td>1.14B</td>
                            <td>700.00</td>
                            <td><button className="bg-[#453DE0] text-white w-[100px] h-[30px] rounded-lg">Buy</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Trade;