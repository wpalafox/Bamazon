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


//Prints the table from the mySQL database 
function list(table){

      connection.query("SELECT * FROM " + table, function(err, res){
      
		var tableDisplay = new Table({ 

			head: ['Item', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
		  	,colWidths: [6, 18, 18, 10, 17]

				});


			if (err) throw err;
        
        	// table is an Array, so you can `push`, `unshift`, `splice` and friends 

      		for(i=0;i<res.length;i++){

      		tableDisplay.push(
    
			    [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity] 
			
			);
      
      	}

      		console.log(tableDisplay.toString());
      		//calls the prompt user function and takes the response as an argument/parameter
      		
      		promptUsers(res);
      		

		
	});
     
};





function updateTable



//Prompts users for the specific item they want, and how many units
function promptUsers(res){

	
		inquirer.prompt([

		  	// Here we give the user a list to choose from.
		  {
		    
		    type: "input",
		    message: "Enter an Item ID you would like to buy",
		    name: "item"
		  
		  },
		
		  {

		  	type: "input",
		  	message: "How many units?",
		  	name: "howMany"
		
		  }




		]).then(function(userInput) {

			// If we log that user as a JSON, we can see how it looks.
			 //console.log(JSON.stringify(userInput));

			//Sets variable to user selected item ID 
			var itemID = userInput.item;
			console.log("itemID: "+userInput.item);

			var amount = res[itemID - 1].stock_quantity;
			amount = amount - 1;
			console.log("new amount: "+amount);
			
			connection.query("UPDATE storefront SET item_id = ?",amount,function (error,resHere){
				//	if (error) throw error;
				console.log("in the update function");
			
			});
			
			

			
			




			//console.log(res[itemID].stock_quantity);
		





		});


};


/*

connection.query("SELECT * FROM storefront", function(err2, upRes){
      
			var tableDisplayOuter = new Table({ 

			head: ['Item', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
		  	,colWidths: [6, 18, 18, 10, 17]

				});


			//if (err2) throw err2;
        
        	// table is an Array, so you can `push`, `unshift`, `splice` and friends 

      		for(i=0;i<upRes.length;i++){

      		tableDisplayOuter.push(
    
			    [upRes[i].item_id, upRes[i].product_name, upRes[i].department_name, upRes[i].price, upRes[i].stock_quantity] 
			
			);
      
      		}

			console.log(tableDisplayOuter.toString());      		
      		console.log("Stock Remaining: "+upRes[itemID-1].stock_quantity);

      		});


*/















/*
function testFunction(){ 

	connection.query(
				  
	'UPDATE storefront SET stock_quantity = ? Where item_id = ?',
	
	[49, 3],
//Need to make response global

		function (err, res){

			
			if (err) throw err;
			
			console.log('Changed ' + res.changedRows + ' rows');
				 
		
		}); 
	

};  

*/







//testFunction();
list('storefront');

//promptUsers();

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

