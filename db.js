var mysql = require("mysql");

var configs = {
  host: "10.0.0.90",
  user: "root",
  password: "4444",
  database: "bupa2014"
};

function MyDb() {

  this.connection = mysql.createConnection(configs);

  this.connect = function(callback){
    this.connection.connect(callback);
  };

  this.query = function(sql, callback) {
    this.connection.query(sql, callback);
  };

  this.insert = function(sql, params, callback) {
    this.connection.query(sql, params, callback);
  };

  this.update = function(sql, params, callback) {
    this.connection.query(sql, params, callback);
  };

  this.close = function() {
    this.connection.end();
  };
}

exports.MyDb = new MyDb();
