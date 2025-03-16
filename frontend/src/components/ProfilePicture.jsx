export default function ProfilePicture({ src, alt, size = 40 }) {
  return (
    <img
      src={src || "/placeholder-profile.png"}
      alt={alt}
      className="rounded-circle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: "cover",
        border: "2px solid #dee2e6",
      }}
      onError={(e) => {
        e.target.src = "/placeholder-profile.png"; // Fallback to placeholder
      }}
    />
  );
}
