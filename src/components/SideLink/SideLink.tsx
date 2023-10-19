import Link from "next/link";

const SideLink = ({
   text,
   path,
   containersStyle,
   icon,
}: {
   text: string;
   path: string;
   containersStyle?: string;
   icon?: React.ReactNode;
}) => {
   return (
      <Link
         href={`${path}`}
         className={`flex items-center duration-300 transition-all  gap-3 text-sm font-medium capitalize ${containersStyle}`}
      >
         {icon && icon}
         <span>{text}</span>
      </Link>
   );
};

export default SideLink;
