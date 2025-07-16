import { VscAccount } from "react-icons/vsc";
interface CloseButtonProps {
    onClick: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
    return(
        <button
                className="text-3xl text-unicoop-white my-auto mx-auto md:mr-8 transition-colors duration-100 ease-in hover:text-buttons-list-blue cursor-pointer" onClick={onClick}
            >
            <VscAccount className=""/>
        </button>
    );
}