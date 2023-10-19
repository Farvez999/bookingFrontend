/* eslint-disable react/prop-types */
const TableCol = ({ children, styles }: {children:React.ReactNode, styles:string}) => {
   return (
      <td className={`${styles}  border-r border-l border-r-white border-l-white px-1 py-1 md:py-[10px] text-xs`}>
         {children}
      </td>
   );
};

export default TableCol;