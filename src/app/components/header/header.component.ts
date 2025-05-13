import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule, UserPanelComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
   
    private translate: TranslateService){}
}
