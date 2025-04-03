import React from 'react'
import { Folder } from '../models/Folder'


interface FolderViewProps {
    folder:  Folder,  
} 

function FolderView({folder}: FolderViewProps) {
  return (    
        <tr className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                <div className=' flex flex-wrap jsu'>
                    <img className='h-6 mr-2' src="https://images.vexels.com/media/users/3/276661/isolated/preview/614fa2f6000e812cb013b82d5ed0eb21-blue-folder-squared.png" alt="" />
                    {folder.foldername}
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