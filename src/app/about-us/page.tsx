import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-[90%] mx-auto ">
      <h1 className="text-2xl font-bold text-blue-500 my-5 text-center">
        About Us
      </h1>
      <div className="grid grid-cols-2 items-center ">
        <div>
          <img src="https://st2.depositphotos.com/3591429/10566/i/950/depositphotos_105666254-stock-photo-business-people-at-meeting-and.jpg" />
        </div>
        <div>
          <p className="p-4">
            Booking.com is one of the largest online travel agencies. It is headquartered in Amsterdam, and is a subsidiary of Booking Holdings. In 2022, the companys mobile app was the most downloaded mobile app in the travel agency category. Our Privacy Policy explains what personal information we collect, how we use personal information, how personal information is shared, and privacy rights. Our Privacy Policy explains what personal information we collect, how we use personal information, how personal information is shared, and privacy rights.
          </p>

          {/* <p>
            By investing in technology that takes the friction out of travel,
            Booking.com seamlessly connects millions of travelers to memorable
            experiences, a variety of transportation options, and incredible
            places to stay from homes to hotels, and much more. As one of the
            worlds largest travel marketplaces for both established brands and
            entrepreneurs of all sizes, Booking.com enables properties around
            the world to reach a global audience and grow their businesses.
          </p>

          <p>
            About Booking.com™selected Legal Digital Services Act Terms &
            Conditions Offices Worldwide Contact Us Press Center Career
            Opportunities Sustainability at Booking.com Add Your Property
            Booking.com for Business Extranet Log-in Become an Affiliate
            Supplier Code of Conduct About Booking.com™ Founded in 1996 in
            Amsterdam, Booking.com has grown from a small Dutch start-up to one
            of the worlds leading digital travel companies. Part of Booking
            Holdings Inc. (NASDAQ: BKNG), Booking.coms mission is to make it
            easier for everyone to experience the world. By investing in
            technology that takes the friction out of travel, Booking.com
            seamlessly connects millions of travelers to memorable experiences,
            a variety of transportation options, and incredible places to stay
            from homes to hotels, and much more. As one of the worlds largest
            travel marketplaces for both established brands and entrepreneurs of
            all sizes, Booking.com enables properties around the world to reach
            a global audience and grow their businesses. Booking.com is
            available in 43 languages and offers more than 28 million reported
            accommodation listings, including over 6.6 million homes,
            apartments, and other unique places to stay. Wherever you want to go
            and whatever you want to do, Booking.com makes it easy and supports
            you with 24/7 customer support.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default page;
