return (
    <div className="modalContainer ">


        <div className="modalHeader">
            <div className="chatFriendName" >{this.props.chFriendsName} <button className="close" onClick={this.props.onClose}>X</button></div>
        </div>



        <section className=" ">

            {this.state.allUserPost.length ? (

                <div className="messageDisplay">
                    {this.props.allChatInfo.map(content => {

                        return (


                            <div className="theMessages" key={chats._id} >


                                <div className="colorBackground">


                                    <div className="mapMesages">{
                                        content.comments.map((message) =>
                                            <div className="sender"><span> <strong>{message.sender} </strong>  &nbsp; </span>   {message.user}</div>
                                        )}


                                    </div>
                                </div>

                            </div>

                        );
                    })
                    })}
                </div>

            ) : (
                    <h1>No recent post to display</h1>
                )}



        </section>
                    
        <div className="messageSection">


                <div ><textarea name="content" value={this.state.content} onChange={this.handleChange} className="textMessage" placeholder="type your message here"></textarea></div>
                </div>

                <div className="messageBtnDiv">

                <button type="submit" className="messageBtn" onClick={() => this.sendChat(this.props.messageID)}>  send    </button>

                </div>
        
    </div>

);
}
