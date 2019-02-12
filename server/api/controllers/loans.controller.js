/**
 * Get all Loans
 * @param req
 * @param res
 * @returns void
 */

/*req is an object containing information about HTTP request that raised the event*/
/*res is used to send back the desired http response*/
const Loan = require("../../models/loan").default;

var getLoans = function(req, res) {
  var p = req.params;

  Loan.find({})
    .skip((p.page-1)*100)
    .limit(100)
    .exec(function(err, loans){
      if(err){
        return res.status(500).send("Error, could not get loans.");
      }
      return res.status(200).send(loans);
  })
}

module.exports = {
  getLoans: getLoans
};
