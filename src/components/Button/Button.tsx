"use client";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  buttonType?: "primary" | "secondary" | "tertiary";
  readOnly?: boolean;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, buttonType = "primary", readOnly, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center w-full h-full p-3 rounded-xl gap-2 transition 
        ${{
          primary: "bg-primary btn-glow",
          secondary: "bg-white/8  disabled:bg-white/4 disabled:opacity-40",
          tertiary: "bg-surface border border-white/8 text-white/90 hover:border-white/12 disabled:bg-white/4 disabled:opacity-40"
        }[buttonType]} 
        ${!readOnly && {
          primary: "hover:opacity-90",
          secondary: "hover:bg-white/18",
          tertiary: "hover:bg-white/8"
        }[buttonType] || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
