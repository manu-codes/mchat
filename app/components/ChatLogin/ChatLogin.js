/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 200,
    },
};


class ChatLogin extends Component {
    constructor(props, context) {
        super(props, context);
        this.logon = this.logon.bind(this);
        this.setName = this.setName.bind(this);
    }
    logon() {
        if (this.state.userName)
            this.props.ping('server/addUser', {userName: this.state.userName});
    }
    setName(e) {
        this.setState({userName: e.currentTarget.value});
    }

    render() {
        return (
                <div style={styles.container}>

                    <h1>Enter Chat Room</h1>
                    <TextField onChange={this.setName}
                        hintText="Enter your name"
                    /><br />
                    <RaisedButton
                        label="Logon"
                        secondary={true}
                        onClick={this.logon}
                    />
                </div>
        );
    }
}

export default ChatLogin;
