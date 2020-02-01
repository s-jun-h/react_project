// app.post('/myFundStageNumber', function(req, res){
//     var userEmail = req.body.userEmail;
//     console.log('userEmail : ', userEmail);

//     var sql = "select stage,count(*) from funds_ongoing, funds where funds_ongoing.fund_id = funds.fund_id and invest_email = (?) group by stage;";
//     connection.query(sql, [userEmail],
//         function(err, result){
//         if(err){
//             console.error(err);
//             throw err;
//         }
//         else {
//             console.log('result',result);
//             res.json({
//                 data : result
//             });
//         }
//     })
// })