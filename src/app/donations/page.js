"use client";

import { useEffect, useState } from "react";
import {
  FiHeart,
  FiGift,
  FiTrendingUp,
  FiRefreshCw,
  FiUsers,
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
const headerBgUrl = "/clubs/hero/Designer.png";

// --- Helpers ---

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
      const get = (idx) =>
        idx >= 0 && cols[idx] ? cols[idx].trim() : "";

      const typeRaw = get(typeIdx).toLowerCase();

      return {
        timestamp: get(tsIdx),
        donor: get(nameIdx) || "Anonymous",
        type: typeRaw,
        amount: parseFloat(get(amountIdx) || "0") || 0,
        item: get(itemIdx),
        notes: get(notesIdx),
      };
    })
    .filter(Boolean);
}

function isMoneyDonation(d) {
  if (!d.type) return false;
  const t = d.type.toLowerCase();
  return t === "money" || t === "cash" || t === "funds";
}

function isItemDonation(d) {
  if (!d.type) return false;
  const t = d.type.toLowerCase();
  return t === "item" || t === "goods" || t === "in-kind";
}

// --- Small UI components ---

function StatCard({ Icon, label, value, sub, delay = 0 }) {
  return (
    <div
      className="group relative flex-1 min-w-[230px] overflow-hidden rounded-2xl border border-slate-100 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-50/90 via-transparent to-indigo-50/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition-colors duration-300 group-hover:bg-sky-600 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {value}
          </p>
          {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

function DonationCard({ donation, delay = 0 }) {
  const { donor, type, amount, item, timestamp, notes } = donation;
  const money = isMoneyDonation(donation);
  const typeLabel = money ? "Money donation" : "Item donation";

  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-50/80 via-transparent to-indigo-50/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-slate-900">{donor}</p>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-600">
              {typeLabel}
            </span>
          </div>
          <p className="text-xs text-slate-500">{timestamp}</p>

          {money ? (
            <p className="mt-2 text-sm text-slate-700">
              Donated{" "}
              <span className="font-semibold text-emerald-700">
                LKR {amount.toLocaleString()}
              </span>
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-700">
              Donated item:{" "}
              <span className="font-semibold text-sky-800">
                {item || "—"}
              </span>
            </p>
          )}

          {notes && (
            <p className="mt-1 text-xs text-slate-500 line-clamp-2">
              Note: {notes}
            </p>
          )}
        </div>

        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm shadow-sm ${
            money
              ? "border-emerald-100 bg-emerald-50 text-emerald-700"
              : "border-amber-100 bg-amber-50 text-amber-700"
          }`}
        >
          {money ? (
            <FiHeart className="h-4 w-4" />
          ) : (
            <FiGift className="h-4 w-4" />
          )}
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
        setError(
          "Could not load donations. Please check the sheet URL or your network connection."
        );
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

  const totalMoney = moneyDonations.reduce(
    (sum, d) => sum + (d.amount || 0),
    0
  );
  const totalItemCount = itemDonations.length;
  const totalDonations = donations.length;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50">
      {/* Decorative blurred blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="absolute right-[-6rem] top-10 h-72 w-72 rounded-full bg-indigo-200/60 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-scroll py-14 text-center sm:py-18 md:bg-fixed md:py-28"
        style={{ backgroundImage: `url('${headerBgUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/60 via-white/75 to-slate-50/95 backdrop-blur-[2px]" />

        <div className="relative z-10 mx-auto mt-10 max-w-6xl px-4 sm:px-6">
          {/* Club logo in hero */}
          {CLUB_LOGO && (
            <div
              className="mb-5 flex justify-center"
              data-aos="zoom-in"
              data-aos-delay="50"
            >
              <div className="relative h-20 w-20 rounded-full bg-white/90 shadow-md ring-4 ring-sky-50 sm:h-24 sm:w-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CLUB_LOGO}
                  alt="Club logo"
                  className="h-full w-full rounded-full object-contain p-2"
                  loading="eager"
                  onLoad={() => AOS.refresh()}
                />
              </div>
            </div>
          )}

          <p
            className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-700 shadow-sm ring-1 ring-sky-100"
            data-aos="fade-up"
            data-aos-delay="60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live impact dashboard
          </p>

          <h1
            className="mt-4 bg-gradient-to-r from-sky-700 via-indigo-700 to-sky-500 bg-clip-text text-3xl font-extrabold text-transparent drop-shadow-sm sm:text-4xl md:text-5xl"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            HEARTS FOR HOPE
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base md:text-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            A transparent, real-time view of the funds and items donated to
            support our students and community. Every contribution makes a
            difference.
          </p>

          <div
            className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {DONATION_FORM_URL && (
              <a
                href={DONATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-colors hover:from-sky-700 hover:to-indigo-700"
              >
                <FiHeart className="h-4 w-4" />
                Donate via form
              </a>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <FiRefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          {lastUpdated && (
            <p
              className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-500"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <FiRefreshCw className="h-3 w-3" />
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 md:pb-24">
        {/* Summary */}
        <section className="mt-10">
          <div
            className="mx-auto mb-4 max-w-xl text-center"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Impact at a glance
            </p>
            <p className="mt-2 text-sm text-slate-600">
              A snapshot of the generosity powering this initiative.
            </p>
          </div>

          <div
            className="flex flex-wrap justify-center gap-4 rounded-3xl bg-white/80 p-4 shadow-lg shadow-sky-100/60 ring-1 ring-slate-100 sm:p-6"
            data-aos="fade-up"
            data-aos-delay="50"
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
              Icon={FiUsers}
              label="Total contributions"
              value={totalDonations}
              sub="Money + item entries"
              delay={200}
            />
          </div>
        </section>

        {/* Loading / error state */}
        <section className="mt-8">
          {loading && (
            <p
              className="text-center text-sm text-slate-500"
              data-aos="fade-in"
            >
              Loading live donations from Google Sheets…
            </p>
          )}
          {!loading && error && (
            <p
              className="text-center text-sm text-red-600"
              data-aos="fade-in"
            >
              {error}
            </p>
          )}
          {!loading && !error && donations.length === 0 && (
            <p
              className="text-center text-sm text-slate-500"
              data-aos="fade-in"
            >
              No donations recorded yet. Be the first to donate!
            </p>
          )}
        </section>

        {/* Lists */}
        {!loading && !error && donations.length > 0 && (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Money donations */}
            <section
              className="relative overflow-hidden rounded-3xl border border-emerald-50 bg-white/80 p-5 shadow-md shadow-emerald-50/60 sm:p-6"
              data-aos="fade-up"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-transparent to-sky-50/80" />
              <div className="relative">
                <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <FiHeart className="h-4 w-4" />
                  </span>
                  Money donations
                </h2>
                <p className="mb-4 text-xs text-slate-500">
                  Financial contributions that directly power our projects.
                </p>
                <div className="space-y-3">
                  {moneyDonations.length === 0 && (
                    <p className="text-sm text-slate-500">
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
              </div>
            </section>

            {/* Item donations */}
            <section
              className="relative overflow-hidden rounded-3xl border border-amber-50 bg-white/80 p-5 shadow-md shadow-amber-50/70 sm:p-6"
              data-aos="fade-up"
              data-aos-delay="80"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50/90 via-transparent to-sky-50/80" />
              <div className="relative">
                <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <FiGift className="h-4 w-4" />
                  </span>
                  Item donations
                </h2>
                <p className="mb-4 text-xs text-slate-500">
                  In-kind support, supplies, and goods shared with care.
                </p>
                <div className="space-y-3">
                  {itemDonations.length === 0 && (
                    <p className="text-sm text-slate-500">
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
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}