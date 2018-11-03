

module.exports = {
    getUserBills: (req, res) => {
        const db = req.app.get('db')
        db.get_user_bills(req.params.user)
            .then(userBills => res.status(200).send(userBills))
            .catch(() => res.status(500).send())
    }
}