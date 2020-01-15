import React from 'react';
import { Grid, Input, Header, Button, } from 'semantic-ui-react';
import axios from 'axios';
import Tweets from './Tweets';
import Profile from './Profile';

class App extends React.Component {
  state = { tweets: [], visible: [], profile: [], search: '', tweet: '', };

  componentDidMount() {
    axios.get('/api/tweets')
      .then(res => this.setState({ tweets: res.data, visible: res.data }))
    axios.get('/api/profile')
      .then(res => this.setState({ profile: res.data }))
  }

  refresh = () => {
    axios.get('/api/profile')
      .then(res => this.setState({ profile: res.data }))
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value }, () => {
      this.updateVisible()
    });
  }

  updateVisible = () => {
    const { search, tweets } = this.state;
    if (search.length === 0)
      this.setState({ visible: tweets });
    else if (search.length >= 3) {
      axios.get(`/api/search?term=${search}`)
        .then(res => this.setState({ visible: res.data }))
    }
  }

  updateTweet = (e) => {
    this.setState({ tweet: e.target.value })
  }

  postTweet = () => {
    const { tweet, visible, } = this.state
    if (tweet) {
      axios.post('/api/tweet', { tweet })
        .then(res => this.setState({ tweet: '', visible: [...visible, res.data] }))
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Header as="h2" textAlign="center">Search</Header>
            <Input
              value={this.state.search}
              onChange={this.handleChange}
              icon={{ name: 'search', circular: true }}
              placeholder="Search..."
            />
            <hr />
            <Header as='h2' textAlign='center'>Tweet Something</Header>
            <Input onChange={this.updateTweet} value={this.state.tweet} />
            <Button color='blue' onClick={this.postTweet}>Tweet!</Button>
            <Button color='green' onClick={this.refresh}>Refresh</Button>
            <Header as="h2">Profile</Header>
            <Profile profile={this.state.profile} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={10}>
            <Header as="h1">Live Feed</Header>
            <Tweets tweets={this.state.visible} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;