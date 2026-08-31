import HealthScoreCard from "../HealthScoreCard";
import { MOCK_SCORE_ENTRIES } from "../../constants/mockScoreData";

export default function HealthScoreVisual() {
  return <HealthScoreCard entries={MOCK_SCORE_ENTRIES} />;
}