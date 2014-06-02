var assert = require("chai").assert;
var expect = require("chai").expect;
var db = require("../db").MyDb;
var sql = require("../sql");

/**
* Calulate execution time.
*/
function SW() {
  this.date = new Date();
  this.showTime = function(date) {
    var end = new Date() - this.date;
    console.info("Execute time: %dms", end);
  }
}

/**
* Simple sql query.
*/
describe.skip("AIA Simple select", function(){
  it("Should select case by case id success", function(done){
    db.query("select * from case_table where caseid=?", ["G1UA0000017"], function(err, rows){
      var sw = new SW();
      expect(err).to.equal(null);
      done();
      sw.showTime();
    });
  });

  it("Should select form by id success", function(done){
    db.query("select * from  listformid_table where formid =?", ["G314R600"], function(err, rows){
      var sw = new SW();
      expect(err).to.equal(null);
      done();
      sw.showTime();
    });
  });

  it("Should select warning by case id success", function(done){
    db.query("select * from tb_case_warning where caseid=?", ["G134R600"], function(err, rows){
      var sw= new SW();
      expect(err).to.equal(null);
      done();
      sw.showTime();
    });
  });
});

/**
* Complex sql query.
*/
describe.skip("AIA complex selection", function(){
  it.skip("Should select case by id success" , function(done){
    db.query("select * from case_table where caseid= ?", ["G1132198812"], function(err, rows){
      var sw = new SW();
      expect(err).to.equal(null);
      done();
      sw.showTime();
    });
  });

  it("Should select box new success", function(done){
    this.timeout(1000 * 60 * 60);
    var boxB = sql.boxSqlB;
    db.query(boxB, function(err, rows){
      var sw = new Sw();
      console.log("and box new");
      expect(err).to.equal(null);
      done();
      sw.showTime();
    });
  });

  it("Should select box success", function(done){
    this.timeout(1000 * 60 * 60);
    var boxA = sql.boxSqlAB;
    db.query(boxA, function(err, rows){
      var sw = new Sw();
      console.log("and box or boxnew");
      expect(err).to.equal(null);
      done();
      sw.showTime();
    });
  });

});
