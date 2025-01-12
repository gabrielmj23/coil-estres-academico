interface CardProps {
  title: string;
  description: string;
  image: string;
  selected: boolean;
  onClick?: () => void;
  imageWidth?: string;
}

function Card({
  title,
  description,
  image,
  selected,
  onClick,
  imageWidth = "10rem",
}: CardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: selected ? "#fff" : "#F7F7F7", // Fondo blanco si seleccionado, gris claro si no
        border: selected ? "2px solid #000" : "",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: selected
          ? "0 4px 8px rgba(0, 0, 0, 0.4)"
          : "0 2px 4px rgba(0, 0, 0, 0.4)",
        transition: "0.05s",
        cursor: "pointer",
        maxWidth: "500px",
        position: "relative",
        minHeight: "150px",
      }}
      onClick={onClick}
    >
      <div className="w-[60%]">
        <h2 style={{ margin: "0", fontWeight: "bold" }} className="text-xl">
          {title}
        </h2>
        <p
          style={{
            fontSize: "14px",
            margin: "5px 0",
            color: "#555",
            textWrap: "balance",
          }}
        >
          {description}
        </p>
      </div>
      <div>
        <img
          src={image}
          alt={title}
          className="absolute bottom-0 right-0 w-40"
          style={{ width: imageWidth }}
        />
      </div>
    </div>
  );
}
export default Card;
