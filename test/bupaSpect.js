var expect = require("chai").expect;
var db = require("../db").MyDb;

describe("[Bupa DB]", function(){

  it("Should insert rework table successful", function(done){

    var rework = {
//       ReworkID: 10, // this field is auto increment.
      CreateDate: new Date(),
      CreateUser: "UnitTest",
      Reference: "14000000090",
      ReworkReason: "UnitTest",
      ReceiveDate: new Date(),
      IsDelete : 0,
      DeleteDate: new Date(),
      DeleteUser: "UnitTest",
      Status: "Register",
      RegisterDate: new Date(),
      RegisterUser: "UnitTest",
      ScanDate: new Date(),
      ScanUser: "UnitTest",
      IndexDate: new Date(),
      IndexUser: "UnitTest",
      AdminDate: new Date(),
      AdminUser: "UnitTest",
      CancelDate: new Date(),
      CancelUser: "UnitTest",
      IsGenerate : 0,
      IsUpload : 0
    };

    db.insert("INSERT INTO breworkinfo SET ?", rework, function(err, data){
      expect(err).to.equal(null);
      expect(data.affectedRows).to.equal(1);
      done();
      //expect(data.ReworkdID).to.equal(10);
    });


  });
});
