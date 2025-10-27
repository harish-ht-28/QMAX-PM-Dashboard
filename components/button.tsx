import { Loader2 } from "lucide-react";

interface ButtonProps {
    children?: React.ReactNode;
    text?: string;
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
    children,
    text,
    loading = false,
    disabled = false,
    type = "button",
    className,
    onClick,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-2 rounded-md text-white font-semibold ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } transition flex justify-center items-center ${className ?? ""}`}
        >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (children ?? text)}
        </button>
    );
}
