import React, { useState, useEffect } from 'react';

interface TimedPopupProps {
    title: string;
    message: string;
    className?: string;
    setErrorMessage: (message: string) => void;
}

const TimedPopup: React.FC<TimedPopupProps> = ({ title, message, className, setErrorMessage}) => {
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false);
            setErrorMessage('');
        }, 5000); // Duração em milissegundos

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {showPopup && (
                <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className} z-5 opacity-85`}>
                    <style>
                        {`
                            @keyframes progress {
                                from {
                                    width: 100%;
                                }
                                to {
                                    width: 0%;
                                }
                            }
                        `}
                    </style>
                    <div className="p-4">
                        <h2 className='text-lg font-bold mb-2 text-center'>{title}</h2>
                        <p className='text-sm text-gray-700 mb-4'>{message}</p>
                        <div className="w-full bg-gray-200 h-2 rounded">
                            <div
                                className="bg-blue-500 h-2 rounded"
                                style={{ animation: 'progress 5s linear' }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TimedPopup;