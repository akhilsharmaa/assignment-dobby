import { Schema, model, connect } from 'mongoose';


const fileSchema = new Schema({
    parentFolderId: {type: String, required: true, default: "root"}, 
    filename: {type: String,required: true},
    contentType: {type: String,required: true},
    data: {type: Buffer,required: true},
    createdBy: {type: String, required:true}, 
    uploadedAt: {type: Date,default: Date.now}
  });
   
export const FilesSchema = model('file', fileSchema);