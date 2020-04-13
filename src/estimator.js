const covid19ImpactEstimator = (data) => {
  const input = data;
  function fifteenpercent(digit) {
    return (Math.trunc((15 / 100) * digit));
  }
  function fivePercent(digits) {
    return ((5 / 100) * digits);
  }
  const noOfDays = (time, format) => {
    let result = 0;
    if (format === 'days') {
      result = time;
    } else if (format === 'weeks') {
      result = time * 7;
    } else if (format === 'months') {
      result = time * 30;
    }
    return Math.trunc(result);
  };

  function twoPercent(digits) {
    return ((2 / 100) * digits);
  }
  const nth = (days) => {
    let factor = 0;
    let total = 0;
    const day = noOfDays(days, data.periodType);
    while (3 + total <= day) {
      factor += 1;
      total += 3;
    }
    return factor;
  };


  // eslint-disable-next-line no-undef
  const currentlyInfected1 = (data.reportedCases * 10);
  // eslint-disable-next-line no-undef
  const currentlyInfected2 = (data.reportedCases * 50);

  // eslint-disable-next-line no-undef
  const infectionsByRequestedTime1 = (currentlyInfected1 * (2 ** (nth(data.timeToElapse))));
  // eslint-disable-next-line no-undef
  const infectionsByRequestedTime2 = (currentlyInfected2 * (2 ** (nth(data.timeToElapse))));

  const severeCasesByRequestedTime1 = fifteenpercent(infectionsByRequestedTime1);
  const severeCasesByRequestedTime2 = fifteenpercent(infectionsByRequestedTime2);

  // eslint-disable-next-line no-undef
  const hospitalBedsByRequested = (digit) => (BigInt(data.totalHospitalBeds) - (BigInt(digit)));

  const hospitalBedsByRequestedTime1 = hospitalBedsByRequested(severeCasesByRequestedTime1);
  const hospitalBedsByRequestedTime2 = hospitalBedsByRequested(severeCasesByRequestedTime2);

  const casesForICUByRequestedTime1 = fivePercent(infectionsByRequestedTime1);
  const casesForICUByRequestedTime2 = fivePercent(infectionsByRequestedTime2);

  const casesForVentilatorsByRequestedTime1 = twoPercent(infectionsByRequestedTime1);
  const casesForVentilatorsByRequestedTime2 = twoPercent(infectionsByRequestedTime2);

  const multiples = (digits) => {
    const constants = data.avgDailyIncomePopulation * noOfDays(data.timeToElapse, data.periodType);
    return ((digits * constants * data.avgDailyIncomeInUSD).toFixed(2));
  };
  const d1 = multiples(infectionsByRequestedTime1);
  const d2 = multiples(infectionsByRequestedTime2);
  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfected1,
      infectionsByRequestedTime: infectionsByRequestedTime1,
      severeCasesByRequestedTime: severeCasesByRequestedTime1,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime1,
      casesForICUByRequestedTime: casesForICUByRequestedTime1,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime1,
      dollarsInFlight: d1
    },

    severeImpact: {
      currentlyInfected: currentlyInfected2,
      infectionsByRequestedTime: infectionsByRequestedTime2,
      severeCasesByRequestedTime: severeCasesByRequestedTime2,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime2,
      casesForICUByRequestedTime: casesForICUByRequestedTime2,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime2,
      dollarsInFlight: d2
    }
  };
};

export default covid19ImpactEstimator;
