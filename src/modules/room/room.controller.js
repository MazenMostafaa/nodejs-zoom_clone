


export const initialRoom = (req, res, next) => {
    res.render('room', { roomId: req.params.room });
}