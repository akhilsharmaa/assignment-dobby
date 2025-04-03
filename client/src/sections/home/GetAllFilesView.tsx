import { useState, useEffect } from 'react';
import axios from 'axios';
import { CONFIG } from '../../config-global'
import { useAuth } from '../../context/AuthContext'  
import FileView from '../../components/FileView';
import FolderView from '../../components/FolderView';

export default function UploadFileView() {

    const userContext = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [folderLoading, setFolderLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string | undefined>(undefined);
    const [filesList, setFilesList] = useState<any[]>([]); 
    const [folderList, setFolderList] = useState<any[]>([]); 

    const fetchAllUploads = () => {
        const fetchUploads = async () => {
            try {
                const body = {};
                const response = await axios.post(`${CONFIG.baseUrl}/files/all`,
                    body, 
                    {
                        headers: {
                            "Content-Type": "application/json", 
                            "Authorization": `Bearer ${userContext.token}`,
                        }
                    }
                );

                console.log(response.data);
                
                if (response.status === 200) {
                    setFilesList(response.data);  
                } else {
                    setErrorText(response.data)
                }

                setLoading(false);
            } catch (error: any) {
                setLoading(false);

                console.error(error);
                setErrorText(error.response.data);
            }
        }
        setLoading(true);
        fetchUploads();
    } 

    const fetchAllUploadFolders = () => {
        const fetchUploads = async () => {
            try {
                const body = {};
                const response = await axios.post(`${CONFIG.baseUrl}/folders/all`,
                    body, 
                    {
                        headers: {
                            "Content-Type": "application/json", 
                            "Authorization": `Bearer ${userContext.token}`,
                        }
                    }
                );
                
                if (response.status === 200) {
                    setFolderList(response.data);  
                } else {
                    setErrorText(response.data)
                }

                setFolderLoading(false);
            } catch (error: any) {
                setFolderLoading(false);

                console.error(error);
                setErrorText(error.response.data);
            }
        }
        setFolderLoading(true);
        fetchUploads();
    } 

    useEffect(() => {
        fetchAllUploads(); 
        fetchAllUploadFolders();
    }, [])
 
    return (
        <div className="w-2/3 m-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                    <thead className="text-xs text-gray-700 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3"> Name </th>
                            <th scope="col" className="px-6 py-3"> Type </th> 
                            <th scope="col" className="px-6 py-3"> Uploaded At </th>
                        </tr>
                    </thead>
                    
                    <tbody>

                    {folderList.map((folder, index)  => {
                        return <FolderView folder={folder} />
                    })}  

                    {filesList.map((file, index)  => {
                        return <FileView file={file} />
                    })}  

                    </tbody>

                {
                    loading &&

                    <div role="status" className="max-w-sm mt-10 animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <span className="sr-only">Loading...</span>
                        <p className='p-4'>Loading Files... </p>
                    </div> 
                }

                {
                    folderLoading &&

                    <div role="status" className="max-w-sm  mt-10  animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <span className="sr-only">Loading...</span>
                        <p className='p-4'>Loading Folders... </p>
                    </div> 
                }

            </table>
        </div>
    );
}
