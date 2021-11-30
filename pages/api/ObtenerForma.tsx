import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../lib/prisma";


export default async function handle(req , res) {
  const {Otro}=req.body
  try{
  const Forma1 = await prisma.pagos.findMany({
    take: 5,
    distinct:['formadepago'],  
    where:{
      formadepago:{
          contains:Otro.queryKey[1],
        },
      },
      select:{
        formadepago:true,
      },
      orderBy:{formadepago:"asc"},
    })

    //console.log(Emisores)
    res.json({Forma1})
  }catch(error){
    //res.status(400).json({error});
  }
}
