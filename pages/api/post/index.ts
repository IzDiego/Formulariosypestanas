import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from  '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   const {DatosPrueba}=req.body
   
   //console.log(DatosPrueba)
   const result = await prisma.clientes.create({
    data:{
        cliente:DatosPrueba.cliente,
        emisor:DatosPrueba.emisor,
        montorecibido:DatosPrueba.montorecibido,
        moneda:DatosPrueba.moneda,
        tipodecambio:DatosPrueba.tipodecambio,
        formadepago:DatosPrueba.formadepago,
        fecha:DatosPrueba.fecha,
        status:DatosPrueba.status,
        numeroperacion:DatosPrueba.numeroperacion,
        observaciones:DatosPrueba.observaciones,
        cuentabancaria:DatosPrueba.cuentabancaria,
        fechadeingreso:DatosPrueba.fechadeingreso,
        montoregistrado:DatosPrueba.montoregistrado,
        fechadeconfirmacion:DatosPrueba.fechadeconfirmacion,
        observacionesalconfirmar:DatosPrueba.observacionesalconfirmar
    }
   })
   //console.log('intento creado')
   res.json(result)
}