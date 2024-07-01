import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Navbar() {

  const Logout = () => {
    localStorage.removeItem('token');
    console.log('Logged out');
    // Redirect to login or do other cleanup tasks here
  };

  return (
    <nav className='bg-white shadow-2xl p-4 px-10 flex justify-between'>
      <div className='flex items-center gap-6'>
        <img src={Logo} alt="Logo" className='aspect-square h-[100px]'/>
        <h1 className='text-[40px] text-[#453DE0] font-bold'>Marketify</h1>
      </div>
      <div className='flex gap-8 items-center'>
        <h1 className='text-[#453DE0] font-bold text-[30px] border-[#453DE0] cursor-pointer hoverable'>
          <Link to="/dashboard">Portfolio</Link>
        </h1>
        <h1 className='text-[#453DE0] font-bold text-[30px] cursor-pointer hoverable'>
          <Link to="/trade">Trade</Link>
        </h1>
        <h1 className='text-[#453DE0] font-bold text-[30px] cursor-pointer hoverable'>
          <Link to="/history">History</Link>
        </h1>
        <Link to={"/"}>
          <h1 className='text-[#453DE0] font-bold text-[30px] cursor-pointer hoverable' onClick={Logout}> Logout</h1>
        </Link>
      </div> 
    </nav>
  );
}

export default Navbar;