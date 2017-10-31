
module.exports = {
    users: {},
    userList: [],
    util: require('./util'),
    handle: function (socket, action) {
        console.log('handler')
        switch (action.type) {
            case 'server/addUser': {
                this.addUser(socket, action);
                break;
            };
            case 'server/removeUser': {
                this.removeUser(socket, action);
                break;
            };
            case 'server/msgTo': {
                this.msgTo(socket, action);
                break;
            };
            case 'server/msgAll': {
                this.msgAll(socket, action);
                break;
            };
            case 'server/getAllUsers': {
                this.getAllUsers(socket, action);
                break;
            };
            default: break;
        }
    },
    addUser: function (socket, action) {
        let data = action.data;

        if (this.users[data.userName]) {
            socket.emit('action', this.response('notify', { 'users': this.userList, message: 'Already logged in the same name' }, action, false));

        } else {
            this.users[data.userName] = socket.id;
            this.userList.push(data.userName);
            socket.emit('action', this.response('message', { 'user': data.userName, message: 'Logged in' }, action, true));
        }
        this.getAllUsers(socket, action);
    },
    removeUser: function (socket, action) {
        if (this.users[action.data.userName]) {
            this.users[action.data.userName] = null;
            this.util.removeFromArray(this.userList, action.data.userName);
        }
        console.log('remove')
        this.getAllUsers(socket, action);
    },
    getAllUsers: function (socket, action) {
        socket.emit('action', this.response('notify', { 'users': this.userList }, action, true));
    },
    msgTo: function (socket, data) {
        if (this.users[data.userName]) {
            this.users;
        }
    },
    msgAll: function (socket, data) {
        let fromUser = this.util.getKey(socket.id);
        socket.emit('action', { type: 'message', data: { 'from': fromUser, 'content': data.message } });
    },
    response: function (type, res, action, success) {
        let data = { ...res, success, req: action.type };
        return { type, data }
    }
};