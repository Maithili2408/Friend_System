import React from "react";

export function Button({onClick, label, style, id}){
    return(
        <button style={style} onClick={onClick}>
             {label}
        </button>
    );
}