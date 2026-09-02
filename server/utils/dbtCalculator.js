/**
 * Direct Benefit Transfer (DBT) Grant Disbursement Calculator
 */

const calculateDBTSchedule = (annualBenefit, installmentsCount = 3) => {
  const installmentAmount = Math.floor(annualBenefit / installmentsCount);
  const schedule = [];

  const currentYear = new Date().getFullYear();
  const dates = ['10-APR', '10-AUG', '10-DEC'];

  for (let i = 0; i < installmentsCount; i++) {
    schedule.push({
      installmentNumber: i + 1,
      expectedDate: `${dates[i % dates.length]}-${currentYear}`,
      amount: installmentAmount,
      status: 'SCHEDULED'
    });
  }

  return {
    totalBenefit: annualBenefit,
    installmentsCount,
    schedule
  };
};

module.exports = {
  calculateDBTSchedule
};
