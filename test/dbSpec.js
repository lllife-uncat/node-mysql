var assert = require("chai").assert;
var expect = require("chai").expect;
var db = require("../db").MyDb;

describe("MySql", function(){

  it.skip("Connect mysql ok.", function(done){
    db.connect(function(err){
      expect(err).to.equal(null);
      done();
    });
  });

  it("Query data ok.", function(done){
    db.query("select * from buserinfo", function(err, rows){
      expect(err).to.equal(null);
      expect(rows).to.not.equal(null);
      console.log(rows);
      done();
    });
  });

  it.skip("Should query data successful.", function(done){

    var user = {
      Username: "User",
      Password: "Password",
      Firstname: "Firstname",
      Lastname: "Lastname",
      IsDelete: 0,
      Position: "Test Position",
      CreateDate: new Date()
    };

    db.insert("INSERT INTO buserinfo SET ?", user, function(err, rs){
      expect(err).to.equal(null);
      done();
    });

  });

  it("Should update data successful", function(done){
    var user = {
      Username: "YYYYYYYYYYYY",
      Password: "YYYYYYYYYYYY",
    };

    db.update("UPDATE buserinfo SET ? WHERE Username = ?", [user, "XXX"] , function(err, rs){
      expect(err).to.equal(null);
      done();
    });

  });

});














