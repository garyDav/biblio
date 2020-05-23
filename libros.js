libros: [
  {
    nombre: 'Nombre Libro 1',
    autor: 'Autor 1',
    editorial: 'Editorial 1',
    cantidad: 2,
    estado: 'baja | disponible',
    fecha_lanzamiento: '15/05/1999',
    baja: [
      { detalle: 'por extravío' },
      { detalle: 'por deterioro' }
    ],
    prestamos: [
      {
        cliente: {
          nombre: 'Cliente 1',
          celular: 75784496
        },
        fecha_prestamo: '05/06/2019',
        fecha_devolucion: '18/06/2019',
        fecha_devuelto: '17/06/2019'
      }
    ]
  },
  {
    nombre: 'Nombre Libro 2',
    autor: 'Autor 2',
    editorial: 'Editorial 1',
    cantidad: 1,
    estado: 'baja | disponible',
    fecha_lanzamiento: '17/04/2005',
    baja: [],
    prestamos: [
      {
        cliente: {
          nombre: 'Cliente 1',
          celular: 75784496
        },
        fecha_prestamo: '05/06/2019',
        fecha_devolucion: '18/06/2019',
        fecha_devuelto: ''
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
