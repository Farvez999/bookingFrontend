import { FaUserFriends } from "react-icons/fa";
import SideLink from "../SideLink/SideLink";
import SummeryDetails from "../SummeryDetails/SummeryDetails";
import { GrServices } from "react-icons/gr";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hooks";
import Cookies from "universal-cookie";

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
  const cookie = new Cookies();
  const userRole = cookie.get("role");

  const user: any = useAppSelector((state) => state?.user?.user);
  let role = userRole ? userRole : user?.role;
  return (
    <div
      className={`min-w-[250px] duration-500 transition-all absolute  z-[999] top-0 h-screen bg-white  shadow-[2px_2px_2px_2px_#ddd]   ${isOpen ? "  left-0 " : "   -left-[999px] "
        }`}
    >
      {role === "user" && (
        <div className="py-7 px-5  flex flex-col gap-3">
          <SideLink
            text="my dashboard"
            path="/dashboard/my-dashboard"
            containersStyle="text-black hover:text-primary"
            icon={<FaUserFriends size={20}></FaUserFriends>}
          ></SideLink>
        </div>
      )}
      {(role === "admin" || role === "super_admin") && (
        <div className="py-7 px-5  flex flex-col gap-3">
          <SideLink
            text="user management"
            path="/dashboard/user-management"
            containersStyle="text-black hover:text-primary"
            icon={<FaUserFriends size={20}></FaUserFriends>}
          ></SideLink>

          <SummeryDetails
            path="/dashboard/service-management"
            groupName="Service management"
            icon={<GrServices size={20}></GrServices>}
          >
            <SideLink
              text="Hotel Management"
              path="/dashboard/service-management"
              containersStyle="text-black hover:text-primary"
              icon={<FaUserFriends size={20}></FaUserFriends>}
            ></SideLink>
            <SideLink
              text="room management"
              path="/dashboard/room-management"
              containersStyle="text-black hover:text-primary"
              icon={<FaUserFriends size={20}></FaUserFriends>}
            ></SideLink>
          </SummeryDetails>

          <SideLink
            text="booking management"
            path="/dashboard/booking-management/"
            containersStyle="text-black hover:text-primary"
            icon={<GrServices size={20}></GrServices>}
          ></SideLink>

          {role === "super_admin" && (
            <SideLink
              text="admin management"
              path="/dashboard/admin-management/"
              containersStyle="text-black hover:text-primary"
              icon={<GrServices size={20}></GrServices>}
            ></SideLink>
          )}

          <SummeryDetails
            path="/dashboard/content-management"
            groupName="content management"
            icon={<GrServices size={20}></GrServices>}
          >
            <SideLink
              text="blog"
              path="/dashboard/content-management/blog"
              containersStyle="text-black hover:text-primary"
              icon={<FaUserFriends size={20}></FaUserFriends>}
            ></SideLink>
            <SideLink
              text="faq"
              path="/dashboard/content-management/faq"
              containersStyle="text-black hover:text-primary"
              icon={<FaUserFriends size={20}></FaUserFriends>}
            ></SideLink>
            <SideLink
              text="feedback"
              path="/dashboard/content-management/feedback"
              containersStyle="text-black hover:text-primary"
              icon={<FaUserFriends size={20}></FaUserFriends>}
            ></SideLink>
          </SummeryDetails>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(SideBar), {
  ssr: false,
});
