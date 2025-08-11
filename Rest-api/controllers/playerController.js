const playerModel = require("../models/playerModel");

function getPlayers(req, res,next) {
    playerModel.find()
        .populate('userId')
        .then(players => res.json(players))
        .catch(next);
}
function newPlayer(req, res, next) {
    const { name, team, height, weight, description,photo } = req.body;
    const { _id: userId } = req.user;
 playerModel.create({ name, team, height, weight, description,photo, userId })
        .then(player => res.status(200).json(player))
        .catch(next);
}
function like(req, res, next) {
    const { playerId } = req.params;
    const { _id: userId } = req.user;
    playerModel.updateOne({ _id: playerId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next);
}
function getPlayer(req, res, next) {
    const { playerId } = req.params;
    playerModel.findById(playerId)
        .populate('userId')
        .then(player => res.json(player))
        .catch(next);
}
function deletePlayer(req, res, next) {
    const { playerId } = req.params;
    const { _id: userId } = req.user;
    playerModel.findOneAndDelete({ _id: playerId, userId })
        .then(deletedOne => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = { getPlayers, newPlayer , like, getPlayer, deletePlayer };