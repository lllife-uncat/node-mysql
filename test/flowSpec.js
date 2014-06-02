describe.skip("Loop", function(){

  it("Should out of loop currectly", function(){

    console.log("start");
    for(var i=0;i<100;i++){
      console.log(i);
      if(i==50) break;
    }
    console.log("end")
  });
});
