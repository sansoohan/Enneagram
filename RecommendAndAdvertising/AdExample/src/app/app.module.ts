import {APP_BASE_HREF} from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule} from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/chatpage/services/auth.service';
import { ChatService } from 'src/app/chatpage/services/chat.service';
import { FirebaseService } from 'src/app/chatpage/services/firebase.service';

import { AppComponent } from './app.component';
import { ApplicationHomeComponent } from './application-home/application-home.component';
  import { AppNavigationComponent } from './application-home/navigation/navigation.component';
  import { AppHeaderComponent } from './application-home/header/header.component';
  import { AppDownloadComponent } from './application-home/download/download.component';
  import { AppFeaturesComponent } from './application-home/features/features.component';
  import { AppFooterComponent } from './application-home/footer/footer.component';
  import { AppContactComponent } from './application-home/contact/contact.component';
  import { AppStartComponent } from './application-home/start/start.component';

import { AdvertiseHomeComponent } from './advertise-home/advertise-home.component';
import { ChatroomComponent } from './chatpage/chatroom/chatroom.component';
import { ChatpageComponent } from './chatpage/chatpage.component';
import { ChatFormComponent } from './chatpage/chat-form/chat-form.component';
import { FeedComponent } from './chatpage/feed/feed.component';
import { UserItemComponent } from './chatpage/user-item/user-item.component';
import { MessageComponent } from './chatpage/message/message.component';
import { NavbarComponent } from './chatpage/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    AppHeaderComponent,
    AppDownloadComponent,
    AppFeaturesComponent,
    AppFooterComponent,
    AppContactComponent,
    AppStartComponent,
    ApplicationHomeComponent,
    AdvertiseHomeComponent,

    ChatroomComponent,
    ChatpageComponent,
    ChatFormComponent,
    FeedComponent,
    UserItemComponent,
    MessageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    ChatService,
    FirebaseService,
    {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
