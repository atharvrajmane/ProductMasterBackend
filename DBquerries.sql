create database productmaster;
use productmaster;
CREATE TABLE loans (
    loan_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE loan_basic_details (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    productCategory VARCHAR(255),
    productName VARCHAR(255),
    repaymentCategory VARCHAR(255),
    termCategory VARCHAR(255),
    minTenure INT,
    maxTenure INT,
    bulletTenure INT,
    minAmount DECIMAL(15,2),
    maxAmount DECIMAL(15,2),
    automaticClosure VARCHAR(255),
    loanRenewal VARCHAR(255),
    preClosure VARCHAR(255),
    partPayment VARCHAR(255),
    holidayEMI VARCHAR(255),
    assetClassification VARCHAR(255),
    tranches VARCHAR(255),
    generalInsurance VARCHAR(255),
    healthInsurance VARCHAR(255),
    lifeInsurance VARCHAR(255),
    npaRules VARCHAR(255),
    writeOffRules VARCHAR(255),
    settlementRules VARCHAR(255),
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) ON DELETE CASCADE
);

CREATE TABLE loan_roi_repayment_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    rateOfInterest DECIMAL(5,2),
    interestMethodology VARCHAR(255),
    amortizationMethod VARCHAR(255),
    repaymentModeAuto VARCHAR(255),
    repaymentModeManual VARCHAR(255),
    repaymentModeOther VARCHAR(255),
    repaymentFrequency VARCHAR(255),
    advancedEmi VARCHAR(255),
    interestAccrualApplicable VARCHAR(255),
    interestAccrualMethod VARCHAR(255),
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) ON DELETE CASCADE
);

CREATE TABLE loan_pooling_dates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    roi_repayment_id BIGINT NOT NULL,
    poolingDate VARCHAR(255),
    FOREIGN KEY (roi_repayment_id) REFERENCES loan_roi_repayment_settings(id) ON DELETE CASCADE
);

CREATE TABLE loan_fees_and_charges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    processingFee DECIMAL(15,2),
    manualProcessingFee DECIMAL(15,2),
    gstOnProcessingFee DECIMAL(15,2),
    convenienceFee DECIMAL(15,2),
    manualConvenienceFee DECIMAL(15,2),
    gstOnConvenienceFee DECIMAL(15,2),
    emiBouncingCharges DECIMAL(15,2),
    manualEmiBouncingCharges DECIMAL(15,2),
    gstOnEmiBouncingCharges DECIMAL(15,2),
    latePaymentMethod VARCHAR(255),
    dailyLateCharges DECIMAL(15,2),
    manualDailyLateCharges DECIMAL(15,2),
    gstOnDailyLateCharges DECIMAL(15,2),
    monthlyLateCharges DECIMAL(15,2),
    manualMonthlyLateCharges DECIMAL(15,2),
    gstOnMonthlyLateCharges DECIMAL(15,2),
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) ON DELETE CASCADE
);
CREATE TABLE loan_credit_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    creditCompany VARCHAR(255),
    cicProductCode VARCHAR(255),
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) ON DELETE CASCADE
);
CREATE TABLE loan_business_rule_engine (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    minAge INT,
    maxAge INT,
    incomeSource VARCHAR(255),
    incomeRequirement DECIMAL(15,2),
    foir DECIMAL(5,2),
    minusOneScoreEligible VARCHAR(255),
    minCreditScore INT,
    inBetweenCreditScore VARCHAR(255),
    creditScoreEligibility VARCHAR(255),
    overdueAcceptable VARCHAR(255),
    acceptedLatePayment VARCHAR(255),
    minCreditEnquiries INT,
    maxCreditEnquiries INT,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) ON DELETE CASCADE
);

CREATE TABLE loan_source_of_funds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_id BIGINT NOT NULL,
    sourceOfFunds VARCHAR(255),
    coLendingFacility VARCHAR(255),
    firstNBFC VARCHAR(255),
    firstNBFCShare DECIMAL(5,2),
    secondNBFC VARCHAR(255),
    secondNBFCShare DECIMAL(5,2),
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id) ON DELETE CASCADE
);

show tables;
select * from loans;
select * from loan_basic_details;
select * from loan_roi_repayment_settings;
select * from loan_pooling_dates;
select * from loan_fees_and_charges;
select * from loan_credit_info;
select * from loan_business_rule_engine;
select * from loan_source_of_funds;