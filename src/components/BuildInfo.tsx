"use client";

import { useMemo } from "react";

type Props = {
  version: string;
  builtAtISO: string;
};

export default function BuildInfo({ version, builtAtISO }: Props) {
  const formatted = useMemo(() => {
    try {
      const d = new Date(builtAtISO);
      if (Number.isNaN(d.getTime())) return builtAtISO;
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(d);
    } catch {
      return builtAtISO;
    }
  }, [builtAtISO]);

  return (
    <span>
      v{version} — Published {formatted}
    </span>
  );
}
