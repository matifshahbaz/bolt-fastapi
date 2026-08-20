export type SpectrumZone = "network" | "balanced" | "attention";

export type UniversityClassSize = {
  name: string;
  range: string;
  x: number;
  y: number;
  radius: number;
  zone: SpectrumZone;
  labelSide: "left" | "right";
};

/**
 * The order is intentionally reversed vertically:
 * large classes / large network at the top, small classes / more attention below.
 */
export const universityClassSizes: UniversityClassSize[] = [
  { name: "پنجاب یونیورسٹی", range: "80–120", x: 310, y: 805, radius: 116, zone: "network", labelSide: "right" },
  { name: "یو ای ٹی یونیورسٹی", range: "60–90", x: 455, y: 990, radius: 106, zone: "network", labelSide: "right" },
  { name: "این ای ڈی یونیورسٹی", range: "60–80", x: 605, y: 1175, radius: 101, zone: "network", labelSide: "right" },
  { name: "کامسیٹس یونیورسٹی", range: "50–70", x: 760, y: 1355, radius: 96, zone: "network", labelSide: "right" },
  { name: "جی سی یو یونیورسٹی", range: "40–60", x: 940, y: 1535, radius: 91, zone: "balanced", labelSide: "right" },
  { name: "قائداعظم یونیورسٹی", range: "40–60", x: 1130, y: 1715, radius: 91, zone: "balanced", labelSide: "right" },
  { name: "نسٹ یونیورسٹی", range: "40–50", x: 1325, y: 1895, radius: 87, zone: "balanced", labelSide: "left" },
  { name: "لمز یونیورسٹی", range: "30–40", x: 1515, y: 2075, radius: 81, zone: "attention", labelSide: "left" },
  { name: "آغا خان یونیورسٹی", range: "20–35", x: 1685, y: 2255, radius: 76, zone: "attention", labelSide: "left" },
  { name: "پیاس یونیورسٹی", range: "20–30", x: 1810, y: 2440, radius: 72, zone: "attention", labelSide: "left" },
];

