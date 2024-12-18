module {
    public type SupportedStandard = {
        url : Text;
        name : Text;
    };

    public type Icrc28TrustedOriginsResponse = {
        trusted_origins : [Text];
    };

    public func icrc10_supported_standards() : [SupportedStandard] {
        return [
            {
                url = "https://github.com/dfinity/ICRC/blob/main/ICRCs/ICRC-10/ICRC-10.md";
                name = "ICRC-10";
            },
            {
                url = "https://github.com/dfinity/wg-identity-authentication/blob/main/topics/icrc_28_trusted_origins.md";
                name = "ICRC-28";
            },
        ];
    };

    public func icrc28_trusted_origins() : Icrc28TrustedOriginsResponse {
        let trusted_origins = [
            "http://localhost:3000",
            "http://localhost:3002",
            "http://localhost:3003",
            "https://kjeai-kiaaa-aaaao-qjwoa-cai.icp0.io",
            "https://kjeai-kiaaa-aaaao-qjwoa-cai.raw.icp0.io",
            "https://ic-quests.com",
        ];
        return { trusted_origins };
    };
};
