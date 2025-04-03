import React from 'react'
import { File } from '../models/Files'


interface FileViewProps {
    file:  File,  
} 

function FileView({file}: FileViewProps) {
  return (    
        <tr className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm  ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {file.filename}
            </th>
        <td className="px-6 py-4">
                {file.contentType}
        </td>
        <td className="px-6 py-4">
                {file._id}
        </td> 
        </tr>
    )
}

export default FileView; 