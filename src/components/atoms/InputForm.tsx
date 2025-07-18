interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    register: any;
    errors: any;
    inputName: string;
    type?: string;
    placeholder?: string;
}

export default function InputForm({
    register,
    errors,
    inputName,
    type = "text",
    placeholder = "",
    ...rest
}: InputFormProps) {
    return (
        <>
            <input
                className="w-full p-2.5 rounded-md text-xl text-unicoop bg-background text-center border-solid border-unicoop border"
                type={type}
                placeholder={placeholder}
                {...register(inputName)}
                {...rest}
            />
            {errors[inputName] && (
                <p className="text-red-500 text-sm font-semibold">
                    {errors[inputName].message || "Este campo es obligatorio"}
                </p>
            )}
        </>
    );
}