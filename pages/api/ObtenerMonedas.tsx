import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../lib/prisma";


export default async function handle(req , res) {
  const {Otro}=req.body
  try{
  const Monedas = await prisma.monedas.findMany({
    take: 5,
    distinct:['soporte_moneda_clave'],  
    where:{
        soporte_moneda_clave:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        soporte_moneda_clave:true,
        soporte_moneda_nombre:true,
      },
      orderBy:{soporte_moneda_id:"asc"},
    })

    //console.log(Emisores)
    res.json({Monedas})
  }catch(error){
    //res.status(400).json({error});
  }
}
