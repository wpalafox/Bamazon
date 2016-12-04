//Declaring variables with dependencies 
var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table2');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});



connection.connect(function(err){
  
  if (err) throw err;
  console.log("connected as id " + connection.threadId);


});



//The app should then prompt users with two messages.

//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.


//instantiate
/*var table = new Table({ 

	head: ['Item', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
  	, colWidths: [8, 14, 20, 10, 20]

}); */


// table is an Array, so you can `push`, `unshift`, `splice` and friends 


//Table generator 
function list(table){

      connection.query("SELECT * FROM " + table, function(err, res) {
      
		var table = new Table({ 

			head: ['Item', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
		  	,colWidths: [6, 18, 18, 10, 17]

				});


			if (err) throw err;
        
        	// table is an Array, so you can `push`, `unshift`, `splice` and friends 

      		for(i=0;i<res.length;i++){

      		table.push(
    
			    [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity] 
			
			);
      
      	}

      		console.log(table.toString());
      		console.log("Press the Up Arrow");

	});
     
};



function promptUsers(){

	inquirer.prompt([

		  	// Here we give the user a list to choose from.
		  {
		    
		    type: "input",
		    message: "Enter an Item ID you would like to buy?",
		    name: "itemID"
		  
		  
		  },
		
		  {

		  	
		  	type: "input",
		  	message: "How many units would you like to buy?",
		  	name: "unitsNumber"


		  }




		]).then(function(user) {

			// If we log that user as a JSON, we can see how it looks.
			 console.log(JSON.stringify(user, null, 2));
		

		



		





		});


};




list('storefront');
promptUsers();
connection.end();


/*

inquirer.prompt([


	{
		type: "input".
		message: "What is the ID of the product you would like to by?"
		productID: "productID"


	},

}])

*/

