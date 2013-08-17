exports.addCar = function(req,res,next) {
	// body...
	if(!req.cookies.nickname){
		res.setHeader('Content-Type', 'application/json;charset=UTF-8');
		res.send(400,{code:1024400,message:'请给自己起个名字'});
		return;
	}

	//TODO 返回当前的餐车内容.
	res.send(200,{});


}