import React from "react"

interface IMessage {
    message: string
    type: 'error' | 'success' | 'info'
}

const Message: React.FC<IMessage> = ({ message, type }) => {
    let classes = 'text-sm w-full px-4 py-2 rounded-md text-center';
    switch (type) {
        case 'error':
            classes += ' bg-red-400 text-red-100';
            break;
        case 'success':
            classes += ' bg-green-400 text-green-100';
            break;
        case 'info':
            classes += ' bg-theme-secondary text-white';
            break;
        default:
            classes += ' bg-gray-400 text-white';
            break;
    }
    return (
        <p className={classes}>{message}</p>
    )
}

export default Message