import { useContext, useState, useRef } from 'react';
import { DataContext } from '../../data/DataContext';

const s = {
  page: { fontFamily: "Georgia,serif", maxWidth: 560, margin: '0 auto', padding: '2rem 1.25rem' },
  heading: { fontSize: 28, fontWeight: 400, color: 'var(--ts-heading)', margin: '0 0 6px', letterSpacing: -0.5 },
  muted: { color: 'var(--ts-muted)', fontSize: 14, margin: 0, lineHeight: 1.6 },
  label: { color: 'var(--ts-muted)', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 8px', display: 'block' },
  card: { background: 'var(--ts-card)', border: '1px solid var(--ts-border)', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: 12 },
  input: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--ts-border)', background: 'var(--ts-card)', color: 'var(--ts-heading)', fontSize: 15, fontFamily: 'inherit', outline: 'none', marginBottom: 10 },
  textarea: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--ts-border)', background: 'var(--ts-card)', color: 'var(--ts-heading)', fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical', minHeight: 72, marginBottom: 10 },
  btn: { background: 'var(--ts-btn)', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' },
  btnGhost: { background: 'transparent', color: 'var(--ts-muted)', border: '1px solid var(--ts-border)', borderRadius: 8, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' },
  btnDanger: { background: 'transparent', color: '#e06060', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 13, cursor: 'pointer' },
};

const TYPE_OPTIONS = [
  { value: 'quote', label: '💬 Quote', placeholder: 'A quote that means something to you...' },
  { value: 'image', label: '🖼️ Image URL', placeholder: 'Paste an image URL...' },
  { value: 'note', label: '📝 Note', placeholder: 'Something you want to remember...' },
  { value: 'reminder', label: '🔔 Reminder', placeholder: 'A reminder to yourself...' },
];

const TYPE_COLORS = {
  quote: { bg: 'linear-gradient(135deg, #f5f0e8, #ede8da)', border: '#d4c9a8', accent: '#8a7a52' },
  image: { bg: 'linear-gradient(135deg, #edf3f0, #e4ede8)', border: '#b8d0c0', accent: '#4a7a5a' },
  note: { bg: 'linear-gradient(135deg, #eef2f8, #e8edf5)', border: '#b8c8e0', accent: '#4a5a8a' },
  reminder: { bg: 'linear-gradient(135deg, #f5edf0, #ede4ea)', border: '#d0b8c8', accent: '#7a4a6a' },
};

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function AddItemForm({ onSave, onCancel }) {
  const [type, setType] = useState('quote');
  const [content, setContent] = useState('');
  const [caption, setCaption] = useState('');
  const [linkedGoal, setLinkedGoal] = useState('');
  const { goals } = useContext(DataContext);

  const selected = TYPE_OPTIONS.find(t => t.value === type);

  function handleSave() {
    if (!content.trim()) return;
    onSave({
      id: generateId(),
      type,
      content: content.trim(),
      caption: caption.trim(),
      linkedGoal: linkedGoal || null,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <div style={{ ...s.card, background: 'var(--ts-step-bg)', border: '1px solid var(--ts-step-border)', marginBottom: 20 }}>
      <span style={s.label}>Type</span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {TYPE_OPTIONS.map(t => (
          <button
            key={t.value}
            onClick={() => { setType(t.value); setContent(''); }}
            style={{
              ...s.btnGhost,
              background: type === t.value ? 'var(--ts-btn)' : 'transparent',
              color: type === t.value ? '#fff' : 'var(--ts-muted)',
              border: type === t.value ? 'none' : '1px solid var(--ts-border)',
              fontSize: 13,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <span style={s.label}>{selected.label}</span>
      {type === 'quote' || type === 'note' || type === 'reminder' ? (
        <textarea
          style={s.textarea}
          placeholder={selected.placeholder}
          value={content}
          onChange={e => setContent(e.target.value)}
          autoFocus
        />
      ) : (
        <input
          style={s.input}
          placeholder={selected.placeholder}
          value={content}
          onChange={e => setContent(e.target.value)}
          autoFocus
        />
      )}

      {type === 'image' && (
        <>
          <span style={s.label}>Caption (optional)</span>
          <input
            style={s.input}
            placeholder="What does this image mean to you?"
            value={caption}
            onChange={e => setCaption(e.target.value)}
          />
        </>
      )}

      {goals.filter(g => g.status === 'active').length > 0 && (
        <>
          <span style={s.label}>Connect to a goal (optional)</span>
          <select
            style={{ ...s.input, marginBottom: 14 }}
            value={linkedGoal}
            onChange={e => setLinkedGoal(e.target.value)}
          >
            <option value="">No connection</option>
            {goals.filter(g => g.status === 'active').map(g => (
              <option key={g.id} value={g.id}>{g.title}</option>
            ))}
          </select>
        </>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button style={s.btn} onClick={handleSave}>Add to board</button>
        <button style={s.btnGhost} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function VisionCard({ item, goals, onDelete }) {
  const colors = TYPE_COLORS[item.type] || TYPE_COLORS.note;
  const linkedGoal = goals.find(g => g.id === item.linkedGoal);
  const [imgError, setImgError] = useState(false);

  const typeLabel = TYPE_OPTIONS.find(t => t.value === item.type)?.label || item.type;

  return (
    <div style={{
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: 14,
      padding: '1.25rem 1.5rem',
      marginBottom: 12,
      position: 'relative',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: colors.accent, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>
          {typeLabel}
        </span>
        <button style={s.btnDanger} onClick={() => onDelete(item.id)}>✕</button>
      </div>

      {/* Content */}
      {item.type === 'image' && !imgError ? (
        <div style={{ marginBottom: item.caption ? 10 : 0 }}>
          <img
            src={item.content}
            alt={item.caption || 'Vision board image'}
            onError={() => setImgError(true)}
            style={{ width: '100%', borderRadius: 8, maxHeight: 220, objectFit: 'cover', display: 'block' }}
          />
          {item.caption && (
            <p style={{ margin: '10px 0 0', fontSize: 14, color: colors.accent, fontStyle: 'italic', lineHeight: 1.5 }}>
              {item.caption}
            </p>
          )}
        </div>
      ) : item.type === 'image' && imgError ? (
        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.05)', borderRadius: 8, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, color: colors.accent }}>Could not load image. Check the URL.</p>
          <p style={{ margin: '4px 0 0', fontSize: 11, color: colors.accent, wordBreak: 'break-all', opacity: 0.7 }}>{item.content}</p>
        </div>
      ) : item.type === 'quote' ? (
        <p style={{ margin: 0, fontSize: 16, color: '#2a2a2a', fontStyle: 'italic', lineHeight: 1.7, letterSpacing: 0.2 }}>
          "{item.content}"
        </p>
      ) : (
        <p style={{ margin: 0, fontSize: 15, color: '#2a2a2a', lineHeight: 1.6 }}>
          {item.content}
        </p>
      )}

      {/* Linked goal */}
      {linkedGoal && (
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${colors.border}` }}>
          <p style={{ margin: 0, fontSize: 12, color: colors.accent }}>
            🎯 <span style={{ opacity: 0.8 }}>{linkedGoal.title}</span>
          </p>
        </div>
      )}

      {/* Date */}
      <p style={{ margin: '10px 0 0', fontSize: 11, color: colors.accent, opacity: 0.6 }}>
        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
      </p>
    </div>
  );
}

export default function VisionBoardScreen() {
  const { visionBoard, goals, dispatch, actions } = useContext(DataContext);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  function addItem(item) {
    dispatch({ type: actions.ADD_VISION_ITEM, payload: item });
    setShowForm(false);
  }

  function deleteItem(id) {
    if (window.confirm('Remove this from your vision board?')) {
      dispatch({ type: actions.DELETE_VISION_ITEM, payload: id });
    }
  }

  const filtered = filter === 'all'
    ? visionBoard
    : visionBoard.filter(item => item.type === filter);

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={s.heading}>Vision Board</h1>
          <p style={s.muted}>
            {visionBoard.length === 0
              ? 'A space for what matters to you.'
              : `${visionBoard.length} thing${visionBoard.length !== 1 ? 's' : ''} keeping you grounded.`}
          </p>
        </div>
        {!showForm && (
          <button style={s.btn} onClick={() => setShowForm(true)}>+ Add</button>
        )}
      </div>

      {showForm && (
        <AddItemForm onSave={addItem} onCancel={() => setShowForm(false)} />
      )}

      {/* Filter tabs */}
      {visionBoard.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
          {['all', 'quote', 'image', 'note', 'reminder'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...s.btnGhost,
                background: filter === f ? 'var(--ts-btn)' : 'transparent',
                color: filter === f ? '#fff' : 'var(--ts-muted)',
                border: filter === f ? 'none' : '1px solid var(--ts-border)',
                fontSize: 12,
                padding: '5px 12px',
              }}
            >
              {f === 'all' ? 'All' : TYPE_OPTIONS.find(t => t.value === f)?.label || f}
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {visionBoard.length === 0 && !showForm && (
        <div style={{ ...s.card, textAlign: 'center', padding: '2.5rem 2rem' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌿</div>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: 'var(--ts-heading)', margin: '0 0 10px' }}>
            What keeps you going?
          </h2>
          <p style={{ ...s.muted, marginBottom: 20 }}>
            Add quotes, images, notes, or reminders that connect you to why you started.
          </p>
          <button style={s.btn} onClick={() => setShowForm(true)}>Add your first item</button>
        </div>
      )}

      {/* Filtered empty */}
      {visionBoard.length > 0 && filtered.length === 0 && (
        <div style={{ ...s.card, textAlign: 'center', padding: '1.5rem' }}>
          <p style={s.muted}>No {filter}s on your board yet.</p>
        </div>
      )}

      {/* Board items */}
      {filtered.map(item => (
        <VisionCard key={item.id} item={item} goals={goals} onDelete={deleteItem} />
      ))}

      {visionBoard.length > 0 && (
        <p style={{ color: 'var(--ts-muted)', fontSize: 13, textAlign: 'center', marginTop: '2rem', fontStyle: 'italic' }}>
          Remember why you started.
        </p>
      )}
    </div>
  );
}