import dns from "node:dns";
import net from "node:net";

// Networks without working IPv6 make dual-stack server-side connects hang until
// ETIMEDOUT. Opt out with FORCE_IPV4=0.
if (process.env.FORCE_IPV4 !== "0") {
  dns.setDefaultResultOrder("ipv4first");
  net.setDefaultAutoSelectFamily(false);
}
