import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import IC "ic:aaaaa-aa";

module {
    // Type definitions for HTTP request/response - updated based on error message
    public type HttpHeader = {
        name : Text;
        value : Text;
    };

    // Transform context & function
    public type TransformContext = {
        function : shared query (context : Blob, response : HttpResponsePayload) -> async HttpResponsePayload;
        context : Blob;
    };

    // Types exactly as expected by the management canister
    public type HttpResponsePayload = {
        status : Nat;
        headers : [HttpHeader];
        body : Blob;
    };

    public type HttpRequestArgs = {
        url : Text;
        max_response_bytes : ?Nat;
        headers : [HttpHeader];
        body : Blob;
        method : { #get; #post; #head };
        transform : ?TransformContext;
    };

    /**
     * ==========================================
     *        Quest Verification Function
     * ==========================================
     */
    public func verify(caller : Principal) : async Bool {
        Debug.print("Starting Odin quest verification for principal: " # Principal.toText(caller));

        let simpleCheck = await checkTokensViaHttp(caller);
        if (simpleCheck) {
            Debug.print("Verification successful: User has created tokens on Odin!");
            return true;
        } else {
            Debug.print("Verification failed: User has not created any tokens on Odin");
            return false;
        };
    };

    // A separate function for the HTTP call to simplify error handling
    private func checkTokensViaHttp(caller : Principal) : async Bool {
        try {
            // Define the URL for the HTTP request
            let url = "https://api.odin.fun/v1/user/" # Principal.toText(caller) # "/created?sort=created_time%3Adesc&page=1&limit=30";
            Debug.print("Making HTTP request to URL: " # url);

            // Define HTTP request headers
            let request_headers = [{
                name = "Accept";
                value = "application/json";
            }];

            // Define HTTP request arguments
            let http_request : IC.http_request_args = {
                url = url;
                max_response_bytes = ?400_000; // Increased for bigger responses
                headers = request_headers;
                body = null; // No body needed for GET request
                method = #get;
                transform = null; // Skip transform for now
            };

            // Add cycles to pay for the HTTP outcall
            Debug.print("Adding cycles for HTTP outcall");
            Cycles.add(1_000_000_000); // 1B cycles to be extra safe

            Debug.print("Sending HTTP request...");

            // Make the HTTP request and wait for the response
            let http_response : IC.http_request_result = await IC.http_request(http_request);

            Debug.print("Received HTTP response with status: " # Nat.toText(http_response.status));

            if (http_response.status != 200) {
                Debug.print("Error: HTTP request failed with status " # Nat.toText(http_response.status));
                return false;
            };

            // Print response body size for debugging
            Debug.print("Response body size: " # Nat.toText(Blob.toArray(http_response.body).size()) # " bytes");

            // Decode the response body from Blob to Text
            let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
                case (null) {
                    Debug.print("Error: Failed to decode response body as UTF-8");
                    return false;
                };
                case (?text) { text };
            };

            // Is the data array empty or not?
            if (Text.contains(decoded_text, #text "\"count\":0")) {
                Debug.print("User has no tokens on Odin - count is 0");
                return false;
            } else if (Text.contains(decoded_text, #text "\"data\":[]")) {
                Debug.print("User has no tokens on Odin - empty data array");
                return false;
            } else if (Text.contains(decoded_text, #text "\"data\":[{")) {
                Debug.print("User has tokens on Odin - found tokens in data array");
                return true;
            } else {
                // Last resort - if we can detect the "count" field and it's not 0
                let containsCount = Text.contains(decoded_text, #text "\"count\":");
                let countIsZero = Text.contains(decoded_text, #text "\"count\":0");

                if (containsCount and not countIsZero) {
                    Debug.print("User has tokens on Odin - count field found and not zero");
                    return true;
                } else {
                    Debug.print("Failed to determine token status from response");
                    // For debugging, print a sample of the response without using substring
                    let maxLength = 200;
                    let sample = if (Text.size(decoded_text) > maxLength) {
                        // Print first 200 chars
                        var result = "";
                        var count = 0;
                        for (c in Text.toIter(decoded_text)) {
                            if (count < maxLength) {
                                result := result # Text.fromChar(c);
                            };
                            count += 1;
                        };
                        result # "...";
                    } else {
                        decoded_text;
                    };
                    Debug.print("Response sample: " # sample);
                    return false;
                };
            };
        } catch (e) {
            Debug.print("Error making HTTP request: " # Error.message(e));
            return false;
        };
    };
};
