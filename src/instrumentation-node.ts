import dns from "node:dns";
import net from "node:net";

// Networks without working IPv6 make dual-stack connects to PostHog hang until
// ETIMEDOUT, which breaks the /ingest rewrite. Opt out with FORCE_IPV4=0.
if (process.env.FORCE_IPV4 !== "0") {
  dns.setDefaultResultOrder("ipv4first");
  net.setDefaultAutoSelectFamily(false);
}
