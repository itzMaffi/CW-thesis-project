import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <div className="w-full bg-white h-14 pt-2  shadow-md fixed top-0 z-10 flex justify-around items-center">
      <img
        className="h-10 "
        src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/ig:avif/f:best/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg"
        alt="Codeworks"
        decoding="async"
        data-lazy-src="https://mliv6plxtvjb.i.optimole.com/w:auto/h:auto/q:mauto/ig:avif/f:best/https://codeworks.me/wp-content/uploads/2019/07/logo-horizontal-orange.svg"
        data-ll-status="loaded"
      ></img>

      <div>show the featers container</div>
    </div>
  );
};
