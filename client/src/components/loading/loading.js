import React from "react";



class Loading extends React.Component {
    render() {
        return (

            <div id="loading" >
              
              <div className="lds-css ng-scope">
<div class="lds-gear" style={{width:'100%',height:'100%'}}><div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
</div>            
</div>
        )
    }

}

export default Loading;