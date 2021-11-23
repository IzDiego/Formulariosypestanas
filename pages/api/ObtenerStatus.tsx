import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../lib/prisma";


export default async function handle(req , res) {
  const {Otro}=req.body
  try{
  const Status1 = await prisma.pagos.findMany({
    take: 5,
    distinct:['status_pago_nombre'],  
    where:{
        status_pago_nombre:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        status_pago_nombre:true,
      },
      orderBy:{status_pago_nombre:"asc"},
    })

    //console.log(Status1)
    res.json({Status1})
  }catch(error){
    //res.status(400).json({error});
  }
}
