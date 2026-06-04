"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "15min" });
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
      namespace="15min"
      calLink="efratl-enav/15min"
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
