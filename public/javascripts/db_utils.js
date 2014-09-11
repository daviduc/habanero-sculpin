var mongo = require('mongodb');                                                                                                                                                                         
var mongo_client = mongo.MongoClient;
var Db=require('mongodb').Db;
var Server=require('mongodb').Server;
var ObjectID=require('mongodb').ObjectID;
var Binary=require('mongodb').Binary;
var Grid=require('mongodb').Grid;
var GridStore=require('mongodb').GridStore;
var BSON=require('mongodb').pure().BSON;
var Code=require('mongodb').Code;
var assert=require('assert');
 

function test_mongo() {
/*    mongo_client.connect(process.env.MONGOHQ_URL, function(err, db) {
	// operate on the collection named "test"                                                                                                                                                             
	var collection = db.collection('habanero.accounts');
	// remove all records in collection (if any)                                                                                                                                                          
	db.collectionNames(function(err,names) {console.log(names); });
	console.log('removing documents...');
	collection.remove(function(err, result) {
	    if (err) {return console.error(err);};
	    console.log('collection cleared!');
	    // insert two documents                                                                                                                                                                           
	    console.log('inserting new documents...');
	    collection.insert([{name: 'tester'}, {name: 'coder'}], function(err,docs) {
		if (err) {return console.error(err);};
		console.log('just inserted ', docs.length, ' new documents!');
		collection.find({}).toArray(function(err, docs) {
		    if (err) {return console.error(err);};
		    docs.forEach(function(doc) {console.log('found document: ', doc);});
		});
	    });
	});
    });*/
};

function insert_item_record(item) {
    try {
	
	mongo_client.connect(process.env.MONGOHQ_URL,function(err,db) {
	    if(err) 
		console.log('error with insert_item_record.1: '+err); 
	    else { 
		var items=db.collection('habanero.items');
		
		//TODO : check for existing duplicate entry before inserting!
		var results = items.find({item_name:item.name});
		var doc_count=0;
		results.toArray(function(err,docs) {
		    if(err) 
			console.log("error with insert_item_record.2: " + err) ; 
		    else {
			doc_count=docs.length;
			if(doc_count==0) {
			    items.insert({company_name:item.company, _id:item.id, last_price:item.last_price, def_price:item.def_price, item_name:item.name}, function(err,doc) {
				if(err) console.log('error with insert_item_record.3: '+err); 
				db.close();
			    });
			    //db.close();
			}
			else {  
			    //possible update required on matching record
			    //there should only be one element
			    items.update({item_name:item.name},{$set: {last_price:item.last_price, def_price:item.def_price}}, function(err,results) {
				assert.equal(null,err);
				db.close();
			    });
			    //db.close();
			}
		    }});
	    }
	});  
    }
    catch(err) { console.log(err);}

};

function get_items(compname,callback) {
    try {
	var data;
	mongo_client.connect(process.env.MONGOHQ_URL,function(err,db) {
	    if(err) 
		console.log("error with get_items:" +err); 
	    else { 
		var items=db.collection('habanero.items');
		
		//TODO : check for existing duplicate entry before inserting!
		var results = items.find({company_name:compname});
		var doc_count=0;
		results.toArray(function(err,docs) {
		    if(err) 
			console.log("error with get_items: " + err) ; 
		    else {
			callback(docs);
			db.close();
		    }
		});
	    }
	});  
    }
    catch(err) { console.log(err);}
};

exports.test_mongo=test_mongo;
exports.insert_item_record=insert_item_record;
exports.get_items=get_items;
