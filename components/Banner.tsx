"use client";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname();
  const currentPage = pathname === "/" ? "Home" : pathname.replace("/", "");
  const formattedTitle =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <section className="relative w-full h-64 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRprM9guvVLKPs0zIkHQfHVP-dMlt0a6aib3UL6Y09c8mhKDPY"
          alt="Banner Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-16 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 80%, 100% 100%, 0 100%)" }}
      ></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
        <h1 className="text-3xl font-light">{formattedTitle}</h1>
        <h3 className="text-sm">Where all our great things begin</h3>
      </div>
    </section>
  );
}
