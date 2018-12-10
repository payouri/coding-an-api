const Country = require(global.appRoot + '/Models/Country');

const Controllers = {

    getAllCountries: (req, res) => {
        console.log('aaa');
        Country.find((err, countries) => {
            if (err) {
                res.status(500).json({
                    err
                });
            }
            res.status(200).json({
                countries
            });
        });

    },

    getCountryById: (req, res) => {

        //Mongoose prévoit une fonction pour la recherche d'un document par son identifiant
        Country.find({
            id: req.params.country_id.toUpperCase()
        }, (err, country) => {
            if (country.length > 0) {
                if (err) {
                    res.status(500).json({
                        err
                    });
                }
                res.status(200).json(country);
            }else {
                res.status(404).send({
                    message: 'Not Found'
                });
            }
        });

    },

    addNewCountry: (req, res) => {
        let country = new Country({
            id: req.body.id,
            name: req.body.name,
            capital: req.body.capital,
            zone: req.body.zone,
            language: req.body.language
        });
        country.save((err) => {
            if (err) {
                res.status(500).json({
                    err
                });
            }
            res.status(200).json({
                message: `Bravo, le pays: ${country.name} est maintenant stockée en base de données`
            });
        });
    },

    updateCountry: (req, res) => {
        // On commence par rechercher le pays souhaitée
        Country.find({
            id: req.params.country_id.toUpperCase()
        }, (err, country) => {
            if (err) {
                res.status(500).json({
                    err
                });
            }
            // Mise à jour des données du country
            country = new Country({
                id: req.body.id,
                nom: req.body.name,
                capital: req.body.capital,
                zone: req.body.zone,
                language: req.body.language
            });
            country.save(err => {
                if (err) {
                    res.status(500).json({
                        err
                    });
                }
                // Si tout est ok
                res.status(200).json({
                    message: `Bravo, les données du pays: ${country.name} ont été mises à jour`
                });
            });
        });
    },

    deleteCountry: (req, res) => {
        Country.remove({
            id: req.params.country_id.toUpperCase()
        }, (err, country) => {
            if (err) {
                res.status(500).json({
                    err
                });
            }
            res.status(200).json({
                message: `Bravo, pays ${country.nom} supprimée`
            });
        });
    }
};

module.exports = (function () {
    return Controllers;
})();