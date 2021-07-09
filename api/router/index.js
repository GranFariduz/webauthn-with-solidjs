const express = require('express')

const router = express.Router()

// controllers
const {
  getAttestationOptions,
  verifyAttestation,
  getAssertionOptions,
  verifyAssertion
} = require('../controllers/auth.controller')

// REGISTER ROUTES (ATTESTATION)
router.post('/generate-attestation-options', getAttestationOptions)
router.post('/verify-attestation', verifyAttestation)

// LOGIN ROUTES (ASSERTION)
router.post('/generate-assertion-options', getAssertionOptions)
router.post('/verify-assertion', verifyAssertion)

module.exports = router
