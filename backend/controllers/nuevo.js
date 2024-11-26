const prueba = async (req, res) => {
	sesion = req.session;
	if (sesion.usuario) {
		res.status(200).json({ message: "Usuario autenticado." });
	} else {
		res.status(401).json({ message: "Usuario no autenticado." });
	}
};
