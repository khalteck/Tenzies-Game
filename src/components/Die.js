import React from "react"

export default function Die(props) {
    return (
        <div 
        className={`${props.held ? "bg-violet-800 text-white" : "bg-white text-black"} p-[7px] bg-white border border-white rounded-md shadow-md hover:border-violet-800 cursor-pointer`}
        onClick={props.handleClick}
        >
            {props.value}
        </div>
    )
}