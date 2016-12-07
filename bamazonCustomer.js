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


function doQueries(tableName, callback){    

      connection.query("SELECT * FROM " + tableName, function(err, res1){
      
		if (err){ 
			callback(err);
			return;
		}
			
		// Using the response to generate the table from sql 

		var tableDisplay = new Table({ 

			head: ['Item', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
		  	,colWidths: [6, 18, 18, 10, 17]

		});

		//Loop that dynamically produces the full table 
		for(i=0;i<res1.length;i++){
      		
      		tableDisplay.push(
    
			    [res1[i].item_id, res1[i].product_name, res1[i].department_name, res1[i].price, res1[i].stock_quantity] 
			
			);
      
      	}

      	console.log(tableDisplay.toString());
      		//calls the prompt user function and takes the response as an argument/parameter
      		
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
				/*Validation of input
				validate: function(value){
					if(isNaN === false){return true} 
				} */
			  }




			]).then(function(userInput) {

				// If we log that user as a JSON, we can see how it looks.
				 //console.log(JSON.stringify(userInput));

				//Sets variable to user selected item ID 
				var itemID = userInput.item;
				console.log("Request for: "+res1[itemID - 1].product_name);



				var amount = res1[itemID - 1].stock_quantity;
				console.log("Amount: "+res1[itemID - 1].stock_quantity)
				//Compare stock quantity with user quantity and stop process if the user chooses a quantity that exceeds the stock quantity 
				if(amount < userInput.howMany){

					console.log("Sorry, we do not have enough items in stock")
					console.log("Push Control + C to restart the app")
					return false; 

				};

				//Displays the new Amount remaining after order goes through
				var newAmount = amount - userInput.howMany;
				console.log("Amount remaining: "+newAmount);
				

				//Displays the total prices for the purchase 
				var total = userInput.howMany * res1[itemID-1].price;
				console.log("Order Total: "+total);




				
				
				

				

				connection.query("UPDATE storefront SET stock_quantity = ? WHERE item_id = ? ",[newAmount,itemID],function (err,res2){
					
					if (err){  
						callback(err); 
						return;
					}

					//console.log("in the update function");
					connection.query("SELECT * FROM "+ tableName, function(err,res3){

					if (err){
						callback(err);
						return;
					}

					tableDisplay = new Table({ 

						head: ['Item', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
		  						,colWidths: [6, 18, 18, 10, 17]

						});

					for(i=0;i<res3.length;i++){
      		
      					tableDisplay.push(
    
			    			[res3[i].item_id, res3[i].product_name, res3[i].department_name, res3[i].price, res3[i].stock_quantity] 
			
					);
      
      				}

      				console.log(tableDisplay.toString());

					callback(null, res3);
					
				});
					
					
				});
				
			});


	});
};



/*	request_handler(req){
		doQueries( function(err, result){
			if(err)
				report_error(err);
			else
				write_result(req, result); 

		});

	} */








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
//list('storefront');
//promptUsers();



//doQueries function handles the aync issues with ease
doQueries('storefront', function(err, result){
		if(err)
			console.log("function finished with err:"+err);
		else{
			console.log("Thank You for Shopping at Bamazon!");
			console.log("Scroll up to view purchase details");
			//console.log(result);

		}
		connection.end();
		return;
});






