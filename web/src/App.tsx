import { Link, Route, Routes, useParams } from 'react-router';
import { Layout } from './components/Layout';
import { Create } from './pages/Create';
import { Home } from './pages/Home';
import { Room } from './pages/Room';
import { TrustPage } from './pages/TrustPage';
import { Try } from './pages/Try';
import { Verify } from './pages/Verify';

function NotFound() {
  return (
    <div className="page narrow center-page">
      <h1>Nothing here.</h1>
      <p className="lede">This page does not exist.</p>
      <Link className="btn" to="/">
        Back to the start
      </Link>
    </div>
  );
}

/** Keys each page by trust, so moving between trusts never shows the last one's data. */
function Keyed({ page: Page }: { page: typeof TrustPage }) {
  const { id = '' } = useParams();
  return <Page key={id} id={id} />;
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="try" element={<Try />} />
        <Route path="new" element={<Create />} />
        <Route path="t/:id" element={<Keyed page={TrustPage} />} />
        <Route path="t/:id/room" element={<Keyed page={Room} />} />
        <Route path="verify/:id" element={<Keyed page={Verify} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
