import React from "react";
import './Track.css'

class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction(){
        if (this.props.isRemoval){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        }else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }
    addTrack(){
        this.props.onAdd(this.props.track)  //Checking if this track that we trying to add has an id that already exsist, if it does it willnot be added, if it doesnot it will be pushed into our playlist and our state will be updated 
    }
    removeTrack(){
        this.props.onRemove(this.props.track)
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}
export default Track;