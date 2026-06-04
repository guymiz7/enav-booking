"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "60min" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        // Match the page palette so the embed feels native.
        styles: { branding: { brandColor: "#102B4B" } },
        theme: "dark",
      });
    })();
  }, []);

  return (
    <Cal
      namespace="60min"
      calLink="efratl-enav/60min"
      style={{
        width: "100%",
        minHeight: "640px",
        overflow: "scroll",
      }}
      config={{
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
      }}
    />
  );
}
