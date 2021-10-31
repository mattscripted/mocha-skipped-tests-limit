# mocha-skipped-tests-limit

Limit how many tests can be skipped in Mocha.

## Write tests

Write Mocha tests, with some skipped, some not.

## Set the limit

In `package.json`, modify the `test:limit-skipped` command to set the `skippedTestsPercentLimit` to a value between 0 and 100.

## Run the script

Run `npm run test:limit-skipped` to verify that the percent of skipped tests does not exceed the limit.

If the limit is exceeded, a console message will be displayed, and an `exitCode` of `1` will be returned.
