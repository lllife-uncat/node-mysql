var m = require("mstring");

var boxA = m(function(){
  /***
    SELECT image_table.formid,case_table.BoxNo,case_table.caseID,case_table.policyno,
    case_table.NumImage,case_table.RcDate,case_table.RcUser,case_table.scandate,
    case_table.BatchRegister batchMaster,case_table.producttype doctype,
    case_table.comment_doc,case_table.comment_date,  case_table.DocStatus,
    case_table.AIAIsSubmit,case_table.BoxNew,case_table.certificateno,case_table.memberid,
    case_table.ismaster,case_table.covergroupbox
    FROM case_table  left join image_table on (case_table.caseid=image_table.caseid)
    where case_table.isdelete=0
    and image_table.isdelete=0
    and case_table.issendxml=1
    and case_table.issendtorc=0
    and case_table.isRequest_Rescan=0
    and case_table.isRequest_Original=0
    and (case_table.BoxNo='AITEBM07130153' and ifnull(case_table.BoxNew,'')='')
    group by case_table.caseid,image_table.formid
    order by case_table.CoverGroupBox,case_table.addboxdate
  ***/
});

var boxAB = m(function(){
  /***
    SELECT image_table.formid,case_table.BoxNo,case_table.caseID,case_table.policyno,
    case_table.NumImage,case_table.RcDate,case_table.RcUser,case_table.scandate,
    case_table.BatchRegister batchMaster,case_table.producttype doctype,
    case_table.comment_doc,case_table.comment_date,  case_table.DocStatus,
    case_table.AIAIsSubmit,case_table.BoxNew,case_table.certificateno,case_table.memberid,
    case_table.ismaster,case_table.covergroupbox
    FROM case_table  left join image_table on (case_table.caseid=image_table.caseid)
    where case_table.isdelete=0
    and image_table.isdelete=0
    and case_table.issendxml=1
    and case_table.issendtorc=0
    and case_table.isRequest_Rescan=0
    and case_table.isRequest_Original=0
    and ((case_table.BoxNo='AITEBM07130153' and ifnull(case_table.BoxNew,'')='') or case_table.BoxNew='AITEBM07130153')
    group by case_table.caseid,image_table.formid
    order by case_table.CoverGroupBox,case_table.addboxdate
  ***/
});


var boxB = m(function(){
  /***
    SELECT image_table.formid,case_table.BoxNo,case_table.caseID,case_table.policyno,
    case_table.NumImage,case_table.RcDate,case_table.RcUser,case_table.scandate,
    case_table.BatchRegister batchMaster,case_table.producttype doctype,
    case_table.comment_doc,case_table.comment_date,  case_table.DocStatus,
    case_table.AIAIsSubmit,case_table.BoxNew,case_table.certificateno,case_table.memberid,
    case_table.ismaster,case_table.covergroupbox
    FROM case_table  left join image_table on (case_table.caseid=image_table.caseid)
    where case_table.isdelete=0
    and image_table.isdelete=0
    and case_table.issendxml=1
    and case_table.issendtorc=0
    and case_table.isRequest_Rescan=0
    and case_table.isRequest_Original=0
    and case_table.BoxNew='AITEBM07130153'
    group by case_table.caseid,image_table.formid
    order by case_table.CoverGroupBox,case_table.addboxdate
  ***/
});


// console.log(box);
exports.boxSqlA = boxA;
exports.boxSqlB = boxB;
exports.boxSqlAB = boxAB;
