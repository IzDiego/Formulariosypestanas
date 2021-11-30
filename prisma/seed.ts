import {PrismaClient} from "@prisma/client"
import {lista} from "./seeds/movimientosData"
const prisma= new PrismaClient()

async function main(){
    await prisma.pagos.createMany({
        data:lista,
    })

    
}
main().catch(e=>{
    console.log(e)
    process.exit(1)
}).finally(()=>{
    prisma.$disconnect
})
