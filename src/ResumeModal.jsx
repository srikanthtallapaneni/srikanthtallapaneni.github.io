import { useEffect, useRef, useState } from 'react';

const EMPTY = { name: '', email: '', company: '', linkedin: '', message: '', website: '' };

export default function ResumeModal({ open, onClose, copy, endpoint }) {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ status: 'idle', error: '' });
  const dialogRef = useRef(null);
  const firstRef = useRef(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      setTimeout(() => firstRef.current?.focus(), 30);
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) setState({ status: 'idle', error: '' });
  }, [open]);

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setState({ status: 'sending', error: '' });
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || 'Something went wrong. Please try again.');
      window.location.assign(data.url);
      setState({ status: 'done', error: '' });
      setForm(EMPTY);
    } catch (err) {
      setState({ status: 'error', error: err.message });
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="resume-modal"
      aria-labelledby="resume-modal-title"
      onClose={onClose}
      onClick={e => { if (e.target === dialogRef.current) onClose(); }}
    >
      <div className="resume-modal-inner">
        <header className="resume-modal-head">
          <div>
            <p className="kicker">{copy.eyebrow}</p>
            <h2 id="resume-modal-title">{copy.heading}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>

        {state.status === 'done' ? (
          <div className="resume-modal-body">
            <p className="resume-done">{copy.success}</p>
            <div className="resume-actions">
              <button type="button" className="cta cta-accent" onClick={onClose}>Close</button>
            </div>
          </div>
        ) : (
          <form className="resume-modal-body" onSubmit={submit} noValidate={false}>
            <p className="resume-intro">{copy.intro}</p>
            <div className="field-grid">
              <label className="field">
                <span>Name <i aria-hidden="true">*</i></span>
                <input ref={firstRef} required maxLength={120} autoComplete="name" value={form.name} onChange={set('name')} />
              </label>
              <label className="field">
                <span>Email <i aria-hidden="true">*</i></span>
                <input required type="email" maxLength={200} autoComplete="email" value={form.email} onChange={set('email')} />
              </label>
              <label className="field field-wide">
                <span>Company <i aria-hidden="true">*</i></span>
                <input required maxLength={160} autoComplete="organization" value={form.company} onChange={set('company')} />
              </label>
            </div>
            <details className="field-more">
              <summary>Additional details <small>Optional</small></summary>
              <label className="field">
                <span>LinkedIn profile URL</span>
                <input type="url" maxLength={300} placeholder="https://www.linkedin.com/in/…" value={form.linkedin} onChange={set('linkedin')} />
              </label>
              <label className="field">
                <span>Message or purpose</span>
                <textarea rows={4} maxLength={1000} value={form.message} onChange={set('message')} />
                <small className="field-count">{form.message.length} / 1000</small>
              </label>
            </details>
            {/* Honeypot: hidden from people, bots tend to fill it */}
            <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} />
            <p className="resume-privacy">{copy.privacy}</p>
            {state.error && <p className="resume-error" role="alert">{state.error}</p>}
            <div className="resume-actions">
              <button type="button" className="cta" onClick={onClose}>Cancel</button>
              <button type="submit" className="cta cta-accent" disabled={state.status === 'sending'}>
                <span>{state.status === 'sending' ? 'Preparing…' : 'Get resume'}</span>
                <span className="cta-arrow" aria-hidden="true">↓</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
