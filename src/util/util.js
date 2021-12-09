
const distancePoints = (x1, x2) => {
    return Math.sqrt(Math.pow((x2.latitude - x1.latitude),2) + Math.pow((x2.longitude - x1.longitude),2))
}

const routeOfInterest = (point, route) => {
    let menor = Number.POSITIVE_INFINITY;
    let i = 0;
    let routeFinal = []; 
    while(i < route.length){
        let distance  = distancePoints(point, route[i]);
        if (distance < menor){
            menor = distance;
            routeFinal = [];
        }
        routeFinal.push(route[i]);
        i = i+1;
    }
    return routeFinal;
}

module.exports = {routeOfInterest};