import React from "react";
import SingleStatus from "../SingleStatus";
import Connection from '../../Connection.js';
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from 'prop-types';
export default class StatusesProfileTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }
    state = {
        statuses: [],
        loading: true,
    }

    static = {
        statuses: PropTypes.object
    }

    componentDidMount() {
        this.setState({
            statuses: this.props.statuses,
            loading: false,
        })
    }

    renderStatuses(statuses) {

        if (this.state.statuses) {
            var comp = statuses.map((status, i) => {
                // console.log("Entered");                 
                // Return the element. Also pass key     
                return <SingleStatus key={i} status={status} />
            })
            return comp;
        }


    }

    render() {

        return (
            //  <SingleStatus statuses={this.state.statuses}/>
            <div>
                <div style={{ width: '100%', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <ClipLoader
                        size={20}
                        color={"#123abc"}
                        loading={this.state.loading}
                    />
                </div>

                {this.renderStatuses(this.state.statuses)}
            </div>
        )
    }
}