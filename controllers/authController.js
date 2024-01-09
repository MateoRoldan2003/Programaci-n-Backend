exports.postLogin = (req, res) => {
    const { email, password } = req.body;

    req.session.user = {
      email: email,
      role: (email === 'adminCoder@coder.com' && password === 'adminCod3r123') ? 'admin' : 'usuario',
    };
    res.redirect('/products');
  };
  
  // Controlador de logout
  exports.logout = (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/auth/login');
    });
  };
  