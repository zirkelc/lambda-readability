import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const className = twMerge(
      "middle center rounded-lg bg-black py-3 px-6 font-sans text-xs font-bold uppercase text-white",
      props.className,
    );
    return <button {...props} className={className} ref={ref} />;
  },
);
Button.displayName = "Button";

export { Button };
