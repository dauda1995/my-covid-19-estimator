const covid19ImpactEstimator = (data) => {
    

   function fifteenpercent(digit){
       return ((15/100) *digit);
   }

   function thirthyfivepercent(){
       return  ((35/100) *data.totalHospitalBeds);
   }

   function fivePercent(digits){
       return ((5/100) * digits);
   }

   function twoPercent(digits){
    return ((2/100) * digits);
}
   let nth = (days) =>{ 
    let factor = 0;
    let total = 0
    days = noOfDays(days, data.periodType);
    while(3 + total <= days){
        factor +=1
        total = total +3
       
     }
     return factor;
    }

    let noOfDays = (time, format) =>{
        result = 0;
        switch(format){
            case "days":
                result = time;
                break;
            case "weeks":
                result = time * 7;
                break;
            case "months":
                result = time *30;
                break;
        }
        return result;

    }
    let impact ={

    }

    let severeImpact = {

    }

    let currentlyInfected1 = data.reportedCases * 10;
    let severeCurrentlyInfected = data.reportedCases * 50;

    let infectionsByRequestedTime1 = currentlyInfected1 * (Math.pow(2, nth(data.timeToElapse)));
    let severeInfectionsByRequestedTime = severeCurrentlyInfected * (Math.pow(2, nth(data.timeToElapse)));

    let severeCasesByRequestedTime1 = fifteenpercent(infectionsByRequestedTime1);
    let severeCasesByRequestedTime2 = fifteenpercent(severeInfectionsByRequestedTime);

    let hospitalBedsByRequested = (digit)=>{
        return digit - totalHospitalBeds;
    }

    let hospitalBedsByRequestedTime1 = hospitalBedsByRequested(severeCasesByRequestedTime1);
    let hospitalBedsByRequestedTime2 = hospitalBedsByRequested(severeCasesByRequestedTime2);

    let casesForICUByRequestedTime1 = fivePercent(infectionsByRequestedTime1);
    let casesForICUByRequestedTime2 = fivePercent(severeInfectionsByRequestedTime);

    let casesForVentilatorsByRequestedTime1 = twoPercent(infectionsByRequestedTime1);
    let casesForVentilatorsByRequestedTime2 = twoPercent(severeInfectionsByRequestedTime);

    let dollarsInFlight1 = (infectionsByRequestedTime1 * data.avgDailyIncomeInUSD * data.avgDailyIncomePopulation * noOfDays(data.timeToElapse, data.periodType)).toFixed(2);
    let dollarsInFlight2 = (infectionsByRequestedTime2 * data.avgDailyIncomeInUSD * data.avgDailyIncomePopulation * noOfDays(data.timeToElapse, data.periodType)).toFixed(2);



    return {
        data : data,
        impact:{
            currentlyInfected : currentlyInfected1, 
            infectionsByRequestedTime : infectionsByRequestedTime1,
            severeCasesByRequestedTime: severeCasesByRequestedTime1,
            hospitalBedsByRequestedTime : hospitalBedsByRequestedTime1,
            casesForICUByRequestedTime : casesForICUByRequestedTime1,
            casesForVentilatorsByRequestedTime : casesForVentilatorsByRequestedTime1,
            dollarsInFlight : dollarsInFlight1
        },

        severeImpact: {
            currentlyInfected : severeCurrentlyInfected,
            infectionsByRequestedTime : severeInfectionsByRequestedTime,
            severeCasesByRequestedTime : severeCasesByRequestedTime2,
            hospitalBedsByRequestedTime : hospitalBedsByRequestedTime2,
            casesForICUByRequestedTime : casesForICUByRequestedTime2 ,
            casesForVentilatorsByRequestedTime : casesForVentilatorsByRequestedTime2, 
            dollarsInFlight : dollarsInFlight2
        }
    }



    


    

}

export default covid19ImpactEstimator;
