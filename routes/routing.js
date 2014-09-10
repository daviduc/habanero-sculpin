module.exports= function(app,passport) {
    
    var fs=require('fs');
    var db_utils=require('../public/javascripts/db_utils.js');
    var client_socket;

    app.io.route('ready', function(request) {
        console.log('from socket ready: start');
        //security risk here
        //if there is another call into this route while the previous call from a different
        //client hasn't finished authenticating with the twitter apis, then the previous client's
        //oauth tokens will be used for the current user's api calls, not good
        //this need to be fixed by passing in this instance of client socket to a function
        //that completes the user authentication, but i couldn't figure it out easily for now
        //since i'm using passport middleware for the authentication, need to get in front of that
        //in other words, client_socket should NOT have file scope here
        //TO DO fix client_socket security/scope issue
        client_socket=request.socket;  //called right at the start of twitter user authentication
        //console.log('from socket ready: sessionID=' + request.socket.handshake.sessionId);
        console.log('from socket ready : socket id = ' + request.socket.id);
    });

};
