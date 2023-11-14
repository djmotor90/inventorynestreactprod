import React from 'react'
import{ Link } from "react-router-dom";


export default function Navbar() {
    return (
        <>
            <Link to='/'>Home</Link>
            
            <Link to='/new'>Log In</Link>
            
        </>
    )
}