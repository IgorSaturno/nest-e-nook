import { Link } from "react-router-dom";
import logoImg from "../assets/nestenook.png";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { CartSidebar } from "./CartSidebar";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Button } from "./ui/button";

export function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();

  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const links = [
    { to: "/", label: "Lançamentos" },
    { to: "/", label: "Inspire-se" },
    { to: "/", label: "Venda Corporativa" },
    { to: "/", label: "Cartão presente" },
  ];

  return (
    <header className="relative p-2 bg-white border-b border-slate-100">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logoImg}
            alt="Logo"
            className="w-[200px] lg:w-full sm:w-[200px]"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex space-x-6 text-slate-900">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className=" text-green-800 hover:text-green-600 font-semibold transition lg:text-base text-base sm:text-xs"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ações + mobile menu button */}
        <div className="flex items-center space-x-4">
          <Button
            size="default"
            onClick={() => setCartOpen(true)}
            className="p-2 rounded-lg  hover:shadow-green-600 hover:shadow-2xl hover:bg-green-600  text-black hover:text-white transition"
            aria-label="Abrir carrinho"
          >
            {totalCount > 0 && (
              <span
                className="absolute  
                translate-x-1/2 -translate-y-1/2 
                bg-red-600 text-white text-xs font-bold 
                w-5 h-5 rounded-full 
                flex items-center justify-center"
              >
                {totalCount}
              </span>
            )}
            <ShoppingCart />
          </Button>
          <Link to="/login">
            <Button className="p-2 rounded-lg  hover:shadow-green-600 hover:shadow-2xl hover:bg-green-600  text-black hover:text-white transition hidden md:flex">
              <User size={16} /> Login
            </Button>
          </Link>
          {/* botão hamburger mobile */}
          <Button
            size="default"
            className="md:hidden p-2 text-slate-900"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-slate-100">
          <ul className="flex flex-col space-y-1 p-4">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="block py-2 px-3 rounded hover:bg-slate-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="flex items-center gap-2 py-2 px-3 rounded hover:bg-slate-50 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* sidebar do carrinho */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
