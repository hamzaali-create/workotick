import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import Placeholder from "../assets/placeholder.webp";

export default function RestrictedImage({ loaderCss = "h-32 w-full", ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (e) => {
    setIsLoading(false);
    setHasError(true);
    e.target.src = Placeholder;
  };

  useEffect(() => {
    setIsLoading(true);
  }, [props.src]);

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton.Image
          block
          active
          className={`${loaderCss} rounded-md`}
        />
      )}
      <img
        {...props}
        alt="restricted-img"
        src={props.src}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          display: isLoading ? "none" : "block",
          ...props.style,
        }}
      />
    </div>
  );
}
