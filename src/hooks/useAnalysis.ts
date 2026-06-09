import { useState, useCallback } from 'react';
import { analyzeHealth } from '../services/api';
import { saveAnalysis, saveProfile } from '../utils/storage';
import type { AnalysisResult, UserProfile } from '../types';

export function useAnalysis() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(async (profile: UserProfile) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeHealth(profile);
      setResult(data);
      saveAnalysis(data);
      saveProfile(profile);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, runAnalysis, clearResult, setResult };
}
