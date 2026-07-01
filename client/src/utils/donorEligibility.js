// Minimum gap between two whole-blood donations.
export const DONATION_INTERVAL_DAYS = 56;

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Computes donor eligibility from the last donation date.
 * Eligibility is derived live, so it updates automatically as days pass.
 *
 * @param {string|Date|null} lastDonationDate - ISO string / Date, or null/empty for "never donated" (NIL).
 */
export function getDonorEligibility(lastDonationDate) {
  if (!lastDonationDate) {
    return {
      neverDonated: true,
      eligible: true,
      daysSince: null,
      daysRemaining: 0,
      nextEligibleDate: null,
    };
  }

  const last = new Date(lastDonationDate);
  const now = new Date();

  const daysSince = Math.floor((now - last) / MS_PER_DAY);
  const eligible = daysSince >= DONATION_INTERVAL_DAYS;
  const daysRemaining = Math.max(0, DONATION_INTERVAL_DAYS - daysSince);
  const nextEligibleDate = new Date(
    last.getTime() + DONATION_INTERVAL_DAYS * MS_PER_DAY
  );

  return {
    neverDonated: false,
    eligible,
    daysSince,
    daysRemaining,
    nextEligibleDate,
  };
}

export function formatDonationDate(d) {
  if (!d) return "NIL";
  return new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
