#! /bin/ash
# The script intends to create the command based on input configurable parameters, whether to run/skip test
# Whether to run tests and continue build without failing the build

RUN_UNIT_TESTS=$1
IGNORE_FAILURE=$2
RUN_SAST=$3
SNYK_TOKEN=$4
SAST_TYPE=$5

TEST_COMMAND="npm test"

if [[ "$RUN_TESTS" == "true" ]] ; then
    if [[ $CONTINUE_BUILD == "true" ]]; then
        echo "Executing build command with tests (ignoreFailure=true)"
        $TEST_COMMAND || true
    else
        echo "Executing build command with tests (ignoreFailure=false)"
        $TEST_COMMAND
        if [[ $? -ne 0 ]]; then
            echo "Unit Tests failed. Stopping build..."
            exit 1
        fi
    fi
else
    echo "Executing build command without tests"
fi


# SAST [static vulnerability test]
if [[ "$RUN_SAST" == "true"  && "$SAST_TYPE" == "code" ]] ; then
    echo "Running Snyk Test"
    snyk test
    if [[ "$IGNORE_FAILURE" == "false" ]]; then
        exit 1
    fi
fi