import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true};
  }

  componentDidMount() {
    console.log('test');
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

  render() {

    const { isLoading, feeds, error } = this.state;
    console.log(feeds); // api data to be integrated
    var feedData = {
      columns: [
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
      ],
      rows: [{
        comments: 34,
        upvotes: 82,
        action: <i class="fas fa-caret-up fa-2x"></i>,
        title: "companies are using smartphones locations to help the advertisers to reach them",
        domain: <a href="www.mytimes.com">mytimes.com</a>,
        username: "pcl",
        timePosted: "3 hours ago",
       },
       {
        comments: 11,
        upvotes: 12,
        action: <i class="fas fa-caret-up fa-2x"></i>,
        title: "Madoff's victims are getting closed $19B back",
        domain: <a href="www.bloomberg.com">bloomberg.com</a>,
        username: "motiw",
        timePosted: "1 hours ago",
       }]
    }
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