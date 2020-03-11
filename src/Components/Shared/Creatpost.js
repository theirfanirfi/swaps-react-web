import React from "react";
export default class Sidebar extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: '',image: null,imageList: []};
        this.onPick = this.onPick.bind(this)
    }

    // static = {
    //         callBack: PropTypes.func
    // }

    onPick(image) {
      this.setState({image: image})
    }

    render(){
        return(

            <div className="create-post">
            <div className="row">
              <div className="col-md-7 col-sm-7">
                <div className="form-group">
                  <img src="images/users/user-1.jpg" alt="" className="profile-photo-md" />
                  <textarea name="texts" id="exampleTextarea" cols={30} rows={1} className="form-control" onChange={(text) => {this.setState({value: text.target.value})}} placeholder="Write what you wish"  >
                  {this.state.value}
                  </textarea>
                </div>
              </div>
              <div className="col-md-5 col-sm-5">
                <div className="tools">
                  <ul className="publishing-tools list-inline">
                    {/* <li><a href="#"><input type="file" className="ion-images" /></a></li> */}


      <li>


      </li>


                    <li><a href="#"><i className="ion-ios-videocam" /></a></li>
                    {/* <li><a href="#"><i className="ion-map" /></a></li> */}
                  </ul>
                  <button onClick={() => {alert(this.state.value)} } className="btn btn-primary pull-right">Publish</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}