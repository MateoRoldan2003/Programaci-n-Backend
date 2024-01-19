const profileController = (req, res) => {
    res.send(`Bienvenido, ${req.user.username}! Esta es tu página de perfil.`);
};

module.exports = {
    profileController,
};
