import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { prisma } from "../../lib/prisma";


export default async function handle(req , res) {
  const {Otro}=req.body
  try{
  const movimientos = await prisma.pagos.findMany({
      orderBy:{id:"asc"},
    })

    //console.log(Status1)
    res.json({movimientos})
  }catch(error){
    //res.status(400).json({error});
  }
}
