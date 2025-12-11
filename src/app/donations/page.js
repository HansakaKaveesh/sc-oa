"use client";

import { useEffect, useState } from "react";
import {
  FiHeart,
  FiGift,
  FiTrendingUp,
  FiRefreshCw,
} from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

// 1) Replace with your actual published CSV URL from Google Sheets
const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1dtPbEOHZYvCFZooHCmJm9fbnuKOi_7gm--c04pukUOs/export?format=csv&gid=0";

// 2) (Optional) Google Form for accepting donations
const DONATION_FORM_URL = "https://forms.gle/1CZQpEsCQXWdQ8Nu5";

// 3) Club logo + hero background (adjust paths as needed)
const CLUB_LOGO = "/Logo SCOC.png";
const headerBgUrl = "/clubs/hero/Designer.png"; // create/choose an image

// --- Small helpers ---

// Very simple CSV parser (OK if your data doesn't contain commas in fields).
// If you need robust parsing, use "papaparse" instead.
function parseDonationsCsv(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());

  const headerIndex = (name) => headers.indexOf(name);

  const tsIdx = headerIndex("Timestamp");
  const nameIdx = headerIndex("Name");
  const typeIdx = headerIndex("Type");
  const amountIdx = headerIndex("Amount");
  const itemIdx = headerIndex("Item");
  const notesIdx = headerIndex("Notes");

  return lines
    .slice(1)
    .map((line) => {
      if (!line.trim()) return null;
      const cols = line.split(",");
      const get = (idx) => (idx >= 0 && cols[idx] ? cols[idx].trim() : "");

      const typeRaw = get(typeIdx).toLowerCase();

      return {
        timestamp: get(tsIdx),
        donor: get(nameIdx) || "Anonymous",
        type: typeRaw, // "money", "item", etc. (we'll treat it as lowercase)
        amount: parseFloat(get(amountIdx) || "0") || 0,
        item: get(itemIdx),
        notes: get(notesIdx),
      };
    })
    .filter(Boolean);
}

// Determine if a row is a money donation
function isMoneyDonation(d) {
  if (!d.type) return false;
  const t = d.type.toLowerCase();
  return t === "money" || t === "cash" || t === "funds";
}

// Determine if a row is an item donation
function isItemDonation(d) {
  if (!d.type) return false;
  const t = d.type.toLowerCase();
  return t === "item" || t === "goods" || t === "in-kind";
}

// --- Small UI components ---

