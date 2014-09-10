//var observer_handle;
var item_store;
//var local_results;
var button_value="$4.99";
var aspect=require(["dojo/aspect"]);

function initialize_store(mem_class) {
    //perform some initialization of new Memory instance
    //before passing to store_ready
    //make result sets from queries observable
    var def_store;
    require(['dojo/store/Observable'], function(obs) { 
	def_store = new obs(new mem_class());	//obs allows for doing query_results.observe(func, true)
	store_ready(def_store);
    });
};

try {
    require(['dojo/store/Memory'],initialize_store);
} catch(err) {console.log(err)};


function store_ready(store) {
    console.log('store is ' + typeof store);
    item_store=store;
    //aspect.after(item_store,onModulesLoaded, console.log("inside aspect.after"),true);
    //item_store.put({id:'item_0',title:'sculpin',description:'<button type="button" onclick="console.log(\'handler for test button\')">TEST</button>'});
    item_store.put({id:'item_0',title:'sculpin',description:'<button id="sculpin_button" type="button" onclick="createAccountsGrid()"></button>'});
    item_store.put({id:'item_1',title:'nitro frantic',description:'<button id="nitrofrantic_button" type="button" onclick="createAccountsGrid()"></button>'});
    item_store.put({id:'item_2',title:'youngs stout',description:'<button id="youngsstout_button" type="button" onclick="createAccountsGrid()"></button>'});
    item_store.put({id:'item_3',title:'red chair',description:'<button id="redchair_button" type="button" onclick="createAccountsGrid()"></button>'});
    
};

function store_observer(object, removedFrom, insertedInto) {
    console.log('changed object id is ' + object.id);
    console.log('removedFrom is ' + removedFrom);
    console.log('insertedInto is ' + insertedInto);

};

function update_prices() {
    $("#sculpin_button").html(button_value);
    $("#nitrofrantic_button").html(button_value);
    $("#youngsstout_button").html(button_value);
    $("#redchair_button").html(button_value);
    
};



