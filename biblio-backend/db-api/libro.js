import Debug from 'debug'
import { Libro } from '../models'

const debug = new Debug('biblio-backend:db-api:libro')

const getCodigo = _ => {
  const date = new Date()
  const _date = new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
  const formatted = _date.toISOString().slice(0,10).split('-')
  return `${formatted[0]}-${date.getTime()}`
}


const tolerancia = fecha_limite => {
  const fecha = fecha_limite.split('/')
  const limite = new Date( Number(fecha[2]), Number(fecha[1]), Number(fecha[0]) )
  
  const date = new Date()
  const _date = new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
  const formatted = _date.toISOString().slice(0,10).split('-')

  const ahora = new Date(Number( formatted[0]), Number(formatted[1]), Number(formatted[2]) )
  if( limite - ahora >= -86400000 )
    return true
  else
    return false
}

export default {
  findAll: async () => {
    //throw Error('error generado')
    debug('Finding all libros')
    const libros = await Libro.find().populate({ path: 'prestamos' })
    libros.forEach(async li => {
      if(li.prestamos.length) {
        let lastPrestamo = li.prestamos[li.prestamos.length - 1]
        if(!lastPrestamo.fecha_devolucion) {
          if( !tolerancia(lastPrestamo.fecha_limite_devolucion) ) {
            li.estado = 'deben'
            await li.save()
          }
        }
      }
    })

    return libros
  },

  findAllReporte: async() => {
    debug('Finding all libros Reporte')
    const libros = await Libro.find( { estado: { $ne: 'baja' } } )
    const reporte = []
    for(let i=0; i < libros.length; i++) {
      let pres = libros[i].prestamos.length
      let copy = 1
      for(let j=i+1; j < libros.length; j++) {
        if(libros[i].isbn == libros[j].isbn) {
          pres += libros[j].prestamos.length
          copy++
          libros.splice(j, 1)
          j--
        }
      }
      reporte.push({
        titulo: libros[i].titulo,
        autor: libros[i].autor,
        editorial: libros[i].editorial,
        año_pub: libros[i].año_pub,
        isbn: libros[i].isbn,
        copias: copy,
        num_pres: pres
      })
    }

    for(let i=0; i < reporte.length; i++) {
      for(let j=i+1; j < reporte.length; j++) {
        if(reporte[i].num_pres < reporte[j].num_pres) {
          let aux = reporte[j]
          reporte[j] = reporte[i]
          reporte[i] = aux
        }
      }
    }

    return reporte
  },

  findAllDetails: () => {
    debug('Finding all libros and prestamos')
    return Libro
      .find()
      .populate({
        path: 'prestamos'
      })
  },

  findByCodigo: (codigo) => {
    debug(`Find prestamo with codigo ${codigo}`)
    return Libro
      .findOne({ codigo })
      .populate({
        path: 'prestamos'
      })
  },

  create: (l) => {
    debug(`Creating new libro ${l}`)
    l.codigo = getCodigo()
    const libro = new Libro(l)
    return libro.save()
  },

  bajaLibro: async ({ codigo, motivo_baja }) => {
    debug(`Update baja libro ${ codigo } ${ motivo_baja }`)
    const libro = await Libro.findOne({ codigo })
    if (Object.keys(libro).length !== 0) {
      if (libro.estado !== 'baja') {
        libro.estado = 'baja'
        libro.motivo_baja = motivo_baja
        return libro.save()
      } else throw Error('error libro: Libro ya fue dado de baja')
    } else throw Error('error libro._id: Libro no encontrado')
  }
}
