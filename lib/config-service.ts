import { unstable_cache } from "next/cache";

import { fallbackConfigCsv } from "@/data/fallback-config";
import { parseCsvLine, splitCsvRows } from "@/lib/csv";
import type { SiteConfig, SiteConfigWithComputed } from "@/types/config";

// URL do CSV da aba "Config" (business)
// Prioridade: BUSINESS_CSV_URL > NEXT_PUBLIC_CONFIG_URL > fallback
const DEFAULT_BUSINESS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pub?gid=1&output=csv";

const BUSINESS_CSV_URL =
  process.env.BUSINESS_CSV_URL ??
  process.env.NEXT_PUBLIC_CONFIG_URL ??
  DEFAULT_BUSINESS_CSV_URL;

const CONFIG_URL = BUSINESS_CSV_URL;

const CACHE_TAG = "config-data";

async function fetchConfigCsv(): Promise<string> {
  const response = await fetch(CONFIG_URL, {
    next: {
      revalidate: 60 * 60, // 1 hour
      tags: [CACHE_TAG],
    },
  });

  if (!response.ok) {
    throw new Error(`Google Sheets config request failed with ${response.status}`);
  }

  return response.text();
}



function normalizeHeader(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function buildConfig(csv: string): SiteConfig {
  const [headerLineRaw, ...rowLines] = splitCsvRows(csv).filter((line) =>
    line.trim().length > 0,
  );
  const headerLine = headerLineRaw?.replace(/^\ufeff/, "");

  if (!headerLine || !rowLines.length) {
    throw new Error("Config CSV without content");
  }

  const headers = parseCsvLine(headerLine).map(normalizeHeader);
  const values = parseCsvLine(rowLines[0] ?? "");

  const getValue = (candidates: string[], fallback = "") => {
    for (const candidate of candidates) {
      const index = headers.indexOf(candidate);
      if (index >= 0) {
        return values[index]?.trim() ?? fallback;
      }
    }
    return fallback;
  };

  const config: SiteConfig = {
    restaurantName: getValue(["restaurante", "nome"], "configurar em config-service-ts"),
    cnpj: getValue(["cnpj"], ""),
    phone: getValue(["telefone", "phone"], ""),
    whatsapp: getValue(["whatsapp", "whats"], ""),
    address: getValue(["endereco", "endereco1"], ""),
    neighborhood: getValue(["bairro"], ""),
    city: getValue(["cidade", "city"], ""),
    state: getValue(["estado", "uf", "state"], ""),
    instagram: getValue(["instagram", "ig"], ""),
    facebook: getValue(["facebook", "fb"], ""),
    formularioCupom: false, // Será sobrescrito pela feature config se disponível
  };

  return config;
}



function enrichConfig(config: SiteConfig): SiteConfigWithComputed {
  const trimmedWhatsapp = config.whatsapp.replace(/[^0-9]/g, "");
  const formattedAddressParts = [config.address, config.neighborhood]
    .filter(Boolean)
    .join(", ");
  const cityState = [config.city, config.state].filter(Boolean).join("/");
  const formattedAddress = [formattedAddressParts, cityState].filter(Boolean).join(" - ");

  return {
    ...config,
    formattedAddress,
    whatsappLink: trimmedWhatsapp
      ? `https://wa.me/5516991431147`
      : "https://wa.me/5516991431147",
  };
}

async function loadConfig(): Promise<SiteConfigWithComputed> {
  try {
    const csv = await fetchConfigCsv();
    const config = buildConfig(csv);

    const configWithFeatures: SiteConfig = {
      ...config,
      formularioCupom: true, // Sempre habilitado por padrão
    };

    return enrichConfig(configWithFeatures);
  } catch (error) {
    console.warn("Falling back to local config data", error);
    const fallbackConfig = buildConfig(fallbackConfigCsv);
    const configWithFeatures: SiteConfig = {
      ...fallbackConfig,
      formularioCupom: true,
    };
    return enrichConfig(configWithFeatures);
  }
}

export const getSiteConfig = unstable_cache(loadConfig, [CACHE_TAG], {
  revalidate: 60 * 60, // 1 hour cache
});
