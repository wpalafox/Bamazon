//Requiring various keys and NPM packages
var mysql 	  = require("mysql");
var inquirer  = require("inquirer");
var Table     = require("cli-table2");


//Generate Connection 

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

///////////////////////////////////////////

//Prompt Function 

//Function that captures user inpt
function UI(){
	//Prompts the user with a list of options
	inquirer.prompt(
		{
			type: "list",
			name: "userChoice",
			message: "Welcome to the Bamazon Manager App",
			choices: ["View Products for Sale", "View Low Inventory", "Add Stock to Inventory", "Add New Product", "End"]
		}
	).then(function(userInput) {
		//Switch case to handle the various responses
		switch(userInput.choices) {
			case "View Products for Sale":
				displayProducts();
				break;
			case "View Low Inventory":
				viewLowInventory();
				break;
			case "Add Stock to Inventory":
				addToInventory();
				break;
			case "Add New Product":
				addProduct();
				break;
			case "End":
				exit();
				break;
			default:
				console.log("Error");
		}
	})
}

/////////////////////////////////////////////////


function end() {
	console.log("Good Bye!");
	connection.end();
};

/////////////////////////////////////////////////







function displayProducts(tableName){   


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
      
      	};

	});


};







UI();




