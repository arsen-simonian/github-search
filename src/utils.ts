import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export const isFetchBaseQueryErrorType = (
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError => "status" in error;