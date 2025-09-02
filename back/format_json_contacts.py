import json
from datetime import datetime

# Allowed contact types
CONTACT_TYPES = {"Booster", "Obligate", "Curmudgeon"}


def parse_date(date_str):
    # Assumes MM/DD format, adds year 2025
    try:
        return (
            datetime.strptime(date_str.strip(), "%m/%d")
            .replace(year=2025)
            .strftime("%Y-%m-%d")
        )
    except Exception:
        return None


def parse_bool(val):
    return val.strip().upper() == "TRUE"


def get_contact_type(val):
    val = val.strip()
    return val if val in CONTACT_TYPES else None


def get_company_id(company_name, company_map):
    # You can build a company_map from your DB or assign IDs as needed
    return company_map.setdefault(company_name, len(company_map) + 1)


with open("raw_data.json", "r") as f:
    raw_contacts = json.load(f)

company_map = {}
converted = []
for entry in raw_contacts:
    converted.append(
        {
            "name": entry.get("Name"),
            "email": entry.get("Email"),
            "phone": None,
            "linkedin": None,
            "firstContactDate": parse_date(entry.get("First Contact", "")),
            "firstContactSent": parse_bool(entry.get("3 Day Check", "FALSE")),
            "boosterCheckDate": parse_date(entry.get("Booster Deadline", "")),
            "followupDate": parse_date(entry.get("Obligate Deadline", "")),
            "followupSent": parse_bool(entry.get("7 Day Check", "FALSE")),
            "contactType": get_contact_type(entry.get("Contact Type", "")),
            "company_id": get_company_id(entry.get("Company", ""), company_map),
        }
    )

with open("raw_data_converted.json", "w") as f:
    json.dump(converted, f, indent=2)

print("Conversion complete! See raw_data_converted.json.")
