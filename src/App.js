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
      api: "https://0jlnpsgena.execute-api.eu-central-1.amazonaws.com/dev",
      query: "",
      key: "?api-key=gXMMGjNcvg6wBE5RCLvB57sCdQDNRZjd6UuOk72z"      
    };
  }

  handleCategory = (e) => {
    //const cat = e.target.getAttribute('data-facet');
    console.log("handleCategory")
    fetch(this.state.api + this.state.query + this.state.key,{
      crossDomain:true,
      method: 'POST',
      headers: {'Content-Type':'application/json',"Access-Control-Allow-Origin": "*"}
    })
      .then(response => {
        if (response.ok && response.json()) {
          console.log("response -> ok")
          console.log(response)
          return response.json();
        } else {
          console.log("response -> else")
          throw new Error('Oops')
        }
      })
      .then(data => {
        console.log("SUCCESS")
        this.setState({ results: data.results, isLoading: false})
      })
      .catch(error => {
        console.log("ERROR")
        console.log(error)
        this.setState({ error, isLoading: false })
      })    
  } 
  render() {
    const { isLoading, results, error } = this.state;

    if (isLoading) {
     
      return (
        <form>
        <div className="row">
        <label htmlFor="startDate">startDate</label>: 
        <DatePicker
        selected={this.state.startDate}
        onChange={this.handleStartDateChange}
        />
        </div>
        <div className="row">
        <label htmlFor="endDate">endDate </label>
        <DatePicker
        selected={this.state.endDate}
        onChange={this.handleEndDateChange}
        />
        </div>
        <button type="button" onClick={this.handleCategory}>Submit</button>
      </form>
      )
    }

    if (error) {
      return <div className="error">{error}</div>    
    }

    return (
      <div className="wrapper">
        <button data-facet="arts" onClick={this.handleCategory}>Arts</button>
        {results.slice(0, 10).map(result => (
            <div className="cards__card" key={result.title}>
              <a href={result.url} target="_blank"><h5>{result.title}</h5></a>
              <p>{result.abstract}</p>
            </div>
          ))}        
      </div>
    );    
  }
}

export default withAuthenticator(App, false, [], null, MyTheme);
