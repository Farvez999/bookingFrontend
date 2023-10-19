"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import {
  AiFillHome,
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlineLogin,
  AiFillFile,
} from "react-icons/ai";
// import {CgProfile} from 'react-icons/cg'
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { GetUserInfo, removeUserInfo } from "@/shared/auth.service";
import { useRouter } from "next/navigation";
import userSlice, { setUser } from "@/redux/features/userSlice/userSlice";
import { useGetuserprofileQuery } from "@/redux/api/authApi";
import Cookies from "universal-cookie";

const Index = () => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const { userId }: any = GetUserInfo();
  const cookie = new Cookies();

  const user: any = useAppSelector((state: any) => state.user.user);
  const { data } = useGetuserprofileQuery(undefined);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUser(data));
  }, [data]);
  const handleLogout = () => {
    removeUserInfo("accessToken");

    cookie.remove("userId");
    cookie.remove("role");
    cookie.remove("email");
    cookie.remove("phone");
    cookie.remove("name");
    router.push("/login");

    dispatch(setUser({}));
  };
  return (
    <div className="relative flex items-center justify-between h-20 bg-primary  text-black px-5  md:px-10 ">
      <Link href="/" className="text-xl font-semibold">
        <h1 className="uppercase text-white ">Booking.com</h1>
      </Link>

      <div className="flex items-center  gap-3">
        <nav
          className={`absolute top-20 duration-500 transition-all h-screen md:h-auto bg-primary w-[200px] md:w-auto md:bg-transparent left-0 md:static flex flex-col z-[999]   md:flex-row justify-start px-5 md:px-0 font-medium  md:items-center gap-5 ${
            show ? "left-0" : "left-[-999px]"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-secondary hover:scale-75 duration-300"
          >
            <AiFillHome></AiFillHome>
            <span>Home</span>
          </Link>

          <Link
            href="/service"
            className="flex items-center gap-2 text-secondary hover:scale-75 duration-300"
          >
            <AiFillHome></AiFillHome>
            <span>Service</span>
          </Link>

          <Link
            href="/about-us"
            className="flex items-center gap-2 text-secondary hover:scale-75 duration-300"
          >
            <AiFillHome></AiFillHome>
            <span>About Us</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-secondary hover:scale-75 duration-300"
          >
            <AiFillHome></AiFillHome>
            <span>Blog</span>
          </Link>
          <Link
            href="/faq"
            className="flex items-center gap-2 text-secondary hover:scale-75 duration-300"
          >
            <AiFillHome></AiFillHome>
            <span>FAQ</span>
          </Link>
        </nav>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="flex items-center gap-2 text-secondary hover:scale-75 duration-300">
              <CgProfile size={20} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {user?.email && (
              <Link
                href="/profile"
                className="flex items-center ms-3 my-2 gap-2 hover:scale-75 duration-300"
              >
                <CgProfile></CgProfile>
                <span>profile</span>
              </Link>
            )}
            <li>
              {user?.email && (
                <Link
                  href={
                    user.role === "user"
                      ? "/dashboard/my-dashboard"
                      : "/dashboard/user-management"
                  }
                  className="flex items-center gap-2 mb-2  hover:scale-75 duration-300"
                >
                  <AiFillHome></AiFillHome>
                  <span>Dashboard</span>
                </Link>
              )}
            </li>
            <li>
              {user?.email ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-active btn-xs mb-2"
                >
                  Logout
                </button>
              ) : (
                <a className="text-black">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 hover:scale-75 duration-300"
                  >
                    <AiOutlineLogin></AiOutlineLogin>
                    <span>Login</span>
                  </Link>
                </a>
              )}
            </li>
          </ul>
        </div>

        {user?.email && (
          <div className="flex items-center gap-3  text-secondary hover:text-red-500">
            <Link href="/cart">
              <AiOutlineShoppingCart size={20}></AiOutlineShoppingCart>
            </Link>
            <div
              className=" block md:hidden"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? (
                <AiFillCloseCircle size={20}></AiFillCloseCircle>
              ) : (
                <FaBars size={20}></FaBars>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
});
