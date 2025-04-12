import React from "react";
import Image1 from "../../assets/Image1.jpeg";
import { IoMdSearch } from "react-icons/io";
import DarkMode from "./DarkMode";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  
  {
    id: 2,
    name: "Blogs",
    link: "https://ecofarminsights.blogspot.com/"
  },
  {
    id: 3,
    name: "Plant Locator",
    link: "/locator",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
     
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Image1} alt="Logo" className="w-10" />
              ECOSHIELD
            </a>
          </div>

        
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
             
          
            </div>

            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
      
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
