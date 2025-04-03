import React, { useState } from 'react'
import Navbar from '../components/navbar';
import UploadFileView from '../sections/home/UploadFileView';
import FetchAllUploads from '../sections/home/GetAllFilesView';
import Footer from '../components/Footer';
import { useParams } from "react-router-dom";

function HomePage() { 

  const { folder_id } = useParams<{ folder_id: string }>(); // Extract folderId from URL 

  return (
    <>
      <Navbar/> 
      <FetchAllUploads 
        parent_folder_id={folder_id}
      />
      <Footer/>
    </>
  )
}

export default HomePage;
