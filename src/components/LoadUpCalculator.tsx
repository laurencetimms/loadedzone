import { useState, useMemo } from 'react';
import {
  estimateMaxHR,
  zone2_Karvonen,
  calculateLoadUp,
  type UserProfile,
  type TerrainType,
  type GradientType,
  type LoadUpResult,
  type LoadPaceCombination,
} from '../lib/calculators';

const ESTIMATED_RHR: Record<string, number> = {
  sedentary: 72,
  light: 65,
  moderate: 58,
  very_active: 50,
};

export default function LoadUpCalculator() {
  // Form state
  const [age, setAge] = useState<string>('');
  const [bodyWeight, setBodyWeight] = useState<string>('');
  const [useImperial, setUseImperial] = useState(false);
  const [restingHR, setRestingHR] = useState<string>('');
  const [knownMaxHR, setKnownMaxHR] = useState<string>('');
  const [sex, setSex] = useState<'male' | 'female' | ''>('');
  const [fitnessLevel, setFitnessLevel] = useState<'sedentary' | 'light' | 'moderate' | 'very_active'>('light');
  const [duration, setDuration] = useState<string>('45');
  const [terrain, setTerrain] = useState<TerrainType>('pavement');
  const [gradient, setGradient] = useState<GradientType>('flat');
  const [showScience, setShowScience] = useState(false);

  // Result state
  const [result, setResult] = useState<LoadUpResult | null>(null);
  const [zone2Range, setZone2Range] = useState<{ low: number; high: number } | null>(null);

  const canCalculate = age && bodyWeight && parseInt(age) > 0 && parseFloat(bodyWeight) > 0;

  function handleCalculate() {
    if (!canCalculate) return;

    const ageNum = parseInt(age);
    const weightKg = useImperial ? parseFloat(bodyWeight) * 0.453592 : parseFloat(bodyWeight);
    const rhr = restingHR ? parseInt(restingHR) : undefined;
    const maxhr = knownMaxHR ? parseInt(knownMaxHR) : undefined;

    const profile: UserProfile = {
      age: ageNum,
      bodyWeightKg: weightKg,
      restingHR: rhr,
      knownMaxHR: maxhr,
      sex: sex || undefined,
      fitnessLevel,
    };

    const { maxHR: estimatedMax } = estimateMaxHR(profile);
    const effectiveRHR = rhr ?? ESTIMATED_RHR[fitnessLevel];
    const zone2 = zone2_Karvonen(estimatedMax, effectiveRHR);

    setZone2Range({ low: zone2.low, high: zone2.high });

    const loadUpResult = calculateLoadUp({
      bodyWeightKg: weightKg,
      zone2Low: zone2.low,
      zone2High: zone2.high,
      durationMinutes: parseInt(duration) || 45,
      terrain,
      gradient,
      fitnessLevel,
      maxHR: estimatedMax,
      restingHR: effectiveRHR,
    });

    setResult(loadUpResult);
  }

  // Filter zone 2 combinations for the visual grid
  const zone2Grid = useMemo(() => {
    if (!result) return [];
    return result.combinations.filter(c => c.inZone2 && c.loadKg > 0);
  }, [result]);

  // Get unique loads and paces for the heatmap
  const uniqueLoads = useMemo(() => {
    if (!result) return [];
    const loads = [...new Set(result.combinations.map(c => c.loadKg))].filter(l => l > 0);
    return loads.filter((_, i) => i % 2 === 0 || loads.length < 15); // thin if too many
  }, [result]);

  const uniquePaces = useMemo(() => {
    if (!result) return [];
    return [...new Set(result.combinations.map(c => c.paceKmh))];
  }, [result]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Introduction */}
      <div className="mb-8">
        <p className="text-lg text-stone-600 leading-relaxed">
          Most calculators tell you what zone you're in. This one tells you{' '}
          <strong className="text-stone-900">what to carry and how fast to walk to <em>be</em> in zone 2</strong>.
        </p>
        <p className="mt-3 text-stone-500">
          Enter your details below and we'll use the Pandolf equation — originally developed by
          Army researchers — to find your ideal load and pace combination.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Age</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="e.g. 44"
              min="16"
              max="100"
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition"
            />
          </div>

          {/* Body weight */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Body weight
              <button
                onClick={() => setUseImperial(!useImperial)}
                className="ml-2 text-xs font-normal text-zone hover:text-zone-dark transition"
              >
                ({useImperial ? 'switch to kg' : 'switch to lbs'})
              </button>
            </label>
            <div className="relative">
              <input
                type="number"
                value={bodyWeight}
                onChange={e => setBodyWeight(e.target.value)}
                placeholder={useImperial ? 'e.g. 200' : 'e.g. 92'}
                min="30"
                max="250"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">
                {useImperial ? 'lbs' : 'kg'}
              </span>
            </div>
          </div>

          {/* Resting HR */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Resting heart rate
              <span className="text-xs font-normal text-stone-400 ml-1">(optional but recommended)</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={restingHR}
                onChange={e => setRestingHR(e.target.value)}
                placeholder="e.g. 62"
                min="30"
                max="120"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition pr-14"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">bpm</span>
            </div>
            <p className="text-xs text-stone-400 mt-1">Measure first thing in the morning, before getting out of bed. Average over 3-5 days.</p>
          </div>

          {/* Known max HR */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Known max heart rate
              <span className="text-xs font-normal text-stone-400 ml-1">(from a test — optional)</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={knownMaxHR}
                onChange={e => setKnownMaxHR(e.target.value)}
                placeholder="Leave blank to estimate"
                min="120"
                max="230"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition pr-14"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">bpm</span>
            </div>
          </div>

          {/* Sex */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Sex
              <span className="text-xs font-normal text-stone-400 ml-1">(for max HR formula selection)</span>
            </label>
            <select
              value={sex}
              onChange={e => setSex(e.target.value as 'male' | 'female' | '')}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition"
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Fitness level */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Current fitness level</label>
            <select
              value={fitnessLevel}
              onChange={e => setFitnessLevel(e.target.value as any)}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition"
            >
              <option value="sedentary">Sedentary (mostly desk-based)</option>
              <option value="light">Lightly active (walk regularly)</option>
              <option value="moderate">Moderately active (exercise 2-3x/week)</option>
              <option value="very_active">Very active (exercise 4+x/week)</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Walk duration</label>
            <select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition"
            >
              <option value="20">20 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
            </select>
          </div>

          {/* Terrain */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Terrain</label>
            <select
              value={terrain}
              onChange={e => setTerrain(e.target.value as TerrainType)}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition"
            >
              <option value="pavement">Pavement / tarmac</option>
              <option value="gravel">Gravel path</option>
              <option value="grass">Grass / parkland</option>
              <option value="mixed">Mixed terrain</option>
            </select>
          </div>

          {/* Gradient */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Typical gradient</label>
            <select
              value={gradient}
              onChange={e => setGradient(e.target.value as GradientType)}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-zone/40 focus:border-zone transition"
            >
              <option value="flat">Flat</option>
              <option value="gentle">Gentle hills</option>
              <option value="moderate">Moderate hills</option>
            </select>
          </div>
        </div>

        {/* Calculate button */}
        <div className="mt-8">
          <button
            onClick={handleCalculate}
            disabled={!canCalculate}
            className="w-full sm:w-auto px-8 py-3 bg-zone text-white font-semibold rounded-lg hover:bg-zone-dark disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors text-lg"
          >
            Find my load &amp; pace
          </button>
        </div>
      </div>

      {/* Results */}
      {result && zone2Range && (
        <div className="mt-10 space-y-8">

          {/* Primary recommendation */}
          <div className="bg-gradient-to-br from-zone/5 to-zone/10 border border-zone/20 rounded-xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">Your starting point</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-zone">{result.recommended.loadKg}</div>
                <div className="text-sm text-stone-500 mt-1">{useImperial ? `${Math.round(result.recommended.loadKg * 2.205)} lbs` : 'kg'} pack weight</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-zone">{result.recommended.paceKmh}</div>
                <div className="text-sm text-stone-500 mt-1">{useImperial ? `${(result.recommended.paceKmh * 0.621).toFixed(1)} mph` : 'km/h'} pace</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-stone-800">~{result.recommended.estimatedHR}</div>
                <div className="text-sm text-stone-500 mt-1">bpm estimated</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-stone-800">~{result.recommended.caloriesTotal}</div>
                <div className="text-sm text-stone-500 mt-1">kcal total</div>
              </div>
            </div>

            <div className="bg-white/60 rounded-lg p-4 text-stone-700 leading-relaxed">
              <p className="font-medium">
                Your zone 2 range: <span className="text-zone font-bold">{zone2Range.low}–{zone2Range.high} bpm</span>
              </p>
              <p className="mt-2">
                {result.recommended.loadKg === 0
                  ? 'Walk without extra weight at this pace. Your natural effort should put you near zone 2. Once comfortable, add 2-3kg.'
                  : `Carry ${result.recommended.loadKg}kg at ${result.recommended.paceKmh} km/h for ${duration} minutes. This should keep your heart rate around ${result.recommended.estimatedHR} bpm — right in your zone 2.`
                }
              </p>
            </div>
          </div>

          {/* Zone 2 map — which combos hit zone 2 */}
          {uniqueLoads.length > 0 && uniquePaces.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-stone-900 mb-2">Zone 2 combinations</h3>
              <p className="text-sm text-stone-500 mb-4">
                All the load/pace combinations that put you in zone 2. Green cells are in zone 2. Pick the one that suits your route and mood.
              </p>
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="text-sm w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-stone-500 font-medium py-2 pr-3 sticky left-0 bg-white">
                        {useImperial ? 'lbs ↓' : 'kg ↓'} / {useImperial ? 'mph →' : 'km/h →'}
                      </th>
                      {uniquePaces.map(p => (
                        <th key={p} className="text-center text-stone-500 font-medium py-2 px-2 whitespace-nowrap">
                          {useImperial ? (p * 0.621).toFixed(1) : p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueLoads.map(load => (
                      <tr key={load}>
                        <td className="font-medium text-stone-700 py-1.5 pr-3 sticky left-0 bg-white">
                          {useImperial ? Math.round(load * 2.205) : load}
                        </td>
                        {uniquePaces.map(pace => {
                          const combo = result.combinations.find(c => c.loadKg === load && c.paceKmh === pace);
                          if (!combo) return <td key={pace} className="text-center py-1.5 px-2">—</td>;
                          return (
                            <td
                              key={pace}
                              className={`text-center py-1.5 px-2 rounded transition-colors ${
                                combo.inZone2
                                  ? 'bg-zone/15 text-zone-dark font-semibold'
                                  : combo.estimatedHR < (zone2Range?.low ?? 0)
                                    ? 'text-stone-300'
                                    : 'text-stone-300'
                              }`}
                              title={`${combo.estimatedHR} bpm, ~${combo.caloriesPerHour} kcal/hr`}
                            >
                              {combo.inZone2 ? combo.estimatedHR : '·'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-stone-400 mt-3">
                Hover or tap a green cell to see estimated heart rate and calories. Values are estimates based on the Pandolf equation.
              </p>
            </div>
          )}

          {/* Terrain & progression */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-stone-900 mb-2">Terrain note</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{result.terrainAdjustment}</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-stone-900 mb-2">What's next</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{result.progressionAdvice}</p>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-semibold text-amber-900 mb-3">Important</h3>
            <ul className="space-y-2">
              {result.safetyNotes.map((note, i) => (
                <li key={i} className="text-sm text-amber-800 leading-relaxed flex gap-2">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Show me the science */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowScience(!showScience)}
              className="w-full px-6 py-4 text-left flex items-center justify-between bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <span className="font-semibold text-stone-800">Show me the science</span>
              <span className={`text-stone-400 transition-transform ${showScience ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {showScience && (
              <div className="px-6 py-6 text-sm text-stone-600 space-y-4 leading-relaxed">
                <div>
                  <h4 className="font-semibold text-stone-800 mb-1">The Pandolf Equation</h4>
                  <p>
                    First published by Army researchers in 1977, the Pandolf equation estimates the metabolic cost of walking with a load.
                    It accounts for body weight, load weight, walking speed, terrain, and gradient.
                  </p>
                  <p className="mt-2 font-mono text-xs bg-stone-100 p-3 rounded">
                    M = 1.5W + 2.0(W+L)(L/W)² + η(W+L)(1.5V² + 0.35VG)
                  </p>
                  <p className="mt-2 text-xs text-stone-500">
                    Pandolf, K.B. et al. (1977). "Predicting energy expenditure with loads while standing or walking very slowly."
                    Journal of Applied Physiology, 43(4), 577-581.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 mb-1">From metabolic cost to heart rate</h4>
                  <p>
                    We convert the Pandolf output (watts) to an estimated oxygen consumption (VO₂), then use the known
                    linear relationship between %VO₂max and %Heart Rate Reserve to estimate heart rate. This relationship
                    is why the Karvonen method works — and why your resting heart rate matters for accuracy.
                  </p>
                  <p className="mt-2 text-xs text-stone-500">
                    Swain, D.P. et al. (1994). "Target heart rates for the development of cardiorespiratory fitness."
                    Medicine and Science in Sports and Exercise, 26(1), 112-116.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 mb-1">Limitations</h4>
                  <p>
                    This is an estimate, not a prescription. The Pandolf equation was developed on military populations
                    and validated for steady-state walking on relatively uniform terrain. Individual variation in
                    walking economy, cardiovascular drift, temperature, hydration, and fitness can shift actual heart rate
                    by ±10-15% from these estimates. Use a heart rate monitor for your first few sessions to calibrate
                    against the prediction.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
