"use client";

/* eslint-disable react/prop-types */
const TableHeader = ({
   fields,
   children,
   containerStyles,
}: {
   fields: string[];
   children: React.ReactNode;
   containerStyles: string;
}) => {
   return (
      <table
         className={`rounded-lg text-center font-medium  text-black mx-auto w-full text-xs capitalize  ${containerStyles}`}
      >
         <thead>
            <tr className="  text-xs text-black">
               {fields?.map((i, idx) => (
                  <th
                     className="    px-1 py-1 md:py-[11px] min-w-[40px]"
                     key={idx}
                  >
                     {i}
                  </th>
               ))}
            </tr>
         </thead>
         <tbody>
                  {
                     children
                  }
         </tbody>
      </table>
   );
};

export default TableHeader;
