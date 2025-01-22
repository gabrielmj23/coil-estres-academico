interface HistoryCardProps {
  item: SiscoHistoryItem | GoldbergHistoryItem;
}

/**
 * Tarjeta de resultado del historial
 * @author Gabriel
 */
export default function HistoryCard({ item }: HistoryCardProps) {
  const itemDate = new Date(item.date);
  return (
    <div className="flex bg-white border-coilorange-dark border-solid border-[1px] rounded-2xl p-3 gap-3 w-full">
      {/* Date container */}
      <div className="w-1/4 text-center rounded-2xl bg-coilbeige-light flex flex-col justify-center">
        <span className="uppercase text-coilorange-dark font-bold text-lg leading-tight">
          {itemDate
            .toLocaleString("es-ES", { month: "short" })
            .replace(".", "")}
        </span>
        <span className="text-coilterracota font-bold text-xl leading-tight">
          {itemDate.getDate()}
        </span>
      </div>

      {/* Text result */}
      <div className="w-3/4">
        <div className="flex flex-col gap-1">
          <span>
            <strong className="text-coilterracota text-xl">
              {item.questionnaireName}
            </strong>
          </span>
          {"scoreStress" in item && (
            <span className="text-coilterracota leading-tight">
              Resultado: {Math.round(item.scoreStress)}% de estrés académico
            </span>
          )}
          {"scoreAnxiety" in item && (
            <span className="text-coilterracota leading-tight">
              {item.scoreAnxiety > 9 && item.scoreSocial > 9
                ? "Resultado: Presentas síntomas de ansiedad/depresión y disfunción social"
                : item.scoreAnxiety > 9
                ? "Resultado: Presentas síntomas de ansiedad/depresión"
                : item.scoreSocial > 9
                ? "Resultado: Presentas síntomas de disfunción social"
                : "Resultado: Tu salud mental se encuentra en buen estado"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
