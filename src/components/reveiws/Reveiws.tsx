// "use client";
import React from "react";
import AwesomeSlider from "react-awesome-slider";

import { BsFillPersonLinesFill } from "react-icons/bs";
import Image from "next/image";

const Reveiws = ({ data }: any) => {
  let settings = {
    className: "text-white",
    dots: false,
    infinite: true,
    speed: 600,

    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4 my-6">
      {data?.reviewAndRatings?.map((review: any) => (
        <div key={review?._id} className="card card-side bg-gray-200 shadow-xl">
          <figure className="">
            {review?.user?.profileImage?.url && (
              <Image
                alt="image"
                height={30}
                width={30}
                src={review?.user?.profileImage?.url}
              />
            )}
          </figure>
          <div className="card-body">
            <div>
              <div className="text-orange-600">
                <BsFillPersonLinesFill size={30} />
              </div>
              <h2 className="card-title bg-orange-500">{review?.user?.name}</h2>
            </div>
            <p>{review?.message}</p>
            <div className="rating gap-1">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="rating gap-1">
                  <input
                    type="radio"
                    name={`rating-${index}`}
                    className={`mask mask-star ${index <= review?.rating ? "bg-orange-500" : "bg-gray-400"
                      }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reveiws;
