import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import AssignmentModal from "../components/assignmentsModal/AssignmentModal";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner";
import ErrorModal from "../../shared/Modals/ErrorModal";
import "./Assignments.css";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Assignment {
  _id:         string;
  title:       string;
  description: string;
  classId:     string;
  status?:     string;
  dueDate?:    string;
  points?:     number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusMeta: Record<string, { label: string; cls: string }> = {
  submitted: { label: "Submitted",  cls: "badge--ok"   },
  graded:    { label: "Graded",     cls: "badge--ok"   },
  missing:   { label: "Missing",    cls: "badge--warn" },
  pending:   { label: "Pending",    cls: "badge--muted"},
};

function getStatusMeta(status?: string) {
  if (!status) return null;
  return statusMeta[status.toLowerCase()] ?? { label: status, cls: "badge--muted" };
}

function formatDate(raw?: string): string {
  if (!raw) return "No due date";
  const d = new Date(raw);
  return isNaN(d.getTime())
    ? raw
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Component ─────────────────────────────────────────────────────────────────
const Assignments: React.FC = () => {
  const auth    = useContext(AuthContext);
  const classId = useParams<{ cid: string }>().cid;
  const navigate = useNavigate();

  const [menuVisible,   setMenuVisible]   = useState<boolean>(false);
  const [isLoading,     setIsLoading]     = useState<boolean>(false);
  const [error,         setError]         = useState<string | null>(null);
  const [assignments,   setAssignments]   = useState<Assignment[]>([]);

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchAssignments = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/assignments`,
        {
          method:  "GET",
          headers: {
            Authorization:  `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setAssignments(data.assignments as Assignment[]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [auth.token]);

  useEffect(() => { fetchAssignments(); }, [fetchAssignments]);

  // ── derived ────────────────────────────────────────────────────────────────
  const classAssignments = assignments.filter((a) => a.classId === classId);

  const toggleMenu   = (): void => setMenuVisible((prev) => !prev);
  const errorHandler = (): void => setError(null);

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="asgn-root">
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}

      <Navbar
        logo="ClassConnect"
        handleClick={toggleMenu}
        text="+ Add assignment"
      />

      {menuVisible && (
        <AssignmentModal onClear={toggleMenu} visible={menuVisible} />
      )}

      <main className="asgn-main">
        {/* ── Page header bar ── */}
        <div className="asgn-hero">
          <button className="asgn-back" onClick={() => navigate(-1)}>
            ← Back to classes
          </button>

          <div className="asgn-hero__meta">
            <span className="asgn-hero__label">Class ID</span>
            <span className="asgn-hero__code">{classId}</span>
          </div>

          {/* ── Google quick-launch buttons ── */}
          <div className="asgn-google-btns">
            <a
              href="https://meet.google.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="asgn-google-btn asgn-google-btn--meet"
              aria-label="Start a Google Meet"
            >
              {/* Google Meet icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4Z" fill="currentColor"/>
              </svg>
              Meet
            </a>

            <a
              href="https://sheets.new"
              target="_blank"
              rel="noopener noreferrer"
              className="asgn-google-btn asgn-google-btn--sheets"
              aria-label="Open a new Google Sheet"
            >
              {/* Google Sheets icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" opacity="0.15"/>
                <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="4" y1="8"  x2="20" y2="8"  stroke="currentColor" strokeWidth="1.5"/>
                <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="10" y1="8" x2="10" y2="22" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Sheets
            </a>
          </div>

          <button className="asgn-add-btn" onClick={toggleMenu}>
            + Add assignment
          </button>
        </div>

        {/* ── Page title ── */}
        <div className="asgn-header">
          <h1 className="asgn-header__title">Assignments</h1>
          <p className="asgn-header__sub">
            {classAssignments.length > 0
              ? `${classAssignments.length} assignment${classAssignments.length !== 1 ? "s" : ""}`
              : "No assignments yet — create one to get started."}
          </p>
        </div>

        {/* ── Assignment list ── */}
        {classAssignments.length === 0 ? (
          <div className="asgn-empty">
            <div className="asgn-empty__icon">📝</div>
            <h2 className="asgn-empty__heading">No assignments yet</h2>
            <p className="asgn-empty__sub">Create the first assignment for this class.</p>
            <button className="asgn-add-btn" onClick={toggleMenu}>
              Create assignment
            </button>
          </div>
        ) : (
          <div className="asgn-list">
            {classAssignments.map((a) => {
              const sm = getStatusMeta(a.status);
              return (
                <div className="asgn-card" key={a._id}>
                  {/* left accent bar */}
                  <div className="asgn-card__accent" />

                  <div className="asgn-card__body">
                    {/* header row */}
                    <div className="asgn-card__header">
                      <h2 className="asgn-card__title">{a.title}</h2>
                      {sm && (
                        <span className={`asgn-badge ${sm.cls}`}>{sm.label}</span>
                      )}
                    </div>

                    {/* description */}
                    <p className="asgn-card__desc">{a.description}</p>

                    {/* footer meta */}
                    <div className="asgn-card__footer">
                      <span className="asgn-card__meta">
                        📅 {formatDate(a.dueDate)}
                      </span>
                      {a.points !== undefined && (
                        <span className="asgn-card__meta">
                          ⭐ {a.points} pts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Assignments;