// @ts-nocheck
interface PaginationButtonProps {
  onClick: any;
  value: string;
  buttonStyle?: "disabled" | "primary" | "selected";
}

const PaginationButton = ({
  onClick,
  value,
  buttonStyle = "primary",
}: PaginationButtonProps) => {
  const buttonStyleOptions = {
    disabled: `pointer-events-none text-secondary-text border-[#f1f1f1] bg-white text-black`,
    primary: `border-[#8a8a8a] bg-white text-black`,
    selected: `pointer-events-none text-white bg-[#333] border-transparent`,
  };

  return (
    <button
      onClick={onClick}
      className={`py-[10px] px-[14px] rounded-[8px] font-semibold border-[1px] 
      transition-all transition-duration-700 ${buttonStyleOptions[buttonStyle]}`}
    >
      {value}
    </button>
  );
};

export default PaginationButton;
