
module.exports = {
    users: {},
    userList: [],
    util: require('./util'),
    handle: function (socket, action) {

        switch (action.type) {
            case 'server/addUser': {
                this.addUser(socket, action.data);
            }
            case 'server/removeUser': {
                this.removeUser(socket, action.data);
            }
            case 'server/msgTo': {
                this.msgTo(socket, action.data);
            }
            case 'server/msgAll': {
                this.msgAll(socket, action.data);
            }
            case 'server/getAllUsers': {
                this.getAllUsers(socket, action.data);
            }
        }
    },
    addUser: function (socket, data) {
        if (this.users[data.userName]) {
            socket.emit('action', { type: 'notify', data: { success: true } });
        } else {
            this.users[data.userName] = socket.id;
            this.userList.push(data.userName);
            socket.emit('action', { type: 'message', data: 'Logged in as ' + data.userName });
        }
        this.getAllUsers(socket, data);
    },
    removeUser: function (socket, data) {
        if (this.users[data.userName]) {
            this.users[data.userName] = null;
            this.util.removeFromArray(this.userList, data.userName);
        }
    },
    getAllUsers: function (socket, data) {
        socket.emit('action', this.response('notify', { 'users': this.userList }, true));
    },
    msgTo: function (socket, data) {
        if (this.users[data.userName]) {
            this.users;
        }
    },
    msgAll: function (socket, data) {
        let fromUser = this.util.getKey(socket.id);
        socket.emit('action', { type: 'message', data: { 'from': fromUser, 'message': data.message } });
    },
    response: function (type, data, success) {
        return { type, success, data }
    }
};