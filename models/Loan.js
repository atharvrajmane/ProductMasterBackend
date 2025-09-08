import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  basicDetails: {
    productCategory: String,
    productName: String,
    repaymentCategory: String,
    termCategory: String,
    minTenure: Number,
    maxTenure: Number,
    bulletTenure: Number,
    minAmount: Number,
    maxAmount: Number,
    automaticClosure: String,
    loanRenewal: String,
    preClosure: String,
    partPayment: String,
    holidayEMI: String,
    assetClassification: String,
    tranches: String,
    generalInsurance: String,
    healthInsurance: String,
    lifeInsurance: String,
    npaRules: String,
    writeOffRules: String,
    settlementRules: String
  },
  roiRepaymentSettings: {
    rateOfInterest: Number,
    interestMethodology: String,
    amortizationMethod: String,
    repaymentModeAuto: String,
    repaymentModeManual: String,
    repaymentModeOther: String,
    repaymentFrequency: String,
    advancedEmi: String,
    poolingDates: [String],
    interestAccrualApplicable: String,
    interestAccrualMethod: String
  },
  feesAndCharges: {
    processingFee: Number,
    manualProcessingFee: Number,
    gstOnProcessingFee: Number,
    convenienceFee: Number,
    manualConvenienceFee: Number,
    gstOnConvenienceFee: Number,
    emiBouncingCharges: Number,
    manualEmiBouncingCharges: Number,
    gstOnEmiBouncingCharges: Number,
    latePaymentMethod: String,
    dailyLateCharges: Number,
    manualDailyLateCharges: Number,
    gstOnDailyLateCharges: Number,
    monthlyLateCharges: Number,
    manualMonthlyLateCharges: Number,
    gstOnMonthlyLateCharges: Number
  },
  creditInfo: {
    creditCompany: String,
    cicProductCode: String
  },
  businessRuleEngine: {
    minAge: Number,
    maxAge: Number,
    incomeSource: String,
    incomeRequirement: Number,
    foir: Number,
    minusOneScoreEligible: String,
    minCreditScore: Number,
    inBetweenCreditScore: String,
    creditScoreEligibility: String,
    overdueAcceptable: String,
    acceptedLatePayment: String,
    minCreditEnquiries: Number,
    maxCreditEnquiries: Number
  },
  sourceOfFunds: {
    sourceOfFunds: String,
    coLendingFacility: String,
    firstNBFC: String,
    firstNBFCShare: Number,
    secondNBFC: String,
    secondNBFCShare: Number
  }
}, { timestamps: true });

export default mongoose.model("Loan", loanSchema);
