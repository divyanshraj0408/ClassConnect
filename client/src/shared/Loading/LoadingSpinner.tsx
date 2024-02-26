import "./LoadingSpinner.css";
interface props {
  asOverlay?: boolean;
}
const LoadingSpinner = (props: props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
