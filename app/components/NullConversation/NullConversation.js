import React from 'react';
import Forum from
'material-ui/svg-icons/communication/forum';

const styles = {
  container: {
      textAlign: 'center',
      paddingTop: 200,
  },
};


class NullConversation extends React.Component {
  render() {
    return (
      <div style={styles.container}>

                    <h2>Start Chat</h2>
                   <br />
                    <Forum/>
                </div>
    );
  }
}

export default NullConversation;
