
module.exports = {
    users: {},
    userList: [],
    util: require('./util'),
    handle: function (socket, io, action) {
        switch (action.type) {
            case 'server/addUser': {
                this.addUser(socket, io, action);
                break;
            };
            case 'server/removeUser': {
                this.removeUser(socket, action.data.userName);
                break;
            };
            case 'server/msgTo': {
                this.msgTo(socket, io, action, );
                break;
            };
            case 'server/msgAll': {
                this.msgAll(socket, action);
                break;
            };
            case 'server/getAllUsers': {
                this.getAllUsers(socket, io, action);
                break;
            };
            default: break;
        }
    },
    addUser: function (socket, io, action) {
        let data = action.data;

        if (this.users[data.userName]) {
            socket.emit('action', this.response('notify', { 'users': this.userList, message: 'Already logged in the same name' }, action, false));

        } else {
            this.users[data.userName] = socket.id;
            this.userList.push(data.userName);
            socket.emit('action', this.response('message', { 'user': data.userName, message: 'Logged in' }, action, true));
        }
        this.getAllUsers(socket, io, action);
    },
    removeUser: function (socket, io, userName) {
        userName = userName || this.util.getKey(this.users, socket.id);
        console.log('logged out', userName);
        if (this.users[userName]) {
            this.users[userName] = null;
            this.util.removeFromArray(this.userList, userName);
        }
        this.getAllUsers(socket, io);
    },
    getAllUsers: function (socket, io, action) {
        console.log('active users', this.userList.length)
        io.sockets.emit('action', this.response('notify', { 'users': this.userList }, action, true));
    },
    msgTo: function (socket, io, action) {
        let sender = this.util.getKey(this.users, socket.id);
        let destination = io.sockets.connected[this.users[action.data.to]];
        destination && destination.emit('action', this.response('message', { 'content': action.data.content, sender }, action, true));
    },
    msgAll: function (socket, data) {
        let fromUser = this.util.getKey(this.users, socket.id);
        socket.emit('action', { type: 'message', data: { 'sender': fromUser, 'content': data.message } });

    },
    response: function (type, res, action, success) {
        let req = (action && action.type) || '',
            data = { ...res, success, req };
        return { type, data }
    }
};