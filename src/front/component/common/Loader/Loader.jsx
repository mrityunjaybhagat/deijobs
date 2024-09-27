import { ClipLoader } from "react-spinners";

const Loader = ({ color = "ffffff", loading = true, size = 3 }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <ClipLoader
      color={color}
      loading={loading}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Loader;
