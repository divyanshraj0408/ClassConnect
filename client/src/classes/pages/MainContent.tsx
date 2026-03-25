import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import Cards from "../components/cards/Cards";
import ErrorModal from "../../shared/Modals/ErrorModal";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner";
import CreateClassModal from "../components/classModal/ClassModal";
import { AuthContext } from "../../shared/context/auth-context";
import logo from "../../landingPage/assets/logo/svg/logo-no-background.svg";
import "./MainContent.css";

// ── Types ────────────────────────────────────────────────────────────────────
interface ClassItem {
  _id: string;
  title: string;
  description: string;
  classCode: string;
  creator: string;
  members: string[];
}

// ── Component ─────────────────────────────────────────────────────────────────
const MainContent: React.FC = () => {
  const auth   = useContext(AuthContext);
  const userId = useParams<{ uid: string }>().uid;

  const [menuVisible,   setMenuVisible]   = useState<boolean>(false);
  const [isLoading,     setIsLoading]     = useState<boolean>(false);
  const [error,         setError]         = useState<string | null>(null);
  const [loadedClasses, setLoadedClasses] = useState<ClassItem[]>([]);

  // ── fetch classes ──────────────────────────────────────────────────────────
  const fetchClasses = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/classes`,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);
      setLoadedClasses(responseData.classes as ClassItem[]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [auth.token]);

  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  // ── helpers ────────────────────────────────────────────────────────────────
  const toggleMenu   = (): void => setMenuVisible((prev) => !prev);
  const errorHandler = (): void => setError(null);

  const visibleClasses = loadedClasses.filter(
    (c) => c.creator === userId || c.members.includes(userId ?? "")
  );

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="mc-root">
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}

      <Navbar
        logo={<img src={logo} alt="ClassConnect" className="navbar-logo" />}
        handleClick={toggleMenu}
        text="+ Add class"
      />

      <main className="mc-main container">
        {/* ── page header ── */}
        <div className="mc-header">
          <div>
            <h1 className="mc-header__title">My Classes</h1>
            <p className="mc-header__sub">
              {visibleClasses.length > 0
                ? `${visibleClasses.length} class${visibleClasses.length !== 1 ? "es" : ""} enrolled`
                : "Get started by creating or joining a class."}
            </p>
          </div>
          <button className="mc-add-btn" onClick={toggleMenu}>
            + Add class
          </button>
        </div>

        {/* ── create class modal ── */}
        {menuVisible && (
          <CreateClassModal
            onClear={toggleMenu}
            visible={menuVisible}
          />
        )}

        {/* ── content ── */}
        {visibleClasses.length === 0 ? (
          <div className="mc-empty">
            <div className="mc-empty__icon">🎒</div>
            <h2 className="mc-empty__heading">No classes yet</h2>
            <p className="mc-empty__sub">Create a class or ask your teacher for a class code.</p>
            <button className="mc-add-btn" onClick={toggleMenu}>
              Make a class
            </button>
          </div>
        ) : (
          <div className="mc-grid">
            {visibleClasses.map((card) => (
              <Cards
                key={card._id}
                name={card.title}
                description={
                  card.description.length > 80
                    ? card.description.slice(0, 80) + "…"
                    : card.description
                }
                classCode={card.classCode}
                id={card._id}
                creator={card.creator}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainContent;