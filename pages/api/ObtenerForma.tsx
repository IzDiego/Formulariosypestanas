import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../lib/prisma";


export default async function handle(req , res) {
  const {Otro}=req.body
  try{
  const Forma1 = await prisma.pagos.findMany({
    take: 5,
    distinct:['forma_pago_nombre'],  
    where:{
        forma_pago_nombre:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        forma_pago_nombre:true,
        forma:true,
      },
      orderBy:{forma:"asc"},
    })

    //console.log(Emisores)
    res.json({Forma1})
  }catch(error){
    //res.status(400).json({error});
  }
}
