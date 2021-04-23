import React  from 'react';
import ReactPlayer from 'react-player/lazy'


export default function VideoPost(props) {

   
    return (
        <div className="videoContainer">

            <div className="videoPost">
                

            <ReactPlayer  className='player' url= {props.video} 
            width="90%" 
            height="100%"
            muted={true}
             playing={true}
             controls={true}
             
             />
            </div>
            
        </div>
    )
}
