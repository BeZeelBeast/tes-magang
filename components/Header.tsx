"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const menus = ["Work", "About", "Services", "Ideas", "Careers", "Contact"];
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-15 transition-all duration-300 z-30
      ${isVisible ? "translate-y-0 bg-orange-500/80 backdrop-blur-md" : "-translate-y-full"}`}
    >
      <figure className="size-20 ml-20">
        <img
          src="data:image/jpeg;base64,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"
          alt="Logo"
          className="w-15 h-15 py-3"
        />
      </figure>

      <ul className="flex gap-6 mr-15">
        {menus.map((menu) => {
          const isActive = pathname === `/${menu.toLowerCase()}`;
          return (
            <li key={menu}>
              <Link
                href={`/${menu.toLowerCase()}`}
                className={`hover:underline ${
                  isActive ? "border-b-2 border-white" : ""
                }`}
              >
                {menu}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
