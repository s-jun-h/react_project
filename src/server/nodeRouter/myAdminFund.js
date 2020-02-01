/*
    my admin fund 리스트 가져오기
*/
app.post('/myAdminFund', function(req, res){
    var userEmail = req.body.userEmail;
    var fundStage = req.body.fundStage;
    console.log('userEmail : ', userEmail);
    console.log('fundStage : ', fundStage);

    //var sql = "SELECT * FROM funds WHERE fund_id in (SELECT fund_id FROM funds_ongoing WHERE invest_email = (?) and stage = (?))";
    var sql = "select * from funds where register_email = (?) and stage = (?)"
    connection.query(sql, [userEmail, fundStage],
        function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            console.log('result',result);
            res.json({
                fundList : result
            });
        }
    })
})
