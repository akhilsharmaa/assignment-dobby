import { useState, useEffect } from 'react';
import axios from 'axios';
import { CONFIG } from '../../config-global'
import { useAuth } from '../../context/AuthContext'  
import FileView from '../../components/FileView'; 
import { File } from '../../models/Files';

export default function SearchView() {

    const userContext = useAuth();
    const [loading, setLoading] = useState<boolean>(false); 
    const [searchInput, setSearchInput] = useState<string|undefined>(undefined); 
    const [errorText, setErrorText] = useState<string | undefined>(undefined);
    const [filesList, setFilesList] = useState<File[]>([]);  

    const fetchAllUploads = () => {
        const fetchUploads = async () => {
            try {

                const body = {
                    search_input: searchInput, 
                };

                const response = await axios.post(`${CONFIG.baseUrl}/files/search`,
                    body, 
                    {
                        headers: {
                            "Content-Type": "application/json", 
                            "Authorization": `Bearer ${userContext.token}`,
                        }
                    }
                );
                
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

    return (
        <div className="my-4"> 

                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative">
                        <input
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Global Search file & folder..." 
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value)
                                fetchAllUploads(); 
                            }}
                        />
                        <button
                            className="absolute top-1 right-1 flex items-center rounded bg-blue-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={fetchAllUploads}>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg>

                            {
                                loading &&
                                <div role="status">
                                    <svg aria-hidden="true" className="w-4 h-4 mx-2 text-gray-200 animate-spin   fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            } 
                            Search
                        </button> 
                    </div>
                </div>

                {filesList.length > 0 && (
                    <div className="fixed   w-80 max-h-[70vh] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:bg-gray-50 transition-all">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Files</h3>
                        <div className="space-y-2">
                        {filesList.map((file, index) => (
                            <div
                            key={index}
                            className="p-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition"
                            >
                            <p className="text-sm text-gray-700 truncate">{file.filename}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
 
        </div>
    );
}
