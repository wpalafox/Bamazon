const mysql = require("mysql");
const inquirer = require("inquirer");
const Table     = require("cli-table2");
var tableName = 'storefront';

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

var displayTable = function(){

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


        console.log(tableDisplay.toString());

        promptManager(res1);

  });

};

// Function for adding an item into the store
function addItem() {
  inquirer.prompt([
    {
      type: "input",
      name: "productName",
      message: "What is the name of the product?"
    }, {
      type: "input",
      name: "department",
      message: "What department does it fit into?"
    }, {
      type: "input",
      name: "price",
      message: "What is the price of the item?"
    }, {
      type: "input",
      name: "quantity",
      message: "How many of the item are available?"
    }
  ]).then(function(val) {
    connection.query("INSERT INTO storefront (product_name, department_name, price, stock_quantity) VALUES ('" +
    val.productName + "','" + val.department + "'," + val.price + "," + val.quantity + ");",
    function(err, res) {
      if (err) {
        throw err;
      }
      console.log("Item added to Bamazon!");
      displayTable();
    });
  });
}

// function for adding quantity
function addQuantity() {
  inquirer.prompt([
    {
      type: "input",
      name: "productName",
      message: "What product are you updating?"
    }, {
      type: "input",
      name: "newQuantity",
      message: "How much of this item are you adding?"
    }
  ]).then(function(val) {
    connection.query(
      "UPDATE storefront SET stock_quantity = stock_quantity+" +
      val.newQuantity + " WHERE product_name='" + val.productName + "'",
      function(err, res) {
        if (err) {
          throw err;
        }

        if (res.affectedRows === 0) {
          console.log("That item does not seem to exist at this time. Try selecting a different item.");
          displayTable();
        }
        else {
          console.log("Items have been added to the inventory!");
          displayTable();
        }
      });
  });
}

function viewLowInventory(){

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
          
        
      if(res1[i].stock_quantity <= 5){
        
        tableDisplay.push(
          [res1[i].item_id, res1[i].product_name, res1[i].department_name, res1[i].price, res1[i].stock_quantity] 
      
          );
        }

        };


        console.log(tableDisplay.toString());


  });















}



function promptManager(res1) {
  inquirer.prompt([
    {
      type: "rawlist",
      name: "choice",
      message: "What would you like to do?",
      choices: ["Add New Item", "Add Quantity to Existing Items", "View Low Inventory"]
    }
  ]).then(function(val) {
    if (val.choice === "Add New Item") {
      addItem();
    }
    if (val.choice === "Add Quantity to Existing Items") {
      addQuantity();
    }
     if (val.choice === "View Low Inventory") {
      viewLowInventory();
    }
  });
}

displayTable();
