import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <div className="w-full bg-white h-14 pt-2  shadow-md fixed top-0 z-10 ">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <img
          className="h-10 "
          src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/ig:avif/f:best/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg"
          alt="Codeworks"
          decoding="async"
          data-lazy-src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/ig:avif/f:best/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg"
          data-ll-status="loaded"
        ></img>
        {/*    TODO: if there will be  a sidebar, this will be a button to open the sidebar
        <div>open the sidebar to set widgets</div> */}
      </div>
    </div>
  );
};
