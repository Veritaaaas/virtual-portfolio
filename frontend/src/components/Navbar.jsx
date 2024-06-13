import Logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className='bg-white shadow-2xl p-4 px-10 flex justify-between'>
      <div className='flex items-center gap-6'>
        <img src={Logo} alt="Logo" className='aspect-square h-[100px]'/>
        <h1 className='text-[40px] text-[#453DE0] font-bold'>Marketify</h1>
      </div>
      <div className='flex gap-8 items-center'>
        <h1 className='text-[#453DE0] font-bold text-[30px]'>Portfolio</h1>
        <h1 className='text-[#453DE0] font-bold text-[30px]'>Trade</h1>
        <h1 className='text-[#453DE0] font-bold text-[30px]'>History</h1>
        <h1 className='text-[#453DE0] font-bold text-[30px]'>Logout</h1>
      </div>
    </nav>
  );
}

export default Navbar;