import React from 'react';


class LeftPane extends React.Component {
  render() {
    return (
        <div className='left'>
           <div>
            <input type='text'/>
            <button>Search</button>
            <ul className='users-list'>

            </ul>
          </div>
        </div>
    );
  }
}

export default LeftPane;
