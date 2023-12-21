interface ButtonProps {
  children: string;
  submitButton?: boolean;
  buttonStyle?: "primary" | "secondary" | "disabled";
  onClickHandler?: any;
}

const buttonStyles = {
  primary: `border-transparent bg-[#333] text-white`,
  secondary: `border-primary bg-transparent text-primary`,
  disabled: `border-[#E4E4EF] bg-transparent text-secondary-text pointer-events-none`,
};

const AuthButton = ({
  children,
  submitButton = false,
  buttonStyle = "primary",
  onClickHandler,
}: ButtonProps) => {
  return (
    <button
      className={`px-[25px] py-[8px] focus:outline-none rounded-[12px] 
      border-[1px] box-border border-solid transition-all transition-duration-700
      ${buttonStyles[buttonStyle]}`}
      onClick={onClickHandler}
      type={submitButton ? "submit" : "button"}
    >
      {children}
    </button>
  );
};

export default AuthButton;
