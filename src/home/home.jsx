import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import _ from 'lodash';
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.upvoke = this.upvoke.bind(this);
  }

  componentDidMount() {
    fetch(`http://hn.algolia.com/api/v1/items/1`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          feeds: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  upvoke() {
    this.setState(prevState => ({
      feeds: {                  
        ...prevState.feeds,    
        points: prevState.feeds.points + 1
      }
    }))
  }

  render() {

    const { isLoading, feeds, error } = this.state;

    var columnData = [
      {
        label: 'No of comments',
        field: 'comments',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Upvotes',
        field: 'upvotes',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Action',
        field: 'action',
        width: 50
      },
      {
        label: 'Title',
        field: 'title',
        sort: 'asc',
        width: 50
      },
      {
        label: 'Domain',
        field: 'domain',
        width: 50
      },
      {
        label: 'Username',
        field: 'username',
        width: 50
      },
      {
        label: 'Time posted',
        field: 'timePosted',
        width: 50
      }
    ];
    //column data for the datatable

    var rowData = [];
    if (feeds) {
      rowData.push({
        comments: feeds.children ? _.size(feeds.children) : 0,
        upvotes: feeds.points,
        action: <i className="fas fa-caret-up fa-2x" onClick={this.upvoke}></i>,
        title: feeds.title,
        domain: <a href={feeds.url}>{feeds.url}</a>,
        username: feeds.author,
        timePosted: moment(feeds.created_at, "YYYYMMDD").fromNow()
      })
    }
    //row data for the datatable
    var feedData = {
      columns: columnData,
      rows: rowData
    };
    //store hidedata value in localstorage
    var hideData = true;
    localStorage.setItem('hideData', hideData);
    return (
      <div>
        <React.Fragment>
          <h1>Hackers feed</h1>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            <MDBDataTable responsiveLg responsiveMd responsiveSm
              striped
              hover
              data={feedData}
            />
          ) : (
              <h3>Loading...</h3>
            )}
        </React.Fragment>
      </div>
    );
  }
}

export default Home;