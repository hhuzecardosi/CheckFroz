export type SetType = {
  headers: Record<string, string> & { "Set-Cookie"?: string | string[] | undefined };
  status?: number | "Continue" | "Switching Protocols" | "Processing" | "Early Hints" | "OK" | "Created" | "Accepted" | "Non-Authoritative Information" | "No Content" | "Reset Content" | "Partial Content" | "Multi-Status" | "Already Reported" | "Multiple Choices" | "Moved Permanently" | "Found" | "See Other" | "Not Modified" | "Temporary Redirect" | "Permanent Redirect" | "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Method Not Allowed" | "Not Acceptable" | "Proxy Authentication Required" | "Request Timeout" | "Conflict" | "Gone" | "Length Required" | "Precondition Failed" | "Payload Too Large" | "URI Too Long" | "Unsupported Media Type" | "Range Not Satisfiable" | "Expectation Failed" | "I'm a teapot" | "Misdirected Request" | "Unprocessable Content" | "Locked" | "Failed Dependency" | "Too Early" | "Upgrade Required" | "Precondition Required" | "Too Many Requests" | "Request Header Fields Too Large" | "Unavailable For Legal Reasons" | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service Unavailable" | "Gateway Timeout" | "HTTP Version Not Supported" | "Variant Also Negotiates" | "Insufficient Storage" | "Loop Detected" | "Not Extended" | "Network Authentication Required" | undefined;
  redirect?: string | undefined;
  cookie?: Record<string, {
    value: string;
    domain?: string | undefined;
    expires?: Date | undefined;
    httpOnly?: boolean | undefined;
    maxAge?: number | undefined;
    path?: string | undefined;
    priority?: "low" | "medium" | "high" | undefined;
    sameSite?: boolean | "none" | "lax" | "strict" | undefined;
    secure?: boolean | undefined;
    secrets?: string | string[] | undefined
  }> | undefined
}