function StatCard({ Icon, label, value, sub, delay = 0 }) {
  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex-1 min-w-[220px]"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
          {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

function DonationCard({ donation, delay = 0 }) {
  const { donor, type, amount, item, timestamp, notes } = donation;
  const money = isMoneyDonation(donation);

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-4 w-full"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-gray-900">{donor}</p>
          <p className="text-xs text-gray-500 mt-0.5">{timestamp}</p>
          {money ? (
            <p className="mt-2 text-sm text-gray-700">
              Donated <span className="font-semibold">LKR {amount.toLocaleString()}</span>
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-700">
              Donated item: <span className="font-semibold">{item || "—"}</span>
            </p>
          )}
          {notes && (
            <p className="mt-1 text-xs text-gray-500 line-clamp-2">
              Note: {notes}
            </p>
          )}
        </div>
        <span
          className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
            money ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          {money ? <FiHeart className="h-4 w-4" /> : <FiGift className="h-4 w-4" />}
        </span>
      </div>
    </div>
  );
}

// --- Main page component ---

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  useEffect(() => {
    async function fetchDonations() {
      try {
        setError("");
        setLoading(true);

        const res = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!res.ok) {
          throw new Error(`Failed to fetch sheet (status ${res.status})`);
        }

        const text = await res.text();
        const parsed = parseDonationsCsv(text);

        // Most recent at top (assuming Timestamp increases)
        const sorted = [...parsed].sort((a, b) =>
          (b.timestamp || "").localeCompare(a.timestamp || "")
        );

        setDonations(sorted);
        setLastUpdated(new Date());
        AOS.refresh();
      } catch (err) {
        console.error(err);
        setError("Could not load donations. Please check the sheet URL or network.");
      } finally {
        setLoading(false);
      }
    }

    fetchDonations();

    // Optional auto-refresh every 60 seconds
    const interval = setInterval(fetchDonations, 60_000);
    return () => clearInterval(interval);
  }, []);

  const moneyDonations = donations.filter(isMoneyDonation);
  const itemDonations = donations.filter(isItemDonation);

  const totalMoney = moneyDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalItemCount = itemDonations.length;
  const totalDonations = donations.length;

  return (
    <main className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Hero */}
      <section
        className="relative py-14 sm:py-18 md:py-28 text-center bg-cover bg-center bg-scroll md:bg-fixed overflow-hidden"
        style={{ backgroundImage: `url('${headerBgUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-blue-50/70 to-white/70 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mt-18">
          {/* Club logo in hero */}
          {CLUB_LOGO && (
            <div className="mb-5 flex justify-center" data-aos="zoom-in" data-aos-delay="50">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden ring-4 ring-blue-50 bg-white/90 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CLUB_LOGO}
                  alt="Club logo"
                  className="h-full w-full object-contain p-2"
                  loading="eager"
                  onLoad={() => AOS.refresh()}
                />
              </div>
            </div>
          )}

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            Donations & Support
          </h1>
          <p
            className="max-w-2xl mx-auto mt-4 text-gray-600 text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Live view of the funds and items donated to support our activities and students.
          </p>

          <div className="mt-6 flex justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            {DONATION_FORM_URL && (
              <a
                href={DONATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg shadow-sm hover:bg-blue-800 transition-colors"
              >
                <FiHeart className="h-4 w-4" />
                Donate via form
              </a>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 text-gray-800 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          {lastUpdated && (
            <p
              className="mt-3 text-xs text-gray-500"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
        {/* Summary */}
        <section className="mt-10">
          <div
            className="flex flex-wrap gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <StatCard
              Icon={FiTrendingUp}
              label="Total money received"
              value={`LKR ${totalMoney.toLocaleString()}`}
              sub="Based on all money-type donations"
              delay={100}
            />
            <StatCard
              Icon={FiGift}
              label="Total item donations"
              value={totalItemCount}
              sub="Number of item entries recorded"
              delay={150}
            />
            <StatCard
              Icon={FiHeart}
              label="Total donations"
              value={totalDonations}
              sub="Money + item entries"
              delay={200}
            />
          </div>
        </section>

        {/* Loading / error state */}
        <section className="mt-8">
          {loading && (
            <p className="text-center text-gray-500" data-aos="fade-in">
              Loading live donations from Google Sheets…
            </p>
          )}
          {!loading && error && (
            <p className="text-center text-red-600" data-aos="fade-in">
              {error}
            </p>
          )}
          {!loading && !error && donations.length === 0 && (
            <p className="text-center text-gray-500" data-aos="fade-in">
              No donations recorded yet. Be the first to donate!
            </p>
          )}
        </section>

        {/* Lists */}
        {!loading && !error && donations.length > 0 && (
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {/* Money donations */}
            <section>
              <h2
                className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900 mb-4"
                data-aos="fade-up"
              >
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-green-50 text-green-700">
                  <FiHeart className="h-4 w-4" />
                </span>
                Recent money donations
              </h2>
              <div className="space-y-3">
                {moneyDonations.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No money donations recorded yet.
                  </p>
                )}
                {moneyDonations.map((d, idx) => (
                  <DonationCard
                    key={`${d.timestamp}_${d.donor}_${idx}`}
                    donation={d}
                    delay={100 + idx * 60}
                  />
                ))}
              </div>
            </section>

            {/* Item donations */}
            <section>
              <h2
                className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900 mb-4"
                data-aos="fade-up"
              >
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-amber-50 text-amber-700">
                  <FiGift className="h-4 w-4" />
                </span>
                Recent item donations
              </h2>
              <div className="space-y-3">
                {itemDonations.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No item donations recorded yet.
                  </p>
                )}
                {itemDonations.map((d, idx) => (
                  <DonationCard
                    key={`${d.timestamp}_${d.donor}_${idx}`}
                    donation={d}
                    delay={100 + idx * 60}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}