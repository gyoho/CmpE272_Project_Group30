/*
 * GET home page.
 */

exports.show = function(req, res){
	//res.redirect('editor');
  res.render('editor', { title: 'CMPE 272',user:req.user });
};