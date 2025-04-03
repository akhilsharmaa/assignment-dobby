import React, { useState } from 'react'
import Navbar from '../components/navbar';
import UploadFileView from '../sections/home/UploadFileView';
import FetchAllUploads from '../sections/home/GetAllFilesView';

function HomePage() {

  const [parent_folder_id, setParentFoldeId] = useState<string|undefined>(undefined); 

  return (
    <>
      <Navbar/> 
      <UploadFileView
        setParentFoldeId={setParentFoldeId}
        parent_folder_id={parent_folder_id}
      />
      <FetchAllUploads
        setParentFoldeId={setParentFoldeId}
        parent_folder_id={parent_folder_id}
      />
    </>
  )
}

export default HomePage;
