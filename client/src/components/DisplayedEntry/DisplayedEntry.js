import React, { Component } from "react";
import "./DisplayEntry.css";
import NextEntry from "../Entry";
import API from "../../utils/API";

export default class DisplayedEntry extends Component {
  state = {
    storyInfo: "",
    currentEntry: [],
    nextEntry: ""
  };

  componentDidMount = () => {
    this.findStory(this.props.id);
  };
  
  findStory = id => {
    API.getStory(id)
      .then(res => {
        this.setState({ 
          storyInfo: res.data 
        }, () => {
          console.log("this is the storyInfo state", this.state.storyInfo);
      });
    })
      .catch(err => console.log("this is an error", err))
    
    API.displayRootEntry(id)
      .then(res => {
        this.setState({
          currentEntry: res.data
        }, () => {
          console.log("this is the currentEntry state", JSON.stringify(this.state.currentEntry[0].content))
        })
        console.log("this is also the current entry state....", this.state.currentEntry[0].content)
        console.log(this.state)
      })
  };

  render() {
    return (
      <div className="container">
        <div className="container" id="currentEntry">
          <h3>{this.state.storyInfo.title}</h3>
          id: {this.props.id}
          <p>
            {this.state.currentEntry.map(entry => {
              return (
                entry.content
              )
            })}
            
          </p>
        </div>
        <div className="container" id="nextEntries">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          minima?
        </div>
        <button type="button" className="btn btn-success">
          Create New Entry
        </button>
        <NextEntry />
      </div>
    );
  }
}
