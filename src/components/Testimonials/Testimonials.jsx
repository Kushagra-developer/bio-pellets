import React from "react";
import Slider from "react-slick";

const BlogData = [
  {
    id: 1,
    title: "English",
    img: "data:image/jpeg;base64,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",
    link: "https://ecofarminsights.blogspot.com/2024/08/ecofarm-insights.html",
  },
  {
    id: 2,
    title: "Hindi",
    img: "https://www.theigc.org/sites/default/files/styles/og_image/public/2023-11/Man%20burning%20crops%20at%20India-Pakistan%20border.jpg?h=d21197f5&itok=58XfZBo3",
    link: "https://ecofarminsights.blogspot.com/2024/08/blog-post_30.html",
  },
  {
    id: 3,
    title: "Tamil",
    img: "https://media.istockphoto.com/id/600993640/photo/fire-burns-stubble-on-the-field-destroy-summer.jpg?s=612x612&w=0&k=20&c=SphchJjbZUX92zEIhCylMJm-CKXZ2gI6T0sJEQeTk84=",
    link: "https://ecofarminsights.blogspot.com/2024/08/blog-post.html",
  },
  {
    id: 4,
    title: "Telugu",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6WjggVj6whnbnBBqrYpThFS7U35xRYYRrQ&s",
    link: "https://example.com/blog/es6",
  },
  {
    id: 5,
    title: "Punjabi",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw4vR716tgf9Yp91a745f83XulB1GhPT74tw&s",
    link: "https://example.com/blog/es6",
  },
];

const Blogs = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Latest Blogs
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Blogs
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Discover our latest blogs on various topics.
          </p>
        </div>

        <div data-aos="zoom-in">
          <Slider {...settings}>
            {BlogData.map((data) => (
              <div key={data.id} className="my-6">
                <a href={data.link} target="_blank" rel="noopener noreferrer">
                  <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                    <div className="mb-4">
                      <img src={data.img} alt={data.title} className="rounded w-full h-40 object-cover" />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black/80 dark:text-light">{data.title}</h2>
                        <p className="text-xs text-gray-500">{data.description}</p>
                      </div>
                    </div>
                    {/* Removed quotes icon */}
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Blogs;