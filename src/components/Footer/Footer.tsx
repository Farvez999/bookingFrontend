import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-20 md:px-10 px-5 text-normal capitalize bg-black  text-white grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-center justify-itemscenter w-full h-[700px] md:h-auto">
      <div>
        <h1 className="text-2xl font-bold uppercase text-white">Booking.com</h1>
        <p className="text-xs font-medium text-white">
          {" "}
          &copy; All rights reserved By booking.com{" "}
        </p>
      </div>
      <div className="flex flex-col gap-2 ">
        <h5 className="text-lg font-bold uppercase">Important links</h5>
        <ul className="flex flex-col gap-2 items-start pl-3">
          <li>
            {" "}
            <Link href="/about-us">About us</Link>
          </li>
          <li>
            {" "}
            <Link href="/blog">blog</Link>
          </li>
          <li>
            {" "}
            <Link href="/faq">faq</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2 ">
        <h5 className="text-lg  font-bold uppercase">Further Information</h5>
        <ul className="flex flex-col gap-2 items-start">
          <li>
            {" "}
            <Link href="/about-us">terms & services</Link>
          </li>
          <li>
            {" "}
            <Link href="/blog">privacy policy</Link>
          </li>
          <li>
            {" "}
            <Link href="/blog">privacy policy</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-2 ">
        <h5 className="text-lg font-bold uppercase">Social Media</h5>
        <ul className="flex  gap-2 items-start">
          <li>
            {" "}
            <Link href="/facebook">
              <FaFacebook size={30}></FaFacebook>
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/">
              {" "}
              <FaTwitter size={30}></FaTwitter>
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/faq">
              <FaInstagram size={30}></FaInstagram>
            </Link>
          </li>
          <li>
            {" "}
            <Link href="/faq">
              <FaYoutube size={30}></FaYoutube>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
