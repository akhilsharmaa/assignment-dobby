import React from 'react'
import { useAuth } from '../context/AuthContext'


function navbar() {
 
    const logout = () => { 
        localStorage.removeItem("token"); 
        window.location.reload();

    };
    
    return ( 
        <nav className="bg-slate-600 text-white border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="\" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://static.wixstatic.com/media/e1fa8a_974cde8be06a4f5294d7595a9e3ba2d2~mv2.png/v1/fill/w_109,h_27,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e1fa8a_974cde8be06a4f5294d7595a9e3ba2d2~mv2.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                        (Assignment)
                    </span>
                </a> 
                <button
                    onClick={logout}>
                    logout
                </button>
            </div>
        </nav> 
    )
}

export default navbar