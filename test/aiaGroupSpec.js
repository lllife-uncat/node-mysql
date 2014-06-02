var sql = require("./aiaGroupSpecSql");
var db = require("../db").MyDb;
var _ = require("lodash");

describe("[AIA Group]", function(){

  it.skip("Should filter collection correcyly", function(done){
    var inputs = [{ FormID: "XW"}, { FormID: "0400"}, { FormID: "XXXX" }];
    var rs = _.filter(inputs,  function(x) { return (x.FormID.indexOf("W") > -1) || (x.FormID.indexOf("0400") > -1) });

    console.log(rs);
    done();
  });

  it("Should query image success", function(done){

    this.timeout(1000*60*60);

    /**
    * Start query report.
    */
    db.query(sql.imageQuery, [], function(err, rows){

      /***
      * Find unqiue count.
      * @param {Array} inputs
      * @param {Function} func, column filter.
      * @return {Array}
      * @api {Private}
      */
      function getCount(inputs, func) {
        var rs = _.uniq(inputs, func);
        return rs;
      }

      /***
      * Find by example.
      * @param {Array} inputs.
      * @param {Object} ex
      * @return {Array}
      * @api {Private}
      */
      function find(inputs, ex) {
        var rs = _.where(inputs, ex);
        return rs;
      }

      /**
      * Filter by condition.
      * @param {Array} inputs.
      * @param {Function} func: filter condition.
      * @return {Array}
      * @api {Private}
      */
      function filter(inputs, func) {
        var rs = _.filter(inputs, func);
        return rs;
      }

      /**
      * Sort dictionary key.
      * @param {Dictionary} groups
      * @return {Array} keys.
      * @api {Private}
      */
      function sortKey(groups) {
        var keys = [];
        for(var key in groups) { keys.push(key); }
        keys.sort();
        return keys;
      }

      /**
      * Group by 'SendDate'.
      */
      var groups = _.groupBy(rows, function(x) {
        return  x.SendDate;
      });

      /**
      * Sort keys.
      */
      var keys = sortKey(groups);

      /**
      * Extract monthly report.
      */
      keys.forEach(function(key){
        console.log(key);
        var values = groups[key];

        var policies = getCount(values, function(x) { return x.PolicyNo });
        var batchs = getCount(values, function(x) { return x.BatchNo });
        var images = values.length;
        var nons = find(values, { IsNonScan: 1 });
        var warnings = filter(values, function(x) { return (x.FormID.indexOf("W") > -1) || (x.FormID.indexOf("0400") > -1) });
        var isSendXml = find(values, { IsSendXml: 1 });

        /**
        * Print outputs.
        */
        console.log("==================");
        console.log(key);
        console.log("Policy:: " + policies.length);
        console.log("Batch:: " + batchs.length);
        console.log("Image:: " + images);
        console.log("NonScan:: " + nons.length);
        console.log("Warning:: " + warnings.length);
        console.log("IsSendXml:: " + isSendXml.length);
      });

      done();
    });
  });

  it.skip("Should query simple statement success", function(done){
    this.timeout(1000*60*60);
    db.query(sql.plainQuery,[], function(err, rows){
      console.log(err);
      console.log(rows);
      done();
    });
  });

  it.skip("Should query subquery success", function(done){
    this.timeout(1000*60*60);
    db.query(sql.testSubQuery, [], function(err, rows){
      console.log(err);
      console.log(rows);
      done();
    });
  });

  /**
  * Test full query...
  * 4M
  */
  it.skip("Should query monthly report success", function(done){
    this.timeout(1000*60*60);
    db.query(sql.monthly, [], function(err, rows){
      console.log(rows);
      done();
    });
  });

  /**
  * 3M no sub query...
  */
  it.skip("Should query test report success", function(done){
    this.timeout(1000*60*60);
    db.query(sql.optimizedMontly, [], function(err, rows){
      console.log(err);
      console.log(rows);
      done();
    });
  });

  /**
  * Test batch count query...
  * BatchNo, No Index = 3M, With Index = 3M
  * SendXmlDate, No Index = 3M, With Index = M
  */
  it.skip("Should count batch number success", function(done){
    this.timeout(1000*60*60);
    db.query(sql.batchCount, [], function(err, rows){
      console.log(rows);
      done();
    });
  });
});
