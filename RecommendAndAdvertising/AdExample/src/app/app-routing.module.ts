import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { ApplicationHomeComponent } from './application-home/application-home.component';
import { AdvertiseHomeComponent } from 'src/app/advertise-home/advertise-home.component';
import { ChatpageComponent } from 'src/app/chatpage/chatpage.component';
import { PrivacyComponent } from 'src/app/privacy/privacy.component';

const routes: Routes = [
    { path: '', redirectTo: '/application', pathMatch: 'full' },
    { path: 'application', component: ApplicationHomeComponent },
    { path: 'advertisement', component: AdvertiseHomeComponent },
    { path: 'chatpage', component: ChatpageComponent },
    { path: 'privacy', component: PrivacyComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
