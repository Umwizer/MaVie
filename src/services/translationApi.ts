// src/services/translationApi.ts

export type TranslationLanguage = {
  code: string;
  name: string;
  targets?: string[];
};

const LIBRE_TRANSLATE_URL = "https://libretranslate.com";

// Fetch languages supported by LibreTranslate
export async function fetchLanguages(): Promise<TranslationLanguage[]> {
  const response = await fetch(`${LIBRE_TRANSLATE_URL}/languages`);

  if (!response.ok) {
    throw new Error("Unable to load languages");
  }

  const data = await response.json();

  return data;
}

// Translate text from one language to another
export async function translateText(
  text: string,
  source: string,
  target: string
): Promise<string> {
  if (!text.trim()) {
    return "";
  }

  // Don't translate if the languages are the same
  if (source === target) {
    return text;
  }

  const response = await fetch(`${LIBRE_TRANSLATE_URL}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      source,
      target,
      format: "text",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Translation API error:", errorText);

    throw new Error("Translation failed");
  }

  const data = await response.json();

  return data.translatedText;
}