import React from "react";


class Featurelist extends React.Component {
    state={
    features:[
        {icon:"fa fa-image fa-2x", bigtext:"see photo", littletext:"from friends in news feed"},
        {icon:"fa fa-share fa-2x", bigtext:"see photo", littletext:"from friends in news feed"},
        {icon:"fa fa-search fa-2x", bigtext:"see photo", littletext:"from friends in news feed"}
    ]
};

    render(){
        const rows = this.state.features.map(function(feature){
            return(
                
                <li key ={feature.icon}>
                <h3 className= "keyFeatures">
                <i className= {feature.icon}></i>
                <span>
                    <strong> {feature.bigtext} </strong>
                    <small> {feature.littletext} </small>
                </span>
                </h3>
                </li>
               
)

    
            });
            return(
                <div>
                    <h2 className= "col-md-11 featurList hidden-xs">
                    connect with friends around the world
                    on Roots
                    </h2>
                    <ul className="ds-btn hidden-xs">
                    {rows}
                    </ul>
                </div>
            )
  

            
         
    }
};


export default Featurelist;