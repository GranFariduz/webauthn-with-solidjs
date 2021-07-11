const express = require('express')

const router = express.Router()

// controllers
const {
  getAttestationOptions,
  verifyAttestation,
  getAssertionOptions,
  verifyAssertion,

  getAttestationOptionsForExistingUser
} = require('../controllers/auth.controller')

// middlewares
const { checkToken } = require('../middlewares/auth.middleware')

// REGISTER ROUTES (ATTESTATION)
router.post('/generate-attestation-options', getAttestationOptions)
router.post('/verify-attestation', verifyAttestation)

// LOGIN ROUTES (ASSERTION)
router.post('/generate-assertion-options', getAssertionOptions)
router.post('/verify-assertion', verifyAssertion)

// ATTESTATION OPTIONS FOR MULTIPLE AUTHENTICATOR
router.get(
  '/user/generate-attestation-options',
  checkToken,
  getAttestationOptionsForExistingUser
)

module.exports = router
