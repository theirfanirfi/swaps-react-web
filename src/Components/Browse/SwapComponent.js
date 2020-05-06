import React from "react";

import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Connection from '../Connection.js';


export default class SwapComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    getTodayDate() {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        return date;
    }

    componentDidMount() {
    }

    static = {
        status_id: PropTypes.number
    }

    state = {
        dates: [],
        startDate: null,
        endDate: null,
        focusedInput: null,
        daysSelected: 0,
        swapOn: 'Swap',
    }

    onChange = date => {
        var datees = this.state.dates;
        datees.push(date);
        this.setState({
            dates: datees,
            startDate: this.state.dates,

        }, () => {
            console.log('date added ' + date);
        });
    }

    swapRequest() {
        var url = Connection.getBaseUrl() + 'followers/swapStatus?token=' + Connection.getToken() + '&on=' + this.state.swapOn + '&' +
            '&status_id=' + this.props.status_id + '&startdate=' + this.state.startDate + '&enddate=' + this.state.endDate;

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isError || !res.isAuthenticated) {
                    alert(res.message)
                } else if (res.isAlready) {
                    alert(res.message);
                } else if (res.isSwaped) {
                    alert(res.message);
                } else {
                    alert(res.message);
                }
            })
    }

    render() {
        return (
            <div>
                <h2>Swap</h2>
                <h4>Swap on: </h4>

                <select className="form-control" onChange={(option) => {
                    this.setState({
                        swapOn: option.target.value
                    })
                }}>
                    <option value="Swap">Swap App</option>
                    <option value="Twitter" >Twitter</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Linkedin">Linkedin</option>
                </select>
                <h4>Duration: </h4>

                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, () => {
                        console.log(startDate + " : " + endDate)
                    })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
                <br />
                <br />
                <br />
                <button style={{ marginTop: '14px' }} className="btn-sm btn-primary" onClick={() => this.swapRequest()}>Swap</button>
            </div >
        )
    }
}