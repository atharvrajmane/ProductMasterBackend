import express from "express";
import pool from "../config/db.js"; // ✅ MySQL connection pool

const router = express.Router();

router.post("/", async (req, res) => {
  const formData = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1️⃣ Insert into main loans table
    const [loanResult] = await connection.query(
      "INSERT INTO loans () VALUES ()"
    );
    const loanId = loanResult.insertId;

    // 2️⃣ Insert into loan_basic_details
    await connection.query(
      `INSERT INTO loan_basic_details 
      (loan_id, productCategory, productName, repaymentCategory, termCategory, minTenure, maxTenure, bulletTenure, minAmount, maxAmount, automaticClosure, loanRenewal, preClosure, partPayment, holidayEMI, assetClassification, tranches, generalInsurance, healthInsurance, lifeInsurance, npaRules, writeOffRules, settlementRules)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        loanId,
        formData.productCategory,
        formData.productName,
        formData.repaymentCategory,
        formData.termCategory,
        formData.minTenure,
        formData.maxTenure,
        formData.bulletTenure,
        formData.minAmount,
        formData.maxAmount,
        formData.automaticClosure,
        formData.loanRenewal,
        formData.preClosure,
        formData.partPayment,
        formData.holidayEMI,
        formData.assetClassification,
        formData.tranches,
        formData.generalInsurance,
        formData.healthInsurance,
        formData.lifeInsurance,
        formData.npaRules,
        formData.writeOffRules,
        formData.settlementRules
      ]
    );

    // 3️⃣ Insert into loan_roi_repayment_settings
    const [roiResult] = await connection.query(
      `INSERT INTO loan_roi_repayment_settings 
      (loan_id, rateOfInterest, interestMethodology, amortizationMethod, repaymentModeAuto, repaymentModeManual, repaymentModeOther, repaymentFrequency, advancedEmi, interestAccrualApplicable, interestAccrualMethod)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        loanId,
        formData.rateOfInterest,
        formData.interestMethodology,
        formData.amortizationMethod,
        formData.repaymentModeAuto,
        formData.repaymentModeManual,
        formData.repaymentModeOther,
        formData.repaymentFrequency,
        formData.advancedEmi,
        formData.interestAccrualApplicable,
        formData.interestAccrualMethod
      ]
    );

    // 3.1️⃣ Insert pooling dates (array)
    if (formData.poolingDates && Array.isArray(formData.poolingDates)) {
      for (const date of formData.poolingDates) {
        await connection.query(
          "INSERT INTO loan_pooling_dates (roi_repayment_id, poolingDate) VALUES (?, ?)",
          [roiResult.insertId, date]
        );
      }
    }

    // 4️⃣ Insert into loan_fees_and_charges
    await connection.query(
      `INSERT INTO loan_fees_and_charges
      (loan_id, processingFee, manualProcessingFee, gstOnProcessingFee, convenienceFee, manualConvenienceFee, gstOnConvenienceFee, emiBouncingCharges, manualEmiBouncingCharges, gstOnEmiBouncingCharges, latePaymentMethod, dailyLateCharges, manualDailyLateCharges, gstOnDailyLateCharges, monthlyLateCharges, manualMonthlyLateCharges, gstOnMonthlyLateCharges)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        loanId,
        formData.processingFee,
        formData.manualProcessingFee,
        formData.gstOnProcessingFee,
        formData.convenienceFee,
        formData.manualConvenienceFee,
        formData.gstOnConvenienceFee,
        formData.emiBouncingCharges,
        formData.manualEmiBouncingCharges,
        formData.gstOnEmiBouncingCharges,
        formData.latePaymentMethod,
        formData.dailyLateCharges,
        formData.manualDailyLateCharges,
        formData.gstOnDailyLateCharges,
        formData.monthlyLateCharges,
        formData.manualMonthlyLateCharges,
        formData.gstOnMonthlyLateCharges
      ]
    );

    // 5️⃣ Insert into loan_credit_info
    await connection.query(
      "INSERT INTO loan_credit_info (loan_id, creditCompany, cicProductCode) VALUES (?, ?, ?)",
      [loanId, formData.creditCompany, formData.cicProductCode]
    );

    // 6️⃣ Insert into loan_business_rule_engine
    await connection.query(
      `INSERT INTO loan_business_rule_engine 
      (loan_id, minAge, maxAge, incomeSource, incomeRequirement, foir, minusOneScoreEligible, minCreditScore, inBetweenCreditScore, creditScoreEligibility, overdueAcceptable, acceptedLatePayment, minCreditEnquiries, maxCreditEnquiries)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        loanId,
        formData.minAge,
        formData.maxAge,
        formData.incomeSource,
        formData.incomeRequirement,
        formData.foir,
        formData.minusOneScoreEligible,
        formData.minCreditScore,
        formData.inBetweenCreditScore,
        formData.creditScoreEligibility,
        formData.overdueAcceptable,
        formData.acceptedLatePayment,
        formData.minCreditEnquiries,
        formData.maxCreditEnquiries
      ]
    );

    // 7️⃣ Insert into loan_source_of_funds
    await connection.query(
      `INSERT INTO loan_source_of_funds
      (loan_id, sourceOfFunds, coLendingFacility, firstNBFC, firstNBFCShare, secondNBFC, secondNBFCShare)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        loanId,
        formData.sourceOfFunds,
        formData.coLendingFacility,
        formData.firstNBFC,
        formData.firstNBFCShare,
        formData.secondNBFC,
        formData.secondNBFCShare
      ]
    );

    // ✅ Commit transaction
    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Loan data saved successfully",
      loanId
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  } finally {
    connection.release();
  }
});

export default router;
