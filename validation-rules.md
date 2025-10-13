# Validation Rules

## 0) Overview
All input values are validated to ensure physical and dimensional correctness without interrupting calculation flow.  
Validation is **non-blocking** — errors trigger warnings or highlights, but computations continue using safe defaults (0 or clamped limits).  
Every numeric field converts to **SI** before validation, guaranteeing consistency across unit selections.

---

## 1) General Rules
- Accept **integers or decimal floats** only.  
  No scientific notation, symbols, or text input.  
- Blank or invalid fields are treated as **0** for continuity.  
- Unless otherwise noted, all numeric fields must be **≥ 0**.  
- Validation comparisons are made **after converting to SI**.

---

## 2) Fluid Properties

### 2.1 Density
- Can be **entered or displayed in any supported unit**:  
  `SG`, `kg/m³`, `g/L`, `lb/gal (US)`, or `lb/ft³`.  
- **Lower bound:**  
  - At any time, the converted SI density must **never be below the density of pure, distilled water**,  
    i.e. **1000 kg/m³** (equivalent to **SG = 1.000**, **8.345 lb/gal (US)**, or **62.428 lb/ft³** at 60 °F).  
- Upper bound: practical engineering limit **≤ 5000 kg/m³** (SG ≤ 5.0).  
- Numeric format: standard decimal only.

### 2.2 Mix Fluid Concentration
- **≥ 0**.  
- Must **not be less than Mix Water Concentration** (see § 2.3).  
- Numeric, decimal format only.

### 2.3 Mix Water Concentration
- **≥ 0**.  
- Functionally identical to *Water Concentration* in *Mixing Water Details*.  
- Numeric only.

### 2.4 Solids Vol. Fraction (%)
- Range = 0 – 100 %.  
- Stored as fraction = % / 100 for computation.  
- Numeric only.

---

## 3) Fluid Chemical Details

### 3.1 Chemical Code / Name / LOT Number
- Allow all ASCII printable characters (code points 32 – 126).  
  No control or non-printable characters.  
- Enforce **column-level uniqueness**:  
  compare trimmed, lower-cased values; display as typed.  

### 3.2 Concentration
- Numeric, decimal format only.  
- **Phase-aware rule:**  
  - Liquid phase → concentration ≥ 0 in L/m³, gal/bbl, etc.  
  - Solid phase → concentration ≥ 0 in kg/m³, lb/bbl, etc.

---

## 4) Mixing Water Details

### 4.1 Water Type
- Only alphabetic characters (A–Z, a–z) and spaces.

### 4.2 Water Density
- Can be entered/displayed in any supported unit (`SG`, `kg/m³`, `g/L`, `lb/gal (US)`, `lb/ft³`).  
- **Never below 1000 kg/m³ (SG = 1.000)** — the density of pure, distilled water.  
- Recommended upper bound ≤ 2500 kg/m³ (SG ≤ 2.5).  
- Numeric format only.

### 4.3 Water Concentration
- Numeric, decimal format only.  
- **Must not exceed Mix Fluid Concentration** from *Fluid Properties*.

---

## 5) Mixing Pit Details

### 5.1 Pit Name
- Printable ASCII (32 – 126); no control characters.

### 5.2 Pit Capacity
- Numeric only.  
- Must be **> Pit Dead Volume**.  

### 5.3 Pit Dead Volume
- Numeric only.  
- Must be **< Pit Capacity**.

---

## 6) Field Mixing

### 6.1 Pumpable Volume
- Numeric only.  
- Must be **≤ (Pit Capacity − Pit Dead Volume)**.

### 6.2 Total Volume
- Numeric only.  
- Derived automatically = **Pumpable + Dead Volume** (read-only).

---

## 7) Cross-Field Consistency
- `Water Concentration ≤ Mix Fluid Concentration`.  
- `Pit Dead Volume ≤ Pit Capacity`.  
- `Pumpable ≤ (Pit Capacity − Pit Dead Volume)`.  
- Density of any fluid (main, water, brine) ≥ 1000 kg/m³ at all times.  

---

## 8) Error Handling and User Feedback
- Highlight invalid fields visually (red outline or tooltip).  
- Display clear, non-blocking messages such as:  
  - “Invalid number — treated as 0.”  
  - “Out of range (min – max).”  
  - “Density below distilled water threshold (1000 kg/m³).”  
- Computation continues with safe defaults.  

---

## 9) Reference Constants
| Property | Symbol | SI Value | Equivalent in Common Units |
|-----------|---------|-----------|-----------------------------|
| Density of pure distilled water (60 °F / 15.6 °C) | ρ₍water₎ | **1000 kg/m³** | SG = 1.000  ≈ 8.345 lb/gal (US) ≈ 62.428 lb/ft³ |

---

**End of Validation Rules**
