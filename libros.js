libros: [
  {
    nombre: 'Nombre Libro 1',
    autor: 'Autor 1',
    editorial: 'Editorial 1',
    cantidad: 0,
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
      },
      {
        cliente: {
          nombre: 'Cliente 2',
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

// npmx
// create react app
// 


// 1	registrar los prestamos de libros para controlar y gestionar la biblioteca
// 2	tener inventariado todos mis libros para poder llevar adecuadamente el control de prestamos de ellos


// 3	registrar las devoluciones de prestamos de libros para incorporarlos a los libros disponibles para prestar en la biblioteca
// 4	dar de baja a los libros, por extravio o por deterioro para retirarlos de mi registros de libros

// 5	obtener el listado de los libros prestados actualmente para conocer que libros no estan disponibles
// 6	obtener el listado de libros no devueltos para llamar a los usuarios exigiendoles la devolucion de los libros
// 7	tener una estadistica de los libros mas prestados para ver la posibilidad de comprar copias nuevas


// libro1 prestados
// libro2 diponible

// 23,24 de abril vincenti

// gitlab
// Ramas:
// develop

// issue_4_crear API libros, luego merge a develop
