import React from 'react';


class LeftPane extends React.Component {

  constructor() {
    super();
    this.state = {users: []};
  }
  componentWillReceiveProps(nextProps) {
    // if(nextProps.users)
    if (nextProps.response && nextProps.response.notification &&
      nextProps.response.notification.users) {
      this.setState({users: nextProps.response.notification.users});
    }
  }
  render() {
    console.log(this.state.users);
    return (
      <div className='left'>
        <div>

          <ul className='users-list'>
            {
              this.state.users.map((user) => <li key={user}>{user}</li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default LeftPane;
