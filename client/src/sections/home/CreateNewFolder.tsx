import axios from 'axios';
import { CONFIG } from '../../config-global'
import { useAuth } from '../../context/AuthContext'  
import React, { useState } from 'react'
import { Button } from '@mui/material';

interface CreateFolderInputProps {
    parent_folder_id: string | undefined;
    setParentFoldeId: React.Dispatch<React.SetStateAction<string | undefined>>;
    isNewFolderDialogOpen: boolean | undefined;
    setIsNewFolderDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchAllFilesFolders: () => void; 
}

function CreateNewFolder({
            parent_folder_id, 
            setParentFoldeId,
            isNewFolderDialogOpen, 
            setIsNewFolderDialogOpen, 
            fetchAllFilesFolders, 
        }:CreateFolderInputProps) {
    const userContext = useAuth();
    const [newFolderName, setNewFoldername] = useState<string|undefined>(undefined); 
    const [responseText, setResponseText] = useState<string|undefined>(undefined); 
    const [loading, setLoading] = useState<boolean>(false);  

    const handleSubmit = () => {
        const fetchUploads = async () => {
            try {
                const body = { 
                    "folder_name": newFolderName
                };
                const response = await axios.post(`${CONFIG.baseUrl}/folders/new`,
                    body, 
                    {
                        headers: {
                            "Content-Type": "application/json", 
                            "Authorization": `Bearer ${userContext.token}`,
                        }
                    }
                ); 

                if (response.status === 200) {
                    setResponseText(response.data)  
                    fetchAllFilesFolders();  
                } else {
                    
                    // setErrorText(response.data)
                }
                // setFolderLoading(false);
                
            } catch (error: any) {
                // setFolderLoading(false);

                console.error(error);
                // setErrorText(error.response.data);
            }
        }
        setLoading(true);
        fetchUploads();
    }  

    if(isNewFolderDialogOpen === false){
        return <Button
            onClick={() => setIsNewFolderDialogOpen(true)}>
            Craete New Folder
        </Button>
    }

  return (
    <div>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"> 
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <img className='h-6 mr-2' src="https://images.vexels.com/media/users/3/276661/isolated/preview/614fa2f6000e812cb013b82d5ed0eb21-blue-folder-squared.png" alt="" />

                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-base font-semibold text-gray-900" id="modal-title">Create New Folder Here</h3>

                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFoldername(e.target.value)}
                            className="border mt-2 border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type something..."
                        /> 

                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Are you sure you want to craete folder here ? </p>
                        </div>
                        </div>
                    </div>
                    </div>

                    {
                        responseText && 

                        <div id="alert-3" className="m-10 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 " role="alert">

                            <span className="sr-only">Info</span>
                            <div className="ms-3 text-sm font-medium">
                                {responseText}
                            </div> 
                        </div>
                    }

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" 
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleSubmit}
                        >Create</button>
                    <button type="button" 
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsNewFolderDialogOpen(false)}>
                        Cancel
                    </button>
                    </div>

                    
                </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default CreateNewFolder