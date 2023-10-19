import { AiOutlineCloseCircle } from "react-icons/ai";

const CommonModal = ({
   children,
   setShow,
   containerStyles,
   selected,
}: {
   children: React.ReactNode;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
   containerStyles?: string;
   selected?: any;
}) => {
   console.log(selected);
   return (
      <div className="fixed top-0 left-0 w-full min-h-screen flex items-start justify-center bg-orange-500 bg-opacity-50">
         <div
            className={`duration-500 transition-all ease-in-out p-6 h-2/3 mt-[80px] overflow-y-auto  md:h-auto rounded-md z-[999] bg-secondary  relative ${containerStyles
                  ? containerStyles
                  : "w-[85%] md:w-[60%] max-h-[80vh] overflow-y-scroll"
               }`}
         >
            <div
               className="w-5 h-5 rounded-full  right-5 top-5 absolute text-red-500 font-bold  "
               onClick={() => setShow(false)}
            >
               <AiOutlineCloseCircle
                  size={30}
                  className="hover:scale-95 pointer"
               />
            </div>
            {children}
         </div>
      </div>
   );
};

export default CommonModal;
