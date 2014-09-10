require([
        //Require resources.
        "dojo/store/Memory",
        "gridx/core/model/cache/Sync",
        "gridx/Grid"
    ], function(Memory, Cache, Grid){
     
	var structure = [
            { field: 'username', name: 'Name',     width:'200px'},
	    { field: 'password', name: 'Password', width:'200px'},
	    { field: 'status',   name: 'Status',   width:auto}
	];

        //Create grid widget.
        var grid = Grid({
            id: 'accounts_grid',
            cacheClass: Cache,
            store: local_store,
            structure: structure
        });

        grid.placeAt('prefs');
	
        //Start it up.
        grid.startup();
    }
);


