import re
from pathlib import Path

import pandas as pd
import pdfplumber


PDF_PATH = Path("public/data/gemeindesteuerfuesse2025.pdf")
OUTPUT_PATH = Path("public/data/tax_rates_2025.csv")


def extract_tax_rates() -> pd.DataFrame:
    rows = []

    with pdfplumber.open(PDF_PATH) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""

            for line in text.splitlines():
                # Beispiel:
                # 7001 533 Chur 88 11 3.5 10 0.5 2
                match = re.match(
                    r"^\s*(\d{4})\s+(\d{3})\s+(.+?)\s+(\d+(?:\.\d+)?)\s+",
                    line,
                )

                if not match:
                    continue

                postal_code = match.group(1)
                bfs_number = match.group(2)
                municipality = match.group(3).strip()
                tax_rate = float(match.group(4))

                rows.append(
                    {
                        "postal_code": postal_code,
                        "bfs_number": bfs_number,
                        "municipality": municipality,
                        "tax_rate_2025": tax_rate,
                    }
                )

    df = pd.DataFrame(rows)

    # Duplikate entfernen, falls durch PDF-Struktur doppelt gelesen
    df = df.drop_duplicates(subset=["bfs_number", "municipality"])

    # Nach Gemeinde sortieren
    df = df.sort_values("municipality").reset_index(drop=True)

    return df


if __name__ == "__main__":
    if not PDF_PATH.exists():
        raise FileNotFoundError(
            f"PDF not found: {PDF_PATH}. "
            "Save the PDF there first."
        )

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    df = extract_tax_rates()
    df.to_csv(OUTPUT_PATH, index=False, encoding="utf-8")

    print(f"Saved {len(df)} rows to {OUTPUT_PATH}")
    print(df.head(10))