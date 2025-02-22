import os from 'node:os' 

function monitor (){
    
    const oldCpus = os.cpus()

    setTimeout(()=>{
        const newCpus = os.cpus()

        const usage = newCpus.map((cpu, i)=>{
            return {
                core: i,
                usage: calculateCpu(oldCpus[i], newCpus[i]) + "%"
            }
        })
        
        console.clear()
        console.table(usage)
        const usedMemory = (os.totalmem() - os.freemem()) / (1024*1024*1024).toFixed(2)
        console.log('Memory used:', usedMemory)
    }, 1000)
}

function calculateCpu(oldCpus, newCpus){
    const oldTotal = Object.values(oldCpus.times).reduce((a, b)=> a+b);
    const newTotal = Object.values(newCpus.times).reduce((a, b)=> a+b);

    const idle = newCpus.times.idle - oldCpus.times.idle;

    const total = newTotal - oldTotal;

    const used = total - idle

    return ((100 * used ) / total).toFixed(1)
}

setInterval(monitor, 1000)