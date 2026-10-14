"use client";

import { useState } from "react";

type Inquiry = { id: string; full_name: string; email: string; phone: string; country: string; service: string; number_of_applicants: number; message: string; status: string; created_at: string; category: string };
const statuses = ["new", "contacted", "in_progress", "completed", "archived"] as const;
const filterGroups = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "contacted", label: "Contacted" },
  { key: "archived", label: "Archived" },
] as const;

export function InquiryManager({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [items, setItems] = useState<Inquiry[]>(initialInquiries);
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);

  async function refresh() {
    const response = await fetch("/api/admin/inquiries");
    const data = await response.json();
    if (!response.ok) setError(data.error || "Could not load inquiries.");
    else setItems(data.inquiries);
  }

  async function update(id: string, status: string) {
    setBusy(true); setError("");
    const response = await fetch("/api/admin/inquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    if (!response.ok) { const data = await response.json(); setError(data.error || "Could not update inquiry."); }
    else await refresh();
    setBusy(false);
  }

  async function remove() {
    if (!deleteTarget) return;
    setBusy(true); setError("");
    const response = await fetch(`/api/admin/inquiries/${deleteTarget.id}`, { method: "DELETE" });
    if (!response.ok) { const data = await response.json(); setError(data.error || "Could not delete inquiry."); setDeleteTarget(null); }
    else { setDeleteTarget(null); await refresh(); }
    setBusy(false);
  }

  const filtered = items.filter((item) => {
    if (filter !== "all" && item.status !== filter) return false;
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      item.full_name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.service.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return <main className="admin-page">
    <div className="admin-page-heading">
      <div><p className="eyebrow text-brass">Inquiries</p><h1>People who reached out.</h1><p>Review each inquiry and keep its status up to date.</p></div>
    </div>
    {error && <p className="admin-error" role="alert">{error}</p>}
    <div className="admin-filter-bar">
      <div className="admin-filter-chips" role="tablist" aria-label="Filter inquiries">
        {filterGroups.map((group) => (
          <button key={group.key} type="button" role="tab" aria-selected={filter === group.key}
            className={`admin-filter-chip${filter === group.key ? " is-active" : ""}`}
            onClick={() => setFilter(group.key)}>
            {group.label}
            <span>{items.filter((i) => group.key === "all" ? true : i.status === group.key).length}</span>
          </button>
        ))}
      </div>
      <div className="admin-search">
        <span className="admin-search-icon" aria-hidden="true">🔍</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email, phone, country, service, message..." aria-label="Search inquiries" />
      </div>
    </div>
    {busy && <p className="admin-notice" role="status">Updating…</p>}
    <div className="admin-inquiry-list">
      {filtered.length === 0
        ? <p className="admin-empty">No inquiries match this filter.</p>
        : filtered.map((item) => (
          <article className="admin-inquiry-card" key={item.id}>
            <div className="admin-inquiry-top">
              <div>
                <strong>{item.full_name}</strong>
                <span>{item.service} · {item.number_of_applicants} applicant{item.number_of_applicants === 1 ? "" : "s"}</span>
                {item.category ? <span className="admin-inquiry-category">{item.category}</span> : null}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                <select value={item.status} onChange={(event) => update(item.id, event.target.value)} aria-label={`Status for ${item.full_name}`} disabled={busy}>
                  {statuses.map((status) => <option key={status} value={status}>{status.replace("_", " ")}</option>)}
                </select>
                {item.status === "completed" ? (
                  <button type="button" className="admin-button admin-button-danger" disabled={busy} onClick={() => setDeleteTarget(item)}>
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
            <div className="admin-inquiry-contact">
              <a href={`mailto:${item.email}`}>{item.email}</a>
              <a href={`tel:${item.phone.replace(/\D/g, "")}`}>{item.phone}</a>
              <a href={`https://wa.me/${item.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a>
              <span>{item.country} · {new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            <p>{item.message}</p>
          </article>
        ))}
    </div>
    {deleteTarget && (
      <div className="admin-confirm" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <strong id="delete-title">Delete this inquiry?</strong>
        <p>&quot;{deleteTarget.full_name}&quot; will be removed permanently. This cannot be undone.</p>
        <div className="admin-confirm-actions">
          <button type="button" className="admin-button admin-button-danger" disabled={busy} onClick={remove}>Delete permanently</button>
          <button type="button" className="admin-button admin-button-quiet" disabled={busy} onClick={() => setDeleteTarget(null)}>Cancel</button>
        </div>
      </div>
    )}
  </main>;
}
