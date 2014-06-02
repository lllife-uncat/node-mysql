var m = require("mstring");


var monthly = m(function(){
  /***
   select DATE_FORMAT(image_table.sendxmldate,'%d') as Dates  ,
   count(distinct image_table.BatchNo) as TotalBatch  ,
   count(distinct c.PolicyNo) as TotalPolicy  ,
   count(distinct image_table.id) as TotalImage  ,
   sum((SELECT count(ii.id)  from case_table cc LEFT JOIN image_table ii ON cc.CaseID = ii.CaseID  where cc.IsNonScan = '1' and ii.isdelete=0  and image_table.id=ii.id )) as ImageNonScan  ,
   sum((SELECT count(ii.id) FROM image_table ii where (ii.FormID like '%W%' or ii.formid LIKE '%0400') and ii.isdelete=0 and image_table.id=ii.id)) as ImageWarning    ,
   sum(image_table.IsSendXML) as TotalXML
   from case_table c  LEFT JOIN image_table ON (image_table.CaseID=c.CaseID)
   where image_table.sendxmldate  between  '2014-6-1 00:00:00' and '2014-6-31 23:59:59'
   and image_table.isdelete=0
   and c.isrescan=0
   and c.IsSendXML=1
   and image_table.IsSendXML=1
   group by Dates  Order by image_table.scandate
  ***/
});

var batchCount = m(function(){
  /***
  select count(distinct image_table.BatchNo) as TotalBatch
  from
    case_table c
        LEFT JOIN
    image_table ON (image_table.CaseID = c.CaseID)
  where
      image_table.sendxmldate between '2013-6-1 00:00:00' and '2013-6-31 23:59:59'
  ***/
  //image_table.sendxmldate between '2013-6-1 00:00:00' and '2013-6-31 23:59:59' and image_table.isdelete = 0 and c.isrescan = 0 and c.IsSendXML = 1 and image_table.IsSendXML = 1
});

var optimizedMontly = m(function(){
  /***
  select
      DATE_FORMAT(image_table.sendxmldate, '%d') as Dates,
      count(distinct image_table.BatchNo) as TotalBatch,
      count(distinct c.PolicyNo) as TotalPolicy,
      count(distinct image_table.id) as TotalImage
  from
      case_table c
          LEFT JOIN
      image_table ON (image_table.CaseID = c.CaseID)
  where
      image_table.sendxmldate between '2013-6-1 00:00:00' and '2013-6-31 23:59:59' and image_table.isdelete = 0 and c.isrescan = 0 and c.IsSendXML = 1 and image_table.IsSendXML = 1
  group by Dates order by image_table.scandate
  ***/
});

var testSubQuery = m(function(){
  /***
  select  caseid,
  count(distinct image_table.BatchNo) as Nums
  from image_table
  where caseid like "G1UA00000%"
  group by caseid
  ***/
});

var monthly = m(function(){
  /***
    select
      DATE_FORMAT(image_table.sendxmldate, '%d') as Dates,
      count(distinct image_table.BatchNo) as TotalBatch,
      count(distinct c.PolicyNo) as TotalPolicy,
      count(distinct image_table.id) as TotalImage,
      sum((SELECT
              count(ii.id)
          from
              case_table cc
                  LEFT JOIN
              image_table ii ON cc.CaseID = ii.CaseID
          where
              cc.IsNonScan = '1' and ii.isdelete = 0 and image_table.id = ii.id)) as ImageNonScan,
      sum((SELECT
              count(ii.id)
          FROM
              image_table ii
          where
              (ii.FormID like '%W%' or ii.formid LIKE '%0400') and ii.isdelete = 0 and image_table.id = ii.id)) as ImageWarning,
      sum(image_table.IsSendXML) as TotalXML
  from
      case_table c
          LEFT JOIN
      image_table ON (image_table.CaseID = c.CaseID)
  where
      image_table.sendxmldate between '2013-6-1 00:00:00' and '2013-6-31 23:59:59' and image_table.isdelete = 0 and c.isrescan = 0 and c.IsSendXML = 1 and image_table.IsSendXML = 1
  group by Dates order by image_table.scandate
  ***/
});

    //DATE_FORMAT(image_table.sendxmldate, '%d') as Dates,
var plainQuery = m(function(){
  /***
  select
    date_format(image_table.sendxmldate, '%d') as Dates,
    count(distinct image_table.BatchNo) as TotalBatch,
    count(image_table.id) as Count
  from case_table c left join image_table on (c.caseid = image_table.caseid)
  where
  image_table.sendxmldate between '2013-6-1 00:00:00' and '2013-6-31 23:59:59' and image_table.isdelete = 0 and c.isrescan = 0 and c.IsSendXML = 1 and image_table.IsSendXML = 1
  group by Dates
  ***/
});

var imageQuery = m(function(){
  /***
  SELECT
    image_table.CaseID,
    image_table.BatchNo,
    case_table.PolicyNo,
    image_table.SendXmlDate,
    case_table.IsNonScan,
    image_table.FormID,
    image_table.IsSendXml,
    DATE_FORMAT(image_table.SendXmlDate, '%d') as SendDate
  FROM image_table left join case_table on (case_table.CaseID = image_table.CaseID)
  WHERE
    image_table.sendxmldate between '2013-6-1 00:00:00' and '2013-6-31 23:59:59'
  ***/
  //order by image_table.scandate
});

module.exports.imageQuery = imageQuery;
module.exports.plainQuery= plainQuery;
module.exports.testSubQuery = testSubQuery;
module.exports.optimizedMontly = optimizedMontly;
module.exports.batchCount = batchCount;
module.exports.monthly = monthly;
