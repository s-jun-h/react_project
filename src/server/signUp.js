app.post('/signup', function(req, res){
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var accessToken = req.body.accessToken;
    var refreshToken = req.body.refreshToken;
    var useseqnum = req.body.useseqnum;
    console.log(userEmail, userPassword, accessToken, refreshToken, useseqnum);
    var sql = "INSERT INTO `fintech`.`user` " +
    "(`user_id`, `user_password`, `phone`, `accessToken`, `refreshToken`, `userseqnum`)"+
    " VALUES (?,?,?,?,?,?)";
    connection.query(sql,[userEmail,
        userPassword,
        "010",
        accessToken ,
        refreshToken,
        useseqnum ],function(err, result){
        if(err){
            console.error(err);
            throw err;
        }
        else {
            res.json(1);
        }
    })
})