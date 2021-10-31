# mocha-skipped-tests-limit

Limit how many tests can be skipped in Mocha.

## Write tests

Write Mocha tests, with some skipped, some not.

## Set the percent limit

In `package.json`, modify the following commands to set a percent limit (0 - 100) on how many tests can skipped:

```
"test:limit-skipped-js": "node scripts/limit-skipped-tests.js --skippedTestsPercentLimit=40",
"test:limit-skipped-bash": "bash ./scripts/limit-skipped-tests.sh 40"
```

## Run the script

Run either command to verify that the percent of skipped tests does not exceed the limit.

```
# With node script
npm run test:limit-skipped-js
# With Bash script
npm run test:limit-skipped-bash
```

If the limit is exceeded, a message will be displayed, and the process will exit with an error.