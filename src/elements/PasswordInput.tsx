import EyeSlash from "../assets/icons/outline/EyeSlash";
import Eye from "../assets/icons/outline/eye";
import TextInput from "./TextInput";
import { useState, forwardRef } from "react";

const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof TextInput>
>(function PasswordInput({ children, ...rest }, ref) {
  const [toggle, setToggle] = useState(false);

  return (
    <TextInput {...rest} type={toggle ? "text" : "password"} ref={ref}>
      {children}
      {toggle ? (
        <EyeSlash
          onClick={() => setToggle(false)}
          className="absolute end-3 top-3 cursor-pointer"
        />
      ) : (
        <Eye
          onClick={() => setToggle(true)}
          className="absolute end-3 top-3 cursor-pointer"
        />
      )}
    </TextInput>
  );
});

export default PasswordInput;
