import { Component } from '@angular/core';

import { GenerationIvPage } from '../generation-iv/generation-iv';
import { GenerationVPage } from '../generation-v/generation-v';
import { GenerationViPage } from '../generation-vi/generation-vi';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GenerationIvPage;
  tab3Root = GenerationVPage;
  tab4Root = GenerationViPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
