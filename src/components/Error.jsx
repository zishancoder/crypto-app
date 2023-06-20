import { Alert, AlertDescription, AlertIcon} from "@chakra-ui/react";
import React from "react";

function Error() {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription>
        Error during fetching data from API
      </AlertDescription>
    </Alert>
  );
}

export default Error;
