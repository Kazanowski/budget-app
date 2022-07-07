export const pieChart = (data) =>{
    const r = 72;
    const strokeDasharray = Math.PI*(r*2);
    let strokeDashoffset = 0;
        
    if(data.fill < data.rail && data.rail >= 0 && data.fill >= 0){
        strokeDashoffset = ((100 - ((data.fill)/data.rail*100))/100)*strokeDasharray;
    }
    
    return `
        <svg class="pie-chart" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <circle class="pie-chart__rail" cx="80" cy="80" r="${r}" stroke-dasharray="${strokeDasharray}" stroke-dashoffset="0"/>
            <circle class="pie-chart__fill" cx="80" cy="80" r="${r}" stroke-dasharray="${strokeDasharray}" stroke-dashoffset="${strokeDashoffset}"/>
        </svg>
    `;
}