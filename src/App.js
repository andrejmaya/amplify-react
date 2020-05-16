import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import { AmplifyTheme } from 'aws-amplify-react';
import { Wizard, Steps, Step } from 'react-albus';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const MySectionHeader = Object.assign({}, AmplifyTheme.sectionHeader, { background: 'orange' });
const MyTheme = Object.assign({}, AmplifyTheme, { sectionHeader: MySectionHeader });

class App extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date()
  };
  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };    

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };    
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      results: [],
      error: null,
      results: [],
      api: "https://example.execute-api.eu-central-1.amazonaws.com/dev",
      key: "?api-key=secret"      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleChange = this.handleChange.bind(this);    
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const { name, message } = this.state;
    axios.post( this.state.api + this.state.key,{ startDate: this.state.startDate, endDate: this.state.endDate }
    )
    .then(res => {
      const results = res.data;
      console.log(results)
      this.setState({ results: res.data, isLoading: false})
    })
  }  

  render() {
    const { isLoading, results, error } = this.state;

    if (isLoading) {
     
      return (
        <div className="float-left">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <label htmlFor="startDate">startDate</label>: 
              <DatePicker
              name="startDate"
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
              />
            </div>
            <div className="row">
              <label htmlFor="endDate">endDate </label>
              <DatePicker
              name="endDate"
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
              />
            </div>
            <div className="row">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      )
    }

    if (error) {
      return <div className="error">{error}</div>    
    }

    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">title</th>
            <th scope="col">url</th>
            <th scope="col">abstract</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr>
              <th scope="row">{index}</th>
              <td>{result.title}</td>
              <td>{result.url}</td>
              <td>{result.abstract}</td>
            </tr>            
            ))}  
        </tbody>
      </table>
    );    
  }
}

export default withAuthenticator(App, false, [], null, MyTheme);
