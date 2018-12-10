const Role = require(global.appRoot + '/Models/Role'), 
    Permission = require(global.appRoot + '/Models/Permissions');



const Controllers = {
    getPermissions: (req, res) => {
        Permission.find((err, perms) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(perms);
        })
    },
    getRoles: (req, res) => {
        Role.find((err, roles) => {
            if(err) res.status(500).json(err);
            res.status(200).json(roles);
        })
    },
    createPermission: (req, res) => {
        if(req && req.body && req.body.label) {
            let perm = new Permission({
                label: req.body.label,
                group: req.body.group || null,
                active: false || req.body.active,
            })
            perm.save(err => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({err});
                }
                return res.status(200).json({
                    message: `${perm.label}, est maintenant stockée en base de données`
                });
            });
        }
        else 
            return res.status(400).json({message: 'missing fields'});
    },
    createRole: async (req, res) => {
        console.log(req.body)
        if(req && req.body && req.body.label) {
            let role = new Role({
                label: req.body.label,
                permissions: await Permission.find((err, perms) => perms || [])
            })
            
            role.save(err => {
                if(err) {
                    // console.log(err);
                    return res.status(500).json(err);
                }
                return res.status(200).json({
                    message: `${role.label}, est maintenant stockée en base de données`
                });
            });
        }
        else 
            return res.status(400).json({message: 'missing fields'});
    },
    updatePermission: (req, res) => {
        if(req && req.body && req.body.label && (req.body.group || req.body.active)) {
            
            Permission.findOneAndUpdate(
                {label: req.body.label}, 
                {
                    ...req.body
                },
                {runValidators: true},
                (err, perm) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            err
                        });
                    }
                    // Si tout est ok
                    return res.status(200).json({
                        message: `Bravo, mise à jour de ${perm.label} OK`
                    });
                });
        }
        else 
            return res.status(400).json({message: 'missing fields'});
    },
    updateRoleByLabel: async (req, res) => {
        if(req && req.params.role_label)
            if(req.body && req.body.permissions) {
                if(Array.isArray(req.body.permissions)) {
                    Role.findOneAndUpdate(
                        {label: req.params.role_label}, 
                        {
                            permissions: await Permission.find({}, (err, perms) => {
                                perms.map((p) => {
                                    p['active'] = p.active || req.body.permissions.includes([p.label])?true:false;
                                    return p;
                                })
                            })
                        },
                        {runValidators: true},
                        (err, role) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({
                                    err
                                });
                            }
                            // Si tout est ok
                            return res.status(200).json({
                                message: `Bravo, mise à jour de ${role.label} OK`
                            });
                        });
                }
                else 
                    return res.status(400).json({message: 'missing fields'});
            }
            else 
                return res.status(400).json({message: 'malformed request'});
        else 
            return res.status(400).json({message: 'missing role label'});
    },
    deletePermission: (req, res) => {
        if(req && req.params.perm_id) {
            Permission.deleteOne({_id: req.params.perm_id}, (err) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({error: err})
                }
                return res.status(200).json({message: `Permission ${req.params.perm_id} deleted`})
            })
        }
    },
    deleteRole: (req, res) => {
        if(req && req.params.role_id) {
            Permission.deleteOne({_id: req.params.role_id}, (err) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({error: err})
                }
                return res.status(200).json({message: `Role ${req.params.role_id} deleted`})
            })
        }
    },

}

module.exports = (() => Controllers)();