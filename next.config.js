/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // env: {
  //   URL: 'http://localhost:5001',

  //   CLIENT_ID: "BO12qnqLP_vnsd3iCcH7sU3GGqYmOGr_1IgDno3t35KjWFZcdk7HIPeGGJINB4DKyvsX3YZeFdjwSbCUItLJI3U",
  //   RPCTARGET: "https://api.devnet.solana.com/",
  //   BLOCKEXPLORER: "https://explorer.solana.com/?cluster=devnet",
  //   TICKER: "SOL",
  //   TICKERNAME: "Solana Token",

  //   customKey: 'my-value',
  //   SOLANA_API: 'https://damp-long-fog.solana-devnet.quiknode.pro/0d4914481d7110a0b5bc43d3a4070a684033e733/',

  //   GARI_ASSOCIATED_TOKEN_PROGRAM_ID: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  //   PROGRAM_ID: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  //   GARI_TOKEN_ADDRESS: '7gjQaUHVdP8m7BvrFWyPkM7L3H9p4umwm3F56q1qyLk1',
  //   GARI_ASSOCIATED_ACCOUNT: 'CbsTsL5nBhe5LZ9fk9Ltcq5sYYiZVyRLL9WLJxNeBVM3',

  //   AIRDROP_FEEPAYER_PRIVATE_KEY: '45,127,220,175,138,166,34,91,25,11,84,33,80,163,7,128,85,197,75,11,25,181,109,3,184,218,78,17,140,205,211,102,130,23,2,115,15,102,207,51,54,138,233,194,155,161,77,54,195,187,16,208,233,35,240,242,20,166,18,66,234,83,16,107',
  //   AIRDROP_FEEPAYER_ASSOCIATED_ACCOUNT: 'CbsTsL5nBhe5LZ9fk9Ltcq5sYYiZVyRLL9WLJxNeBVM3',
  //   AIRDROP_FEEPAYER_PUBLIC_KEY: '9kpML3MhVLPmASMDBYuaMzmFiCtdm3aityWu1pJZ1wR4',
  //   GARI_PUBLIC_KEY: '9kpML3MhVLPmASMDBYuaMzmFiCtdm3aityWu1pJZ1wR4',
  // },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

module.exports = nextConfig
