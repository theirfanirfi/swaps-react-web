import React from "react";
import Connection from '../Connection';
export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', image: null, imageList: [] };
    this.onPick = this.onPick.bind(this)
  }

  // static = {
  //         callBack: PropTypes.func
  // }

  onPick(image) {
    this.setState({ image: image })
  }

  async createPost() {
    var url = Connection.getBaseUrl() + "status/compose";
    var formData = new FormData();
    formData.append("status", this.state.value);
    formData.append("token", Connection.getToken());
    await fetch(url, {
      method: 'Post',
      body: formData
    },
    )
      .then(res => res.json())
      .then(res => {
        alert(res.message);
      })
  }

  render() {
    return (

      <div className="create-post">
        <div className="row">
          <div className="col-md-7 col-sm-7">
            <div className="form-group">
              <img src={Connection.getProfileImage()} alt="" className="profile-photo-md" />
              <textarea name="texts" id="exampleTextarea" cols={30} rows={1} className="form-control" onChange={(text) => { this.setState({ value: text.target.value }) }} placeholder="Write what you wish"  >
                {this.state.value}
              </textarea>
            </div>
          </div>
          <div className="col-md-5 col-sm-5">
            <div className="tools">

              <button onClick={() => this.createPost()} className="btn btn-primary pull-right">Publish</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <a href="#"><i style={{ margin: 6, color: '#6d6e71', fontSize: 16 }} className="fa fa-tag" /></a>

          </div>
        </div>
      </div >
    )
  }
}