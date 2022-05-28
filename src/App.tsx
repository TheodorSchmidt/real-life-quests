import React from 'react';
import logo from './logo.svg';
//import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate
} from "react-router-dom"; 
import { observer } from 'mobx-react-lite';
import { globalStyles } from "../src/styles/Global";
import Header from './components/Header';
import Main from './components/Main';
import Guild from './components/guild/Guild';
import Quests from './components/guild/quests/Quests';
import Groups from './components/guild/groups/Groups';
import Characters from './components/characters/Characters';
import Tavern from './components/tavern/Tavern';
import Statistic from './components/statistic/Statistic';
import Footer from './components/Footer';
import TavernRests from './components/tavern/rests/Rests';
import TavernPurchases from './components/tavern/purchases/Purchases';

function App() {
  const global = globalStyles();
  return (
    <div>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" element={<Main />} />
            <Route path="/guild" element={<Guild />}>
              <Route path="quests" element={<Quests />}/>
              <Route path="groups" element={<Groups />}/>
            </Route>
            {/* <Route path="/perks" element={<Perks />} /> */}
            <Route path="/characters" element={<Characters />} />
            {/* <Route path="/locations" element={<Locations />} />           */}
            <Route path="/tavern" element={<Tavern />}>
              <Route path="purchases" element={<TavernPurchases/>}/>
              <Route path="rests" element={<TavernRests />}/>
            </Route>
            <Route path="/statistic" element={<Statistic />} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default observer(App);
