import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import Menu from '../Menu/Menu';
import logo from '../../assets/LOGO.png';
import './Animation.css';

export const Navbar: FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  function handleMenuClick() {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    const handleGlobalClick = (event: KeyboardEvent | MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element === null || undefined) return;

      const clickedOutsideSidebarMenu = !element.closest('.sidebar-menu');
      const clickedOutsidePinElement = !element.closest('.pin-component');
      const clickedOutsideFoldingButton = !element.closest('.folding-button');
      const clickedOutsideArrowButton = !element.closest('.arrow-button');

      if (
        showMenu &&
        clickedOutsideSidebarMenu &&
        clickedOutsidePinElement &&
        clickedOutsideFoldingButton &&
        clickedOutsideArrowButton
      ) {
        setShowMenu(false);
      }
    };

    const handleEscapeKeyPress = (event: { key: string }) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleGlobalClick);
    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [showMenu]);

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

        <div>
          {isAuthenticated && (
            <>
              <div
                onClick={handleMenuClick}
                className=" folding-button cursor-pointer w-[50px] h-full p-4 -mt-1 rounded-md text-cp-dark-blue bg-cp-light-blue hover:bg-cp-dark-blue hover:text-white flex justify-center"
              >
                {showMenu ? <IoIosClose></IoIosClose> : <IoIosMenu></IoIosMenu>}
              </div>
            </>
          )}
          <div className="animation">
            <div className={!showMenu ? 'menu enter' : 'menu exit'}>
              <div className="menu">
                <Menu></Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
