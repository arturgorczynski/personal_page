/**
 * Composable for timeline path generation and date calculations
 */
import { computed } from "vue";

/**
 * Parse date string to year and month
 * @param {string|number} date - Date string "YYYY-MM", number for year, or "Present"
 * @returns {{year: number, month: number}} - Parsed year and month
 */
export function parseDate(date) {
  if (typeof date === "number") {
    return { year: date, month: 1 };
  }
  if (typeof date === "string" && date === "Present") {
    return { year: 2026, month: 12 };
  }
  const [year, month] = date.split("-").map(Number);
  return { year, month: month || 1 };
}

/**
 * Convert date to decimal year for positioning
 * @param {string|number} date - Date to convert
 * @returns {number} - Decimal year (e.g., 2023.5 for mid-2023)
 */
export function dateToDecimal(date) {
  const { year, month } = parseDate(date);
  return year + (month - 1) / 12;
}

/**
 * Format date for display
 * @param {string|number} date - Date to format
 * @returns {string} - Formatted date string (e.g., "Jan 2023")
 */
export function formatDate(date) {
  if (typeof date === "string" && date === "Present") {
    return "Present";
  }
  const { year, month } = parseDate(date);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[month - 1]} ${year}`;
}

/**
 * Format date range for display
 * @param {string} start - Start date
 * @param {string} end - End date
 * @returns {string} - Formatted date range
 */
export function formatDateRange(start, end) {
  return `${formatDate(start)} - ${formatDate(end)}`;
}

/**
 * Composable for timeline path generation and positioning
 * @param {Object} options - Timeline configuration options
 * @returns {Object} - Computed values and helper functions
 */
export function useTimeline(options = {}) {
  const {
    svgWidth = 1000,
    svgHeight = 400,
    padding = 60,
    bottomY = 300,
    topY = 100,
    curveRadius = 100,
    bottomYears = [2014, 2015, 2016, 2017, 2018, 2019, 2020],
    topYears = [2021, 2022, 2023, 2024, 2025, 2026],
  } = options;

  /**
   * Get X position for a year tick mark
   * @param {number} year - Year to position
   * @param {string} row - "bottom" or "top"
   * @returns {number} - X coordinate
   */
  const getYearX = (year, row) => {
    const startX = padding;
    const endX = svgWidth - padding - curveRadius;
    const lineWidth = endX - startX;

    if (row === "bottom") {
      const progress = (year - 2014) / (2020 - 2014);
      return startX + progress * lineWidth;
    } else {
      const progress = (year - 2021) / (2026 - 2021);
      return endX - progress * lineWidth;
    }
  };

  /**
   * Generate SVG path data for the timeline
   */
  const pathData = computed(() => {
    const startX = padding;
    const endX = svgWidth - padding - curveRadius;
    const curveEndX = endX + curveRadius;

    let d = `M ${startX},${bottomY}`;
    d += ` L ${endX},${bottomY}`;
    d += ` C ${curveEndX},${bottomY} ${curveEndX},${topY} ${endX},${topY}`;
    d += ` L ${startX},${topY}`;

    return d;
  });

  /**
   * Path with arrow extension
   */
  const pathDataWithArrow = computed(() => {
    const startX = padding;
    const arrowLength = 20;
    return pathData.value + ` L ${startX - arrowLength},${topY}`;
  });

  /**
   * Calculate position for an item based on its date
   * @param {string|number} date - Date of the item
   * @returns {{x: number, y: number, row: string}} - Position info
   */
  const getPositionForDate = (date) => {
    const decimal = dateToDecimal(date);
    const startX = padding;
    const endX = svgWidth - padding - curveRadius;
    const lineWidth = endX - startX;

    if (decimal <= 2020) {
      const progress = (decimal - 2014) / (2020 - 2014);
      return {
        x: startX + progress * lineWidth,
        y: bottomY,
        row: "bottom",
      };
    } else {
      const progress = (decimal - 2021) / (2026 - 2021);
      return {
        x: endX - progress * lineWidth,
        y: topY,
        row: "top",
      };
    }
  };

  /**
   * Calculate positions for experience items with alternating labels
   * @param {Object[]} experience - Array of experience objects
   * @returns {Object[]} - Positions with label info
   */
  const calculateExperiencePositions = (experience) => {
    if (!experience || experience.length === 0) return [];

    const items = experience.map((item, originalIndex) => ({
      ...item,
      originalIndex,
      decimal: dateToDecimal(item.start),
    }));

    const bottomItems = items
      .filter((item) => item.decimal <= 2020)
      .sort((a, b) => a.decimal - b.decimal);
    const topItems = items
      .filter((item) => item.decimal > 2020)
      .sort((a, b) => a.decimal - b.decimal);

    const result = [];

    bottomItems.forEach((item, idx) => {
      const pos = getPositionForDate(item.start);
      result.push({
        ...item,
        ...pos,
        labelPosition: idx % 2 === 0 ? "below" : "above",
      });
    });

    topItems.forEach((item, idx) => {
      const pos = getPositionForDate(item.start);
      result.push({
        ...item,
        ...pos,
        labelPosition: idx % 2 === 0 ? "above" : "below",
      });
    });

    return result;
  };

  /**
   * Group technologies by date and calculate positions
   * @param {Object[]} technologies - Array of technology objects
   * @returns {Object[]} - Grouped technologies with positions
   */
  const calculateTechnologyPositions = (technologies) => {
    if (!technologies || technologies.length === 0) return [];

    const groups = {};
    technologies.forEach((tech) => {
      const key = tech.start;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(tech);
    });

    const result = [];
    let groupIdx = 0;

    Object.entries(groups).forEach(([date, techs]) => {
      const pos = getPositionForDate(date);
      const labelPosition =
        groupIdx % 2 === 0
          ? pos.row === "bottom"
            ? "below"
            : "above"
          : pos.row === "bottom"
            ? "above"
            : "below";

      result.push({
        date,
        technologies: techs,
        ...pos,
        labelPosition,
      });
      groupIdx++;
    });

    return result.sort((a, b) => dateToDecimal(a.date) - dateToDecimal(b.date));
  };

  return {
    svgWidth,
    svgHeight,
    padding,
    bottomY,
    topY,
    curveRadius,
    bottomYears,
    topYears,
    pathData,
    pathDataWithArrow,
    getYearX,
    getPositionForDate,
    calculateExperiencePositions,
    calculateTechnologyPositions,
    parseDate,
    dateToDecimal,
    formatDate,
    formatDateRange,
  };
}


