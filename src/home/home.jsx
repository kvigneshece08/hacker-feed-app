import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    componentDidMount() {
        console.log('test');
    }
  
    render() {
      return (
        <div>
         Welcome to home page!!!
        </div>
      );
    }
  }
  
  export default Home;