

module.exports = {
  evaluate : function(query) {

    var num = (Math.random()*10) + 1,
        isLegit;

    if (num > 5) isLegit = true;
    else isLegit = false;

    return isLegit; 

  }
}
