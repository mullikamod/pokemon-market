import { useEffect, useState } from "react";
import CartButton from "../Cart/CartButton";
import SearchBox from "../Input/SearchBox";

type HeaderProps = {
  setOpenCart: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ setOpenCart }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  return (
    <header className="flex flex-col mb-6 border-b border-white/8 pb-4 gap-4">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-semibold">Pokemon market</h1>
        <div className="flex items-end justify-end space-x-4">
          {!isMobile && <SearchBox />}
          <div className="w-content">
            <CartButton onClick={() => setOpenCart(true)} /></div>
        </div>
      </div>
      {isMobile && <SearchBox />}
    </header>
  );
}

export default Header;