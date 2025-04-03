import { Schema, model, connect } from 'mongoose';


const folderSchema = new Schema({
    parentFolderId: {type: String, required: false}, 
    foldername: {type: String,required: true}, 
    createdBy: {type: String, required:true}, 
    uploadedAt: {type: Date,default: Date.now}
  });
   
export const FolderSchema = model('folder', folderSchema);