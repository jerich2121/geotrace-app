import React, { useState } from "react";
import "../styles/HistoryList.css";

const HistoryList = ({ history, onSelect, onDelete }) => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === history.length) setSelected([]);
    else setSelected(history.map((h) => h.id));
  };

  const handleDelete = () => {
    if (selected.length === 0) return;
    onDelete(selected);
    setSelected([]);
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  if (history.length === 0) {
    return <div className="history-empty"><span>No search history yet.</span></div>;
  }

  return (
    <div className="history-list">
      <div className="history-list__toolbar">
        <label className="history-list__check-all">
          <input type="checkbox" checked={selected.length === history.length && history.length > 0} onChange={toggleAll} />
          <span>Select all</span>
        </label>
        {selected.length > 0 && (
          <button className="history-list__delete-btn" onClick={handleDelete}>
            Delete ({selected.length})
          </button>
        )}
      </div>
      <ul className="history-list__items">
        {history.map((item) => (
          <li key={item.id} className={`history-list__item ${selected.includes(item.id) ? "history-list__item--selected" : ""}`}>
            <input type="checkbox" className="history-list__checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} onClick={(e) => e.stopPropagation()} />
            <button className="history-list__ip-btn" onClick={() => onSelect(item.ipAddress)}>
              <span className="history-list__ip">{item.ipAddress}</span>
              {item.label && <span className="history-list__label">{item.label}</span>}
            </button>
            <span className="history-list__time">{formatTime(item.createdAt)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;