const getMenufrontEnd = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard',
            icono: "mdi mdi-gauge",
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Progreso', url: 'progress' },
                { titulo: 'Graficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Rxjs', url: 'rxjs' },
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: "mdi mdi-folder-lock-open",
            submenu: [
                //{titulo: 'Usuarios', url: 'usuarios'},
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Medicos', url: 'medicos' },

            ]
        }
    ];
    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }
    return menu;
}

module.exports = {
    getMenufrontEnd
}