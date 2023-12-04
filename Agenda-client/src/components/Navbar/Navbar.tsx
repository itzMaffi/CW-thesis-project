import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import Menu from '../Menu/Menu';
import logo from '../../assets/LOGO.png';

export const Navbar: FC = () => {

  const [showMenu, setShowMenu] = useState(false);
  
  function handleMenuClick()
  {
    setShowMenu(!showMenu)
  }

  return (
    <div className="w-full bg-white h-14 pt-2  shadow-md sticky top-0 z-10 ">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <Link to={'/'}>
          <img
            className="h-10 "
            src={logo}
            alt="code play logo"
            decoding="async"
            data-lazy-src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/ig:avif/f:best/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg"
            data-ll-status="loaded"
          ></img>
        </Link>
        <div onClick={handleMenuClick} className='cursor-pointer w-[50px] h-full hover:bg-black hover:text-white flex justify-center'>
          <IoIosMenu></IoIosMenu>
        </div>
        {showMenu && <Menu></Menu>}
        {/*    TODO: if there will be  a sidebar, this will be a button to open the sidebar
        <div>open the sidebar to set widgets</div> */}
      </div>
    </div>
  );
};
