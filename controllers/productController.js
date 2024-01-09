exports.getProducts = (req, res) => {
    const user = req.session.user;
  
    if (!user) {
      res.redirect('/auth/login');
    } else {
      res.render('products', { user });
    }
  };
  
  // ...
  