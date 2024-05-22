import { headers } from "next/headers";

function getHeaders(): {
  ip: string;
  userAgent: string;
  protocol: string;
  domain: string;
} {
  let ip = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    ip = forwardedFor.split(",")[0] ?? ip;
  } else {
    ip = headers().get("x-real-ip") ?? ip;
  }

  const userAgent = headers().get("user-agent") ?? "";
  const domain = headers().get("x-forwarded-host") || "";
  const protocol = headers().get("x-forwarded-proto") || "";

  return { ip, userAgent, protocol, domain };
}
export async function trackEvent(
  event: AnalyticsEvent
): Promise<unknown> {
  "use server";
  const { ip, userAgent, protocol, domain } = getHeaders();

  try {
    const res = await fetch("https://api.pirsch.io/api/v1/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PIRSCH_KEY}`,
      },
      body: JSON.stringify({
        event_name: event.event_name,
        event_meta: event.event_meta,
        url: `${protocol}://${domain}`,
        ip: ip,
        accept_language: "en-US",
        user_agent: userAgent,
      }),
    });
    return { event, status: res.status };
  } catch (e) {
    return e;
  }
}
