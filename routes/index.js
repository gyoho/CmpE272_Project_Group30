/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Wireframe Web App',user:req.user });
};