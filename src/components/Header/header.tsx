import CartButton from "../Cart/CartButton";
import SearchBox from "../Input/SearchBox";

type HeaderProps = {
  // onSearch: (query: string) => void;
  setOpenCart: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ setOpenCart }) => {
  return (
      <header className="flex items-center justify-between mb-6 border-b border-white/8 pb-4">
        <h1 className="text-2xl font-semibold">Pokemon market</h1>
        <div className="flex items-end justify-end space-x-4">
          <SearchBox />
          <div className="w-content">
          <CartButton onClick={() => setOpenCart(true)} /></div>
        </div>
      </header>
  );
}

export default Header;