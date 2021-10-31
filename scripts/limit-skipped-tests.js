const fs = require('fs')
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const minimist = require('minimist')

function getScriptArgs() {
  return minimist(process.argv.slice(2))
}

async function getStats() {
  // Perform a dry-run of Mocha, and store the output in a temporary report file
  await exec('npm run test -- --dry-run -R mocha-json-output-reporter output=test-report.json')

  // Fetch stats
  const testReport = require('../test-report.json')
  const skippedTestsCount = testReport.stats.pending
  const totalTestsCount = testReport.stats.tests

  // Remove the temporary report file
  fs.unlinkSync('./test-report.json')

  return {
    skippedTestsCount,
    totalTestsCount,
  }
}

function verifyStats(stats) {
  const { skippedTestsPercentLimit } = getScriptArgs()
  const actualSkippedTestsPercent = 100 * (stats.skippedTestsCount / stats.totalTestsCount)

  // Check if the skipped tests limit has been exceeded
  if (actualSkippedTestsPercent > skippedTestsPercentLimit) {
    console.log(`Currently, ${actualSkippedTestsPercent.toFixed(2)}% of tests are skipped out of a limit of ${skippedTestsPercentLimit}%. Please fix or remove skipped tests.`)
    return false
  }

  return true
}

async function limitSkippedTests() {
  const stats = await getStats();
  
  if (!verifyStats(stats)) {
    // Fail
    process.exitCode = 1
  }
}

limitSkippedTests()
