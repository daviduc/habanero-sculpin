var item_store,orig_store,query_store;
var item_grid;
var item_store_elements;

require(['dojo/store/Memory'],initialize_store);

io.on('list_items', function(data) {
    item_store_elements=JSON.parse(data.message);
    pop_item_store(item_store_elements);
});

io.emit('get_items', {message:JSON.stringify({name:'constitution ale'})});

//items need to be an array of JSON obj
function pop_item_store(items) {
    var desc;
    //var remove_list = item_store.data.map(function(rec) { return rec.id;});
    orig_store.idProperty='id';
    //for(var i =0; i<remove_list.length; i++) item_store.remove(remove_list[i]);
    items.forEach(function(item) {
        desc='<button type="button" onclick="createAccountsGrid()">'+item.last_price+'</button>';
        orig_store.put({id:item._id,name:item.item_name, company_name: item.company_name, default_price:item.def_price, description: desc, last_price:item.last_price},{overwrite:true});
    });

};


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


function store_ready(store) {
    console.log('store is ' + typeof store);
    item_store=query_store=orig_store=store;
    query_store = orig_store.query({id:/.*/}); //query for everything to produce observable result set that includes all
    query_store.idProperty='id';
    query_store.observe(store_observer,true);

};

function store_observer(object, removedFrom, insertedInto) {
    //console.log('changed object id is ' + object.id);
    //console.log('removedFrom is ' + removedFrom);
    //console.log('insertedInto is ' + insertedInto);
    item_store.idProperty='id';
    item_store.put(object,{overwrite:true});
    item_grid =dijit.byId('items_table');
    item_grid.model.clearCache();
    item_grid.model.setStore(item_store);
    item_grid.body.refresh();

};

function update_prices() {
    console.log('update_prices called');
};



