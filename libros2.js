libros: [
  {
    codigo: 'C-L01',
    nombre: 'Nombre Libro 1',
    autor: 'Autor 1',
    editorial: 'Editorial 1',
    copia: 2,
    estado: 'disponible | prestado',
    baja: { estado: true ,detalle: 'asdf'},
    fecha_lanzamiento: '15/05/1999',
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
    copia: 1,
    estado: 'baja | disponible',
    fecha_lanzamiento: '17/04/2005',
    baja: [
      { detalle: 'extravío' }
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
  }
]

db.createUser({
	user:"dbgary",
	pwd: "passmongo",
	roles:["clusterAdmin","readAnyDatabase","readWriteAnyDatabase","userAdminAnyDatabase","dbAdminAnyDatabase"]
});

//mongo --username dbgary --password passmongo --authenticationDatabase admin --host localhost --port 27017
