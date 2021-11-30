import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../lib/prisma";


export default async function handle(req , res) {
  const {Otro}=req.body
  try{
  const Monedas = await prisma.pagos.findMany({
    take: 5,
    distinct:['moneda'],  
    where:{
      moneda:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        moneda:true,
      },
      orderBy:{moneda:"asc"},
    })

    //console.log(Emisores)
    res.json({Monedas})
  }catch(error){
    //res.status(400).json({error});
  }
}
