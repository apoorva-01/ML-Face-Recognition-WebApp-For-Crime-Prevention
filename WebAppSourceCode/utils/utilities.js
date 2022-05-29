// Define our labelmap
const labelMap = {
    1:{name:'ApoorvaVerma', color:'red'},
    2:{name:'AbuSalim', color:'yellow'},
    3:{name:'ArunGawli', color:'lime'},
    4:{name:'CharlesSobhraj', color:'blue'},
    5:{name:'DawoodIbrahimKaskar', color:'blue'},
    6:{name:'DevendraSharma', color:'blue'},
    7:{name:'GurmeetRamRahimSingh', color:'blue'},
    8:{name:'MohanKumar', color:'blue'},
    9:{name:'PhoolanDevi', color:'blue'},
    10:{name:'VikasDubey', color:'blue'},
    11:{name:'SurindherKoli', color:'blue'},
    12:{name:'SushilKumar', color:'blue'},
    13:{name:'VijayMallya', color:'blue'},
}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/2);
            ctx.stroke()
        }
    }
}