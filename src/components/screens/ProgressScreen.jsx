import { useContext } from 'react';
import { DataContext } from '../../data/DataContext';

const s = {
  page: { fontFamily: "Georgia,serif", maxWidth: 560, margin: '0 auto', padding: '2rem 1.25rem' },
  heading: { fontSize: 28, fontWeight: 400, color: 'var(--ts-heading)', margin: '0 0 6px', letterSpacing: -0.5 },
  muted: { color: 'var(--ts-muted)', fontSize: 14, margin: 0, lineHeight: 1.5 },
  card: { background: 'var(--ts-card)', border: '1px solid var(--ts-border)', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: 12 },
  label: { color: 'var(--ts-muted)', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 12px', display: 'block' },
  subheading: { fontSize: 17, fontWeight: 500, color: 'var(--ts-heading)', margin: '0 0 4px' },
};

function ProgressBar({ value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: 'var(--ts-track)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color || 'var(--ts-btn)', borderRadius: 4, transition: 'width 0.5s ease' }} />
      </div>
      <span style={{ color: 'var(--ts-muted)', fontSize: 12, minWidth: 36, textAlign: 'right' }}>{pct}%</span>
    </div>
  );
}

function StatCard({ value, label, emoji }) {
  return (
    <div style={{ ...s.card, textAlign: 'center', padding: '1.25rem 1rem', marginBottom: 0 }}>
      <div style={{ fontSize: 28, marginBottom: 4 }}>{emoji}</div>
      <p style={{ fontSize: 26, fontWeight: 500, color: 'var(--ts-accent-text)', margin: '0 0 4px' }}>{value}</p>
      <p style={{ fontSize: 12, color: 'var(--ts-muted)', margin: 0 }}>{label}</p>
    </div>
  );
}

export default function ProgressScreen() {
  const { goals } = useContext(DataContext);

  const allSteps = goals.flatMap(g => g.tinySteps);
  const completedSteps = allSteps.filter(s => s.status === 'completed');
  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  const overallPct = allSteps.length > 0 ? Math.round((completedSteps.length / allSteps.length) * 100) : 0;

  // Steps completed in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentSteps = completedSteps.filter(s => s.completedAt && new Date(s.completedAt) > sevenDaysAgo);

  // Streak — count consecutive days with at least one completed step
  function calcStreak() {
    if (completedSteps.length === 0) return 0;
    const days = new Set(
      completedSteps
        .filter(s => s.completedAt)
        .map(s => new Date(s.completedAt).toDateString())
    );
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      if (days.has(d.toDateString())) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  const streak = calcStreak();

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={s.heading}>Progress</h1>
        <p style={s.muted}>
          {goals.length === 0
            ? 'Create some goals to start tracking progress.'
            : 'Every step counts, even the small ones.'}
        </p>
      </div>

      {goals.length === 0 ? (
        <div style={{ ...s.card, textAlign: 'center', padding: '2.5rem' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌱</div>
          <p style={s.muted}>No goals yet. Head to Goals to create your first one.</p>
        </div>
      ) : (
        <>
          {/* Overall progress */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={s.label}>Overall completion</span>
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: 'var(--ts-heading)', fontSize: 15 }}>All goals combined</span>
                <span style={{ color: 'var(--ts-accent-text)', fontSize: 15, fontWeight: 500 }}>{overallPct}%</span>
              </div>
              <ProgressBar value={completedSteps.length} max={allSteps.length} />
              <p style={{ ...s.muted, fontSize: 13, marginTop: 10 }}>
                {completedSteps.length} of {allSteps.length} steps completed
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={s.label}>At a glance</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <StatCard value={activeGoals.length} label="Active goals" emoji="🎯" />
              <StatCard value={completedGoals.length} label="Completed goals" emoji="✅" />
              <StatCard value={recentSteps.length} label="Steps this week" emoji="📅" />
              <StatCard value={`${streak}d`} label="Current streak" emoji="🔥" />
            </div>
          </div>

          {/* Per-goal breakdown */}
          <div>
            <span style={s.label}>By goal</span>
            {goals.map(goal => {
              const total = goal.tinySteps.length;
              const done = goal.tinySteps.filter(s => s.status === 'completed').length;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              const color = goal.status === 'completed' ? 'var(--ts-done-btn)' : goal.status === 'paused' ? '#aaa' : 'var(--ts-btn)';

              return (
                <div key={goal.id} style={s.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div>
                      <h3 style={{ ...s.subheading, margin: '0 0 2px' }}>{goal.title}</h3>
                      <span style={{ fontSize: 11, color: 'var(--ts-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{goal.status}</span>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 500, color: 'var(--ts-accent-text)' }}>{pct}%</span>
                  </div>

                  {total > 0 ? (
                    <>
                      <ProgressBar value={done} max={total} color={color} />
                      <p style={{ ...s.muted, fontSize: 13, marginTop: 8 }}>{done} of {total} steps done</p>
                    </>
                  ) : (
                    <p style={{ ...s.muted, fontSize: 13 }}>No steps added yet.</p>
                  )}

                  {/* Completed steps list */}
                  {done > 0 && (
                    <div style={{ marginTop: 12, borderTop: '1px solid var(--ts-border)', paddingTop: 10 }}>
                      <p style={{ ...s.muted, fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Completed</p>
                      {goal.tinySteps.filter(s => s.status === 'completed').map(step => (
                        <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ color: 'var(--ts-btn)', fontSize: 14 }}>✓</span>
                          <span style={{ fontSize: 14, color: 'var(--ts-muted)', textDecoration: 'line-through' }}>{step.title}</span>
                          {step.completedAt && (
                            <span style={{ fontSize: 11, color: 'var(--ts-muted)', marginLeft: 'auto' }}>
                              {new Date(step.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <p style={{ color: 'var(--ts-muted)', fontSize: 13, textAlign: 'center', marginTop: '2rem', fontStyle: 'italic' }}>
        Showing up is the whole thing.
      </p>
    </div>
  );
}