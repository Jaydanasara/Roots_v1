import React, {useState} from 'react'




export default function EditPostModal(props) {

console.log(props.content)
const [newContent,setNewContent]=useState(props.content)

const handleChange = (event) => {
    setNewContent(event.target.value);
  };

console.log(props)
    return (
        <div className="editPostContainer">

            <div className="editModalBackground">
            <div className="uploadedInfo">
                                            {(props.picture === "") ? <div className="noPic"> </div> :
                                                <div className="editPicCon"><img className={`${(props.picture === "") ? "story" : "editPicCon"}`} src={props.picture} alt="uploaded pic" /></div>
                                            }
                                        </div>

                    <h1>Edit Your Post</h1>
                    <div className="editTextCon">
                        <textarea name="editPostText" value={newContent} onChange={handleChange} className="editPostText" placeholder=""   rows="4" cols="80">
                           
                        </textarea>


                    </div>
                    {/* <div>

                        <input type="file" style={{ display: "none" }} onChange={this.handleImageSelected2} ref={fileInput => this.fileInput2 = fileInput} />
                        <img className={(this.state.checkInputID === content._id) ? "uploadReady active" : "uploadReady"} src={this.state.url} alt="preview" height="40" width="50" />

                        <progress className={(this.state.checkInputID === content._id) ? "uploadReady active" : "uploadReady"} value={this.state.progress} max="100" />
                        <button className={(this.state.checkInputID === content._id) ? "uploadReady active" : "uploadReady"} onClick={this.handleUpload}>Upload</button>
                        <span className={(this.state.checkInputID === content._id) ? "uploadReady active" : "uploadReady"}>File </span>
                    </div> */}

                    <div className="editButtons">
                    <button type="button" className="cancelEdit" onClick={props.cancelEdit} > Cancel</button>
                    <button type="button" className="saveEdit" onClick={ newContent === "" ? null :()=>props.changeMessage(props.postID,newContent)} > Save</button>
                    
                    </div>

                




            </div>

        </div>
    )
}
