import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 ">
            <div className="fixed inset-0 bg-black opacity-50 z-[-3]"></div>
            <div className="bg-white rounded-lg shadow-lg p-4 relative animate-scale-up overflow-y-auto max-h-screen">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
