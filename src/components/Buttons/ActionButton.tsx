import { ActionButtonProps } from "@/types";

const ActionButton = ({
  containerStyles,
  children,
  handleAction,
  disabled,
}: ActionButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`px-5 py-1  ${containerStyles}`}
      onClick={handleAction}
    >
      {children}
    </button>
  );
};

export default ActionButton;
