/* eslint-disable react/prop-types */

const TableRow = ({
   children,
   styles,
}: {
   children: React.ReactNode;
   styles: string;
}) => {
   return (
      <tr
         className={` text-sm border-t border-b-gray-300 border-b border-t-gray-300 ${styles}`}
      >
         {children}
      </tr>
   );
};

export default TableRow;
