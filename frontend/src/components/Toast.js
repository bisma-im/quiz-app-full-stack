import { useEffect } from "react";

// Toast Component with Progress Bar
const Toast = ({ show, message, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000); // 3-second timer to auto-hide the toast
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 min-w-60">
            <div>{message}</div>
            <div className="h-1 bg-green-700 mt-2">
                <div className="h-1 bg-green-300 animate-progress"></div>
            </div>
        </div>
    );
};

export default Toast;