import React from 'react'
import { Folder } from '../models/Folder'
import { useNavigate } from "react-router-dom";


interface FolderViewProps {
    folder:  Folder,     
} 

function FolderView({folder}: FolderViewProps) {
    const navigate = useNavigate(); // Hook to change URL

    const handleFolderClick = () => { 
        navigate(`/${folder._id.toString()}`); // Change the URL
    };

  return (    
        <tr className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                <div className=' flex flex-wrap jsu'>
                    <img className='h-6 mr-2' src="https://images.vexels.com/media/users/3/276661/isolated/preview/614fa2f6000e812cb013b82d5ed0eb21-blue-folder-squared.png" alt="" />
                    <button
                        onClick={handleFolderClick}
                        >
                        {folder.foldername}
                    </button>
                </div>
            </th>
        <td className="px-6 py-4">
            Folder
        </td>
        <td className="px-6 py-4">
                {folder.uploadedAt.toString()}
        </td> 
        </tr>
    )
}

export default FolderView; 