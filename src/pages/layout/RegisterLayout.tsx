import { Outlet } from 'react-router';
import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';

export function RegisterLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header state={State.Onboarding} />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}
