import React from "react"
import './Button.css'


const Button = ({
    click, 
    label,
    namedClass
}) => {
    return (
        <button 
            onClick={() => click && click(label)}
            className={`
                button
                ${namedClass}
            `}>
            {label}
        </button>
    )
}

export default Button;