import { Provider } from 'react-redux';

import Demo from '@/components/Demo';
import Hero from '@/components/Hero';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <main className="container px-4 mx-auto">
        <Hero />
        <Demo />
      </main>
    </Provider>
  );
}

export default App;
