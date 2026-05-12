export interface Game {
  id: number;
  homeTeamName: string;
  homeTeamCrest: string | null;
  awayTeamName: string;
  awayTeamCrest: string | null;
  competitionName: string;
  country: string;
  matchDate: string;
  status: "TIMED" | "SCHEDULED" | "IN_PLAY" | "PAUSED" | "FINISHED";
  homeGoals: number | null;
  awayGoals: number | null;
  winner: string | null;
}

export interface Prediction {
  id: number;
  homeTeamName: string;
  awayTeamName: string;
  market: string;
  score: number;
  recommendation: boolean;
  result: "PENDING" | "GREEN" | "RED";
  createdAt: string;
}

export interface PredictionV2 {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  matchDate: string;
  matchTime: string;
  marketScores: Record<string, unknown>;
  bestMarket: string;
  finalConfidence: number;
  reasoning: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  suggestion: string;
}

export interface AIAnalysis {
  prediction: string;
  analysis: string;
  reasoning: string;
  confidence: "LOW" | "MEDIUM" | "HIGH";
}

export interface TopRecommendation {
  market: string;
  score: number;
  confidence: "LOW" | "MEDIUM" | "HIGH";
  analysis: string;
  keyIndicator: string;
}

export interface TopRecommendationsResponse {
  homeTeam: string;
  awayTeam: string;
  topRecommendations: TopRecommendation[];
}
