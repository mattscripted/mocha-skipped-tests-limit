skippedTestsPercentLimit=$1

function limitSkippedTests() {
  # Generate report without executing tests
  testReport=$(npm run test -- --dry-run)

  # Get skipped and total test counts
  # We use -P to support this regex format
  # We use -o to only return the part of the line our regex matches
  skippedTestsCount=$(echo "$testReport" | grep -oP "\d+ pending" | grep -oP "\d+")
  passedTestsCount=$(echo "$testReport" | grep -oP "\d+ passing" | grep -oP "\d+")
  # In a dry-run, there can only be passing (not-skipped) and pending (skipped) tests,
  # so we sum these values to get the total tests count
  totalTestsCount=$(($skippedTestsCount + $passedTestsCount))

  # Get the percentage of tests that are skipped
  skippedTestsPercent=$((100 * skippedTestsCount / $totalTestsCount))

  # Fail if too many tests are skipped
  if (($skippedTestsPercent > $skippedTestsPercentLimit)); then
    echo "Currently, $skippedTestsPercent% of tests are skipped out of a limit of $skippedTestsPercentLimit%."
    echo "Please fix or remove skipped tests."
    exit 1
  fi
}

limitSkippedTests