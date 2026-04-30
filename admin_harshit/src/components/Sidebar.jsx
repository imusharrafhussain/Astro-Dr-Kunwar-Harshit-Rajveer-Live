export default function Sidebar({ active, onSelect }) {
  const items = [
    { key: 'reports', label: 'Reports' },
    { key: 'consultations', label: 'Consultation' },
    { key: 'numerology', label: 'Numerology' },
    { key: 'book-puja', label: 'Book Puja' },
    { key: 'horoscope', label: 'Horoscope' },
    { key: 'contacts', label: 'Contacts' },
    { key: 'users', label: 'Users' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebarTitle">Categories</div>
      <nav className="nav">
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            className={['navItem', active === it.key ? 'navItemActive' : ''].join(' ')}
            onClick={() => onSelect(it.key)}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

