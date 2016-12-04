var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

});

connection.query("SELECT * FROM storefront", function(err, res) {
  if (err) throw err;
  console.log(res);
  });


function list(table) {

      connection.query("SELECT * FROM " + table, function(err, res) {
        
        if (err) throw err;
        console.log(res);
      
      });
     
};

function insert(item) {   
      
      connection.query("INSERT INTO storefront SET ?", item, 
        function(err, res) {
          
          if (err) throw err;
          console.log(res);

		}); 

}; 





my dummyObject = {

		item_id: 0001,
		producted_name: "Golden Buddha",
		department_name: "Zen"
		price: 200
		stock_quantity: 1 

}


insert(dummyObject);
list('storefront');






connection.end();