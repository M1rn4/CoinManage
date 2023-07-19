// pages/dashboard.tsx
import Link from 'next/link';
import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav style={{ flex: '0 0 200px', padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <h2>Menu</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li style={{ marginBottom: '1rem' }}>
            <Link href="/profile">Profile</Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link href="/new-project">New Project</Link>
          </li>
        </ul>
      </nav>

      <main style={{ flex: '1 1 auto', padding: '1rem' }}>
        <h2>Dashboard Content</h2>
        <p>This is the main dashboard content.</p>
      </main>
    </div>
  );
};

export default Dashboard;
