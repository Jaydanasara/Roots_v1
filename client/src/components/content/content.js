import React from "react";

class Content extends React.Component {
    render() {

        return (
            <div className="contentArea ">

                <section className="composeStatus">
                    <textarea name="status" className="statusText" placeholder= "Whats on your mind?" rows="8" cols="80" />
                    <div className="user-Img"></div>
                    <div className="buttons">
                        <div className="button photo"><i class="fas fa-camera-retro"></i></div>
                        <div className="button video"><i class="fas fa-video"></i></div>
                        <div className="button send">
                            <button className="postbutton">Post </button>
                        </div>
                    </div>
                </section>

                <section className= "feed ">
                <div className= "feed_Container">
                <div className="friendsPostinfo">
                <a className="friendsImg" href="#"> </a>
                <div className="friendsInfo"> <a href="#" className="friendInfoLink">Novella Dickens</a>shared a 
                <a href="#" className="stories">story </a>  </div>
                </div>
                <div className="uploadedInfo">
                <div className="upImage"></div>
                </div>
                 <div className="colorBackground">
                <div className="updateInfo">
                <h3>This is my new site </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen 
                    book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                     with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                
                </div>
                <div className="emojis">
                <div className="likessection">
                <div className="likeDisplay"><i class="far fa-thumbs-up"></i> </div>
                </div>
                <div className="friendsLiked">Marsh hall and 4 others liked </div>
                <div className="numOfComments">4 comments </div>
                </div>
                <div className="responseComments">
                <textarea name="comment_Area" className="commentArea" placeholder= "Comment" rows="8" cols="80" />
                <div className="commentButtons">
                <div className="replyButton"><i class="fas fa-share"></i> </div>
                <div className="likeButton"><i class="far fa-thumbs-up"></i></div>
                </div>
                
               </div> 
                </div>
                
                </div>
                <div className= "feed_Container">
                {/* main story has been coppied 2x */}
                <div className="friendsPostinfo">
                <a className="friendsImg" href="#"> </a>
                <div className="friendsInfo"> <a href="#" className="friendInfoLink">Novella Dickens</a>shared a 
                <a href="#" className="stories">story </a>  </div>
                </div>
                <div className="uploadedInfo">
                <div className="upImage"></div>
                </div>
                 <div className="colorBackground">
                <div className="updateInfo">
                <h3>This is my new site </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen 
                    book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                     with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                
                </div>
                <div className="emojis">
                <div className="likessection">
                <div className="likeDisplay"><i class="far fa-thumbs-up"></i> </div>
                </div>
                <div className="friendsLiked">Marsh hall and 4 others liked </div>
                <div className="numOfComments">4 comments </div>
                </div>
                <div className="responseComments">
                <textarea name="comment_Area" className="commentArea" placeholder= "Comment" rows="8" cols="80" />
                <div className="commentButtons">
                <div className="replyButton"><i class="fas fa-share"></i> </div>
                <div className="likeButton"><i class="far fa-thumbs-up"></i></div>
                </div>
                
               </div> 
                </div>
                
                </div>
                
                <div className= "feed_Container">
                <div className="friendsPostinfo">
                <a className="friendsImg" href="#"> </a>
                <div className="friendsInfo"> <a href="#" className="friendInfoLink">Novella Dickens</a>shared a 
                <a href="#" className="stories">story </a>  </div>
                </div>
                <div className="uploadedInfo">
                <div className="upImage"></div>
                </div>
                 <div className="colorBackground">
                <div className="updateInfo">
                <h3>This is my new site </h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen 
                    book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                     It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                     with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                
                </div>
                <div className="emojis">
                <div className="likessection">
                <div className="likeDisplay"><i class="far fa-thumbs-up"></i> </div>
                </div>
                <div className="friendsLiked">Marsh hall and 4 others liked </div>
                <div className="numOfComments">4 comments </div>
                </div>
                <div className="responseComments">
                <textarea name="comment_Area" className="commentArea" placeholder= "Comment" rows="8" cols="80" />
                <div className="commentButtons">
                <div className="replyButton"><i class="fas fa-share"></i> </div>
                <div className="likeButton"><i class="far fa-thumbs-up"></i></div>
                </div>
                
               </div> 
                </div>
                
                </div>

                </section>


            </div>

        )
    }



}



export default Content;