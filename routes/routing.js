module.exports= function(app,passport) {
    
    var fs=require('fs');
    var debug=require('debug')('habpin');
    var db_utils=require('../public/javascripts/db_utils.js');
    var client_sockets=[];

    app.io.route('ready', function(request) {
        debug('from socket ready: start');
        //security risk here
        //if there is another call into this route while the previous call from a different
        //client hasn't finished authenticating with the twitter apis, then the previous client's
        //oauth tokens will be used for the current user's api calls, not good
        //this need to be fixed by passing in this instance of client socket to a function
        //that completes the user authentication, but i couldn't figure it out easily for now
        //since i'm using passport middleware for the authentication, need to get in front of that
        //in other words, client_socket should NOT have file scope here
        //TO DO fix client_socket security/scope issue
        client_sockets.push(request.socket);  //called right at the start of twitter user authentication
        //console.log('from socket ready: sessionID=' + request.socket.handshake.sessionId);
        debug('from socket ready : socket id = ' + request.socket.id);
    });

    app.io.route('get_items', function(request) {
	debug('get_items handler');
	var msg_data = JSON.parse(request.data.message);
	if(valid_socket(request.socket.id)) {
	    db_utils.get_items(msg_data.name, function(list_items) {
		request.socket.emit('list_items',{message:JSON.stringify(list_items)});
	    });
	}
    });

    app.io.route('add_item', function(request) {
	debug('add_item handler');
	var msg_data = JSON.parse(request.data.message);
	if(valid_socket(request.socket.id)) {
	    msg_data.id=createUUID();
	    db_utils.insert_item_record(msg_data);
	}
    });

    function valid_socket(socket_id) {
	var dup_check=client_sockets.map(function(item,index) {
	      var ret_val =0 ; 
	      if(item.id == socket_id) ret_val=1; 
	      return ret_val;
            }).reduce(function(pval,cval) { return pval+cval;},0);
        if(dup_check==0) return false; 
	else return true;
    };

    function createUUID() {
	// http://www.ietf.org/rfc/rfc4122.txt
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
    }
};
