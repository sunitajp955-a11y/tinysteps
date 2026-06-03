import { useContext, useState } from 'react';
import { DataContext } from '../../data/DataContext';

const s = {
  page: { fontFamily: "Georgia,serif", maxWidth: 560, margin: '0 auto', padding: '2rem 1.25rem' },
  label: { color: 'var(--ts-muted)', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 8px', display: 'block' },
  card: { background: 'var(--ts-card)', border: '1px solid var(--ts-border)', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: 10 },
  input: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--ts-border)', background: 'var(--ts-card)', color: 'var(--ts-heading)', fontSize: 15, fontFamily: 'inherit', outline: 'none', marginBottom: 10 },
  textarea: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--ts-border)', background: 'var(--ts-card)', color: 'var(--ts-heading)', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', minHeight: 72, marginBottom: 10 },
  btn: { background: 'var(--ts-btn)', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' },
  btnGhost: { background: 'transparent', color: 'var(--ts-muted)', border: '1px solid var(--ts-border)', borderRadius: 8, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' },
  btnDanger: { background: 'transparent', color: '#e06060', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 13, cursor: 'pointer' },
  heading: { fontSize: 28, fontWeight: 400, color: 'var(--ts-heading)', margin: '0 0 6px', letterSpacing: -0.5 },
  subheading: { fontSize: 18, fontWeight: 500, color: 'var(--ts-heading)', margin: '0 0 4px' },
  muted: { color: 'var(--ts-muted)', fontSize: 14, margin: 0, lineHeight: 1.5 },
};

const clarifyingQuestions = [
  { key: 'why', label: 'Why does this matter to you?' },
  { key: 'difficulty', label: 'What feels difficult right now?' },
  { key: 'realistic', label: 'What would feel realistic?' },
  { key: 'easier', label: 'What would make starting easier?' },
];

function GoalForm({ onSave, onCancel, initial = {} }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    why: initial.why || '',
    difficulty: initial.difficulty || '',
    realistic: initial.realistic || '',
    easier: initial.easier || '',
  });
  const [step, setStep] = useState(0);

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  return (
    <div style={{ ...s.card, background: 'var(--ts-step-bg)', border: '1px solid var(--ts-step-border)', marginBottom: 16 }}>
      {step === 0 && (
        <>
          <span style={s.label}>What is your goal?</span>
          <input style={s.input} placeholder="e.g. Run 2km regularly" value={form.title} onChange={e => set('title', e.target.value)} autoFocus />
          <textarea style={s.textarea} placeholder="Describe it a little... (optional)" value={form.description} onChange={e => set('description', e.target.value)} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={s.btn} onClick={() => form.title.trim() && setStep(1)}>Next →</button>
            <button style={s.btnGhost} onClick={onCancel}>Cancel</button>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <p style={{ ...s.muted, marginBottom: 16 }}>A few questions to help you think this through. Skip any that do not feel relevant.</p>
          {clarifyingQuestions.map(q => (
            <div key={q.key}>
              <span style={s.label}>{q.label}</span>
              <textarea style={s.textarea} placeholder="Take your time..." value={form[q.key]} onChange={e => set(q.key, e.target.value)} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={s.btn} onClick={() => onSave(form)}>Save goal</button>
            <button style={s.btnGhost} onClick={() => setStep(0)}>← Back</button>
            <button style={s.btnGhost} onClick={onCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

function StepForm({ goalId, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <div style={{ marginTop: 10, background: 'var(--ts-card)', border: '1px solid var(--ts-border)', borderRadius: 10, padding: '1rem' }}>
      <input style={s.input} placeholder="Tiny step..." value={title} onChange={e => setTitle(e.target.value)} autoFocus />
      <textarea style={{ ...s.textarea, minHeight: 48 }} placeholder="Details (optional)" value={description} onChange={e => setDescription(e.target.value)} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={s.btn} onClick={() => title.trim() && onSave({ goalId, title, description })}>Add</button>
        <button style={s.btnGhost} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function GoalCard({ goal, onEdit, onDelete, onSelect, isSelected }) {
  const { dispatch, actions } = useContext(DataContext);
  const [expanded, setExpanded] = useState(false);
  const [addingStep, setAddingStep] = useState(false);

  const doneSteps = goal.tinySteps.filter(s => s.status === 'completed').length;
  const totalSteps = goal.tinySteps.length;
  const progress = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

  function toggleStep(step) {
    dispatch({
      type: actions.UPDATE_TINY_STEP,
      payload: {
        goalId: goal.id,
        id: step.id,
        data: { status: step.status === 'completed' ? 'pending' : 'completed', completedAt: step.status === 'completed' ? null : new Date().toISOString() },
      },
    });
  }

  function deleteStep(step) {
    dispatch({ type: actions.DELETE_TINY_STEP, payload: { goalId: goal.id, id: step.id } });
  }

  function addStep(data) {
    dispatch({ type: actions.ADD_TINY_STEP, payload: data });
    setAddingStep(false);
  }

  function markGoalComplete() {
    dispatch({ type: actions.UPDATE_GOAL, payload: { id: goal.id, data: { status: 'completed', completedAt: new Date().toISOString() } } });
  }

  function togglePause() {
    dispatch({ type: actions.UPDATE_GOAL, payload: { id: goal.id, data: { status: goal.status === 'paused' ? 'active' : 'paused' } } });
  }

  const tagStyle = (status) => ({
    display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontSize: 11,
    background: status === 'completed' ? 'var(--ts-done-bg)' : status === 'paused' ? 'var(--ts-track)' : 'var(--ts-step-bg)',
    color: status === 'completed' ? 'var(--ts-done-btn)' : 'var(--ts-accent-text)',
    border: '1px solid var(--ts-step-border)',
  });

  return (
    <div style={{ ...s.card, border: isSelected ? '1.5px solid var(--ts-accent-text)' : '1px solid var(--ts-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <h3 style={{ ...s.subheading, margin: 0 }}>{goal.title}</h3>
            <span style={tagStyle(goal.status)}>{goal.status}</span>
            {isSelected && <span style={{ ...tagStyle('active'), background: 'var(--ts-btn)', color: '#fff' }}>★ Focus</span>}
          </div>
          {goal.why && <p style={{ ...s.muted, fontSize: 13, fontStyle: 'italic' }}>"{goal.why}"</p>}
        </div>
        <button style={s.btnDanger} onClick={() => onDelete(goal.id)}>✕</button>
      </div>

      {totalSteps > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 4, background: 'var(--ts-track)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--ts-btn)', borderRadius: 4, transition: 'width 0.4s ease' }} />
          </div>
          <span style={{ color: 'var(--ts-muted)', fontSize: 12 }}>{doneSteps}/{totalSteps}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button style={s.btnGhost} onClick={() => setExpanded(e => !e)}>{expanded ? 'Hide steps' : `Steps (${totalSteps})`}</button>
        {!isSelected && goal.status === 'active' && <button style={s.btnGhost} onClick={() => onSelect(goal.id)}>Set as focus</button>}
        <button style={s.btnGhost} onClick={togglePause}>{goal.status === 'paused' ? 'Resume' : 'Pause'}</button>
        {goal.status !== 'completed' && <button style={s.btnGhost} onClick={markGoalComplete}>Complete</button>}
        <button style={s.btnGhost} onClick={() => onEdit(goal)}>Edit</button>
      </div>

      {expanded && (
        <div style={{ marginTop: 14 }}>
          {goal.tinySteps.length === 0 && !addingStep && (
            <p style={{ ...s.muted, fontSize: 13, marginBottom: 10 }}>No tiny steps yet. What is the smallest thing you could do?</p>
          )}
          {goal.tinySteps.map(step => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--ts-border)' }}>
              <button onClick={() => toggleStep(step)} style={{ width: 20, height: 20, borderRadius: 4, border: '1.5px solid var(--ts-border)', background: step.status === 'completed' ? 'var(--ts-btn)' : 'transparent', cursor: 'pointer', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {step.status === 'completed' && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
              </button>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--ts-heading)', textDecoration: step.status === 'completed' ? 'line-through' : 'none', opacity: step.status === 'completed' ? 0.6 : 1 }}>{step.title}</p>
                {step.description && <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--ts-muted)' }}>{step.description}</p>}
              </div>
              <button style={s.btnDanger} onClick={() => deleteStep(step)}>✕</button>
            </div>
          ))}
          {addingStep ? (
            <StepForm goalId={goal.id} onSave={addStep} onCancel={() => setAddingStep(false)} />
          ) : (
            <button style={{ ...s.btnGhost, marginTop: 10, width: '100%' }} onClick={() => setAddingStep(true)}>+ Add tiny step</button>
          )}
        </div>
      )}
    </div>
  );
}

export default function GoalsScreen() {
  const { goals, currentGoalId, dispatch, actions } = useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [filter, setFilter] = useState('active');

  function saveGoal(form) {
    if (editingGoal) {
      dispatch({ type: actions.UPDATE_GOAL, payload: { id: editingGoal.id, data: form } });
      setEditingGoal(null);
    } else {
      dispatch({ type: actions.ADD_GOAL, payload: form });
      setShowForm(false);
    }
  }

  function deleteGoal(id) {
    if (window.confirm('Delete this goal?')) {
      dispatch({ type: actions.DELETE_GOAL, payload: id });
    }
  }

  const filtered = goals.filter(g => filter === 'all' ? true : g.status === filter);

  return (
    <div style={s.page}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={s.heading}>Goals</h1>
          <p style={s.muted}>{goals.length === 0 ? 'Nothing here yet.' : `${goals.filter(g => g.status === 'active').length} active`}</p>
        </div>
        {!showForm && !editingGoal && (
          <button style={s.btn} onClick={() => setShowForm(true)}>+ New goal</button>
        )}
      </div>

      {showForm && <GoalForm onSave={saveGoal} onCancel={() => setShowForm(false)} />}
      {editingGoal && <GoalForm initial={editingGoal} onSave={saveGoal} onCancel={() => setEditingGoal(null)} />}

      {goals.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {['active', 'paused', 'completed', 'all'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...s.btnGhost, background: filter === f ? 'var(--ts-btn)' : 'transparent', color: filter === f ? '#fff' : 'var(--ts-muted)', border: filter === f ? 'none' : '1px solid var(--ts-border)' }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ ...s.card, textAlign: 'center', padding: '2rem' }}>
          <p style={s.muted}>{goals.length === 0 ? 'No goals yet. What is something you want to work towards?' : `No ${filter} goals.`}</p>
        </div>
      ) : (
        filtered.map(goal => (
          editingGoal?.id === goal.id ? null : (
            <GoalCard
              key={goal.id}
              goal={goal}
              isSelected={goal.id === currentGoalId}
              onEdit={g => { setEditingGoal(g); setShowForm(false); }}
              onDelete={deleteGoal}
              onSelect={id => dispatch({ type: actions.SET_CURRENT_GOAL, payload: id })}
            />
          )
        ))
      )}

      <p style={{ color: 'var(--ts-muted)', fontSize: 13, textAlign: 'center', marginTop: '2rem', fontStyle: 'italic' }}>
        Start smaller than you think you need to.
      </p>
    </div>
  );
}