import React from 'react'
import Navbar from '../components/navbar';
import UploadFileView from '../sections/home/UploadFileView';
import FetchAllUploads from '../sections/home/GetAllFilesView';

function HomePage() {
  return (
    <>
      <Navbar/> 
      <UploadFileView/>
      <FetchAllUploads/>
    </>
  )
}

export default HomePage;
