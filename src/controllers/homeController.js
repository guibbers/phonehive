exports.homePage = (req, res) => {
    res.render('index', {
        title: 'Este será o título da página',
        numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    });
    return;
};

exports.treatPost = (req, res, next) => {
    res.send(req.body);
};