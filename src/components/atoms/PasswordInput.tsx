import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    register: any;
    errors: any;
    inputName: string;
    placeholder?: string;
}

export default function PasswordInput({register, errors, inputName, placeholder = "", ...rest}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
                    placeholder={placeholder}
                    {...register(inputName)}
                    {...rest}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-xl text-unicoop hover:text-unicoop-blue duration-150"
                >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
            </div>
            {errors[inputName] && (
                <p className="text-red-500 text-sm font-semibold text-center">
                    {errors[inputName].message || "La contraseña es obligatoria"}
                </p>
            )}
        </>
    );
}