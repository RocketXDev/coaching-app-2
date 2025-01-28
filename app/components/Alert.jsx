import { useState } from "react"
import "./css/alert.css"

export default function Alert(props) {
    return ( 
        <>
            <div className="alert">{props.name}</div>
        </>

    )
}