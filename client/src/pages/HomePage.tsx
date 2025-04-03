import React, { useState } from 'react'
import Navbar from '../components/navbar';
import UploadFileView from '../sections/home/UploadFileView';
import FetchAllUploads from '../sections/home/GetAllFilesView';
import Footer from '../components/Footer';

function HomePage() {

  const [parent_folder_id, setParentFoldeId] = useState<string|undefined>(undefined); 

  return (
    <>
      <Navbar/> 
      <FetchAllUploads
        setParentFoldeId={setParentFoldeId}
        parent_folder_id={parent_folder_id}
      />
      <Footer/>
    </>
  )
}

export default HomePage;
