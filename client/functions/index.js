// const functions = require('firebase-functions');
// const cors =require("cors")({origin:true});
// const gcs= require("firebase/storage")();
// const Busboy = require ("busboy");
// // const os = require ("os");
// // const path=require("path");
// // const spawn = require ('child-process-promise').spawn;
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });


// exports.uploadFile = functions.https.onRequest((req, res) => {
//     cors((req,res)=>{
//         const busboy = new Busboy ({headers: request.headers});
//        let uploadData=null;
//         busboy.on("file",(fieldname,file,filename,encoding,mimetype)=>{
//             const filepath= path.join(os.tmpdir(),filename);
//             uploadData={file: filepath,type: mimetype};
//         });
//         busboy.on("finish", () =>{
//             const bucket= gcs.bucket ("roots-6f3a0.appspot.com");
//             bucket.upload(uploadData.file,{
//                 uploadType:"media",
//                 metadata:{
//                     metadata: {
//                         contentType:uploadData.type
//                     }
//                 }
//             }).catch((err,uploadedFile) =>{
//                 if(err){
//                     return res.status(500).json({
//                         error:err
//                     });
//                 }
//                 res.status(200).json({
//                     message:"file uploaded"
//                 });
//             })
//         })
        
//     });
  
// });