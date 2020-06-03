libros: [
  {
    codigo: 'gestion-correlativo (2020-1)',
    isbn: '0123456789',
    titulo: 'Nombre Libro 1',
    autor: 'Autor 1',
    editorial: 'Editorial 1',
    año_pub: '2005',
    estado: 'disponible | prestado | baja',
    motivo_baja: ' "" | deterioro | extravío',
    prestamos: [
      {
        cliente: {
          nombre: 'Cliente 1',
          celular: 75784496
        },
        fecha_prestamo: '05/06/2019',
        fecha_limite_devolucion: '18/06/2019',
        fecha_devolucion: ''
      }
    ]
  }
]

db.createUser({
	user:"dbgary",
	pwd: "passmongo",
	roles:["clusterAdmin","readAnyDatabase","readWriteAnyDatabase","userAdminAnyDatabase","dbAdminAnyDatabase"]
});

//mongo --username dbgary --password passmongo --authenticationDatabase admin --host localhost --port 27017
