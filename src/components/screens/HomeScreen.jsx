import { useContext, useState } from 'react';
import { DataContext } from '../../data/DataContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getTodayStep(goal) {
  if (!goal) return null;
  return goal.tinySteps.find(s => s.status === 'pending') || null;
}

function getProgress(goal) {
  if (!goal) return 0;
  const total = goal.tinySteps.length;
  if (total === 0) return 0;
  const done = goal.tinySteps.filter(s => s.status === 'completed').length;
  return Math.round((done / total) * 100);
}

export default function HomeScreen() {
  const { goals, currentGoalId, dispatch, actions } = useContext(DataContext);
  const [stepDone, setStepDone] = useState(false);

  const activeGoals = goals.filter(g => g.status === 'active');
  const currentGoal = goals.find(g => g.id === currentGoalId) || activeGoals[0] || null;
  const todayStep = getTodayStep(currentGoal);
  const progress = getProgress(currentGoal);

  function completeStep(step) {
    dispatch({
      type: actions.UPDATE_TINY_STEP,
      payload: {
        goalId: currentGoal.id,
        id: step.id,
        data: { status: 'completed', completedAt: new Date().toISOString() },
      },
    });
    setStepDone(true);
    setTimeout(() => setStepDone(false), 2000);
  }

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", maxWidth: 560, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ color: '#9b8ea0', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 400, color: '#2d1f3d', margin: '6px 0 0', letterSpacing: -0.5 }}>
          {getGreeting()} 🌱
        </h1>
      </div>

      {goals.length === 0 ? (
        <div style={{ background: 'linear-gradient(135deg, #faf6ff 0%, #f0f7ff 100%)', border: '1px solid #e8e0f0', borderRadius: 16, padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✨</div>
          <h2 style={{ fontSize: 20, fontWeight: 400, color: '#2d1f3d', margin: '0 0 8px' }}>Start with something real</h2>
          <p style={{ color: '#9b8ea0', fontSize: 15, lineHeight: 1.6, margin: '0 0 24px' }}>
            What's one thing that feels big or overwhelming right now? You don't need the perfect goal — just a real one.
          </p>
          <p style={{ color: '#b09ec0', fontSize: 13, margin: 0 }}>Head to <strong>Goals</strong> to create your first one.</p>
        </div>
      ) : (
        <>
          {currentGoal && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#9b8ea0', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 8px' }}>Current focus</p>
              <div style={{ background: '#fff', border: '1px solid #e8e0f0', borderRadius: 14, padding: '1.25rem 1.5rem' }}>
                <h2 style={{ fontSize: 18, fontWeight: 500, color: '#2d1f3d', margin: '0 0 6px' }}>{currentGoal.title}</h2>
                {currentGoal.why && (
                  <p style={{ color: '#9b8ea0', fontSize: 14, margin: '0 0 16px', fontStyle: 'italic', lineHeight: 1.5 }}>"{currentGoal.why}"</p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 4, background: '#f0eaf8', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #c084fc, #818cf8)', borderRadius: 4, transition: 'width 0.6s ease' }} />
                  </div>
                  <span style={{ color: '#9b8ea0', fontSize: 12, whiteSpace: 'nowrap' }}>{progress}% of steps</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#9b8ea0', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 8px' }}>Today's tiny step</p>
            {todayStep ? (
              <div style={{ background: stepDone ? 'linear-gradient(135deg, #f0fff4, #e8f5e9)' : 'linear-gradient(135deg, #faf6ff, #f5f0ff)', border: `1px solid ${stepDone ? '#a7f3d0' : '#ddd6f3'}`, borderRadius: 14, padding: '1.25rem 1.5rem', transition: 'all 0.4s ease' }}>
                <p style={{ fontSize: 16, color: '#2d1f3d', margin: '0 0 16px', lineHeight: 1.5 }}>{todayStep.title}</p>
                {todayStep.description && (
                  <p style={{ fontSize: 14, color: '#9b8ea0', margin: '0 0 16px', lineHeight: 1.5 }}>{todayStep.description}</p>
                )}
                <button onClick={() => completeStep(todayStep)} style={{ background: stepDone ? '#10b981' : '#7c3aed', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 14, cursor: 'pointer', transition: 'background 0.3s ease' }}>
                  {stepDone ? '✓ Done!' : 'Mark complete'}
                </button>
              </div>
            ) : (
              <div style={{ background: '#faf9fb', border: '1px solid #e8e0f0', borderRadius: 14, padding: '1.25rem 1.5rem', color: '#9b8ea0', fontSize: 15 }}>
                {currentGoal ? currentGoal.tinySteps.length === 0 ? 'No tiny steps yet — add some in Goals to get started.' : '🎉 All steps are done. Great work!' : 'Select a goal to see your steps here.'}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: '1.5rem' }}>
            {[
              { label: 'Active goals', value: activeGoals.length },
              { label: 'Steps done', value: goals.reduce((acc, g) => acc + g.tinySteps.filter(s => s.status === 'completed').length, 0) },
              { label: 'Total steps', value: goals.reduce((acc, g) => acc + g.tinySteps.length, 0) },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#fff', border: '1px solid #e8e0f0', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 500, color: '#7c3aed', margin: '0 0 4px' }}>{stat.value}</p>
                <p style={{ fontSize: 12, color: '#9b8ea0', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {activeGoals.length > 1 && (
            <div>
              <p style={{ color: '#9b8ea0', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 8px' }}>Other goals</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeGoals.filter(g => g.id !== currentGoal?.id).map(goal => (
                  <button key={goal.id} onClick={() => dispatch({ type: actions.SET_CURRENT_GOAL, payload: goal.id })} style={{ background: '#fff', border: '1px solid #e8e0f0', borderRadius: 10, padding: '0.875rem 1.25rem', textAlign: 'left', cursor: 'pointer', color: '#2d1f3d', fontSize: 15 }}>
                    {goal.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <p style={{ color: '#c4b8d0', fontSize: 13, textAlign: 'center', marginTop: '2.5rem', fontStyle: 'italic' }}>
        Small steps still count. Every one of them.
      </p>
    </div>
  );
}
