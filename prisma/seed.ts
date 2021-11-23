import {PrismaClient} from "@prisma/client"
import {pagos} from "./seeds/pagosData"
import { monedas } from "./seeds/monedasData"

const prisma= new PrismaClient()

async function main(){
    await prisma.pagos.createMany({
        data:pagos,
    })
    await prisma.monedas.createMany({
        data:monedas
    })
    
}
main().catch(e=>{
    console.log(e)
    process.exit(1)
}).finally(()=>{
    prisma.$disconnect
})
