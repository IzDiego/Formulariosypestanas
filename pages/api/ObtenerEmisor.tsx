import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../lib/prisma";


export default async function handle(req , res) {
  const {Otro}=req.body
  try{
  const Emisores = await prisma.pagos.findMany({
    take: 5,
    distinct:['empresa_nombre'],  
    where:{
        empresa_nombre:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        empresa_nombre:true,
      },
      orderBy:{empresa_nombre:"asc"},
    })

    //console.log(Emisores)
    res.json({Emisores})
  }catch(error){
    //res.status(400).json({error});
  }
}
