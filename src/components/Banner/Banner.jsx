import React from "react";
import BannerImg from "../../assets/Image5.jpeg";


const Banner = () => {
  return (
    <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
     
          <div data-aos="zoom-in">
            <img
              src={BannerImg}
              alt=""
              className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div>

   
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
            “Empowering Farmers, Protecting the Environment"
            </h1>
            <p
              data-aos="fade-up"
              className="text-sm text-gray-500 tracking-wide leading-5"
            >
           “Turn your crop residue into profit and contribute to a cleaner, greener future. Our bio-pellets are designed to reduce pollution and provide an eco-friendly alternative for energy production.”
            </p>
            <div className="flex flex-col gap-4">           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